"use client";

import { Button } from "./ui/button";
import {
  CheckCheckIcon,
  CopyIcon,
  DollarSignIcon,
  Loader2Icon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { Event, Participant, Team } from "@prisma/client";
import { toast } from "sonner";
import { convertBlobUrlToFile, getErrorMessage } from "@/utils/utils";
import { QRCodeSVG } from "qrcode.react";
import { getPaymentUrl } from "@/utils/payment";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import Image from "next/image";
import { uploadImage } from "@/supabase/storage";
import { logSuccessfullPayment } from "@/actions/payment";

export default function Payment({
  event,
  participant,
}: {
  event: Event;
  participant: Participant & { team: Team | null };
}) {
  const [isProcessing, startProcessing] = useTransition();

  const [paymentImageUrl, setPaymentImageUrl] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "";
  const paymentLink = getPaymentUrl({
    amount: event.registrationFee,
    name: "CultraX",
    upiId,
  });

  const handlePayment = async () => {
    startProcessing(async () => {
      try {
        if (!paymentImageUrl) {
          toast.error("Please upload a payment image.");
          return;
        }
        if (!transactionId.trim()) {
          toast.error("Please enter the transaction ID.");
          return;
        }

        const imageFile = await convertBlobUrlToFile(paymentImageUrl);

        const { imageUrl: uploadedImageUrl, error: uploadError } =
          await uploadImage({
            file: imageFile,
            bucket: "images", // Using "images" bucket as requested
          });

        if (uploadError) {
          toast.error(`Error uploading image: ${uploadError}`, {
            description: "Refresh Page and try again.",
          });
          return;
        }

        const { data, errorMessage } = await logSuccessfullPayment({
          eventId: event.id,
          participantId: participant.id,
          transactionId,
          imageUrl: uploadedImageUrl,
        });

        if (errorMessage || !data?.success) {
          toast.error(errorMessage ?? "Failed to log payment");
          return;
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPaymentImageUrl(url);
    }
  };

  const QrProps = {
    value: paymentLink,
    size: 200,
    title: "Pay with UPI",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={"/images/UPI_logo.png"}
        alt="upi logo"
        width={200}
        height={100}
      />
      <div className="border border-border bg-white p-4 rounded-lg shadow-md w-max mx-auto">
        <QRCodeSVG {...QrProps} />
      </div>

      <div className="flex flex-row gap-1">
        <span className="p-1 px-4 bg-secondary text-secondary-foreground border border-border shadow-md rounded-full">
          {upiId}
        </span>
        <Button
          variant={"outline"}
          size={"icon"}
          className="flex-1"
          onClick={() => {
            navigator.clipboard.writeText(upiId);
            toast.success("UPI ID copied to clipboard");
          }}
        >
          <CopyIcon />
        </Button>
      </div>

      <p className="mt-4 text-lg text-balance">
        Scan this QR to pay <b>₹{event.registrationFee}</b> to <b>CultraX</b>{" "}
        through <b>UPI</b>.
      </p>
      <Image
        src={"/images/upi_apps.png"}
        alt="upi logo"
        width={200}
        height={100}
      />

      <Separator className="my-2" />

      <span className="ml-auto font-bold text-lg">Submit Payment Details</span>

      <div className="my-3 w-full flex flex-col gap-3">
        <Label htmlFor="">Payment Image</Label>
        {paymentImageUrl ? (
          <div className="flex flex-col gap-2">
            <Image
              src={paymentImageUrl}
              alt="Payment Screenshot"
              width={400}
              height={400}
              className="mx-auto max-w-full"
            />
            <Button
              variant={"destructive"}
              onClick={() => setPaymentImageUrl(null)}
            >
              Change <Trash2Icon />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "relative flex flex-col items-center justify-center overflow-hidden rounded-xl outline-4 outline-[--border] outline-dashed",
              "bg-card w-full p-3"
            )}
          >
            <input
              type="file"
              name="image"
              onChange={handleOnImageChange}
              className={cn("absolute h-full w-full opacity-0")}
            />
            <UploadIcon className="m-4 size-16 text-[--muted-foreground]" />
            <span className="mx-4 text-lg font-bold text-[--foreground]">
              Upload Transaction Image
            </span>
            <span>( Screenshot )</span>
          </div>
        )}

        <Label htmlFor="transactionId">Transaction ID</Label>

        <Input
          id="transactionId"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter your UPI transaction ID"
        />
      </div>
      <Button variant={"default"} onClick={handlePayment} className="w-full">
        {isProcessing ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <CheckCheckIcon />
        )}
        {isProcessing ? "Submitting..." : "Submit Payment Details"}
        <DollarSignIcon />
      </Button>
    </div>
  );
}
