"use client";

import Script from "next/script";
import { Button } from "./ui/button";
import { CircleDollarSignIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Event, Participant, Team } from "@prisma/client";
import { createOrder, logSuccessfullPayment } from "@/actions/payment";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment({
  className = "",
  event,
  participant,
}: {
  className?: string;
  event: Event;
  participant: Participant & { team: Team | null };
}) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const { data, errorMessage } = await createOrder(event.registrationFee);

      if (errorMessage || !data?.orderId) {
        toast.error(errorMessage ?? "Failed to create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: event.registrationFee * 100,
        currency: "INR",
        order_id: data.orderId,
        name: "Cultrax Fest",
        description: "Event Registration",
        image: "/images/fest_black_logo.png",
        handler: async (response: any) => {
          await logSuccessfullPayment({
            eventId: event.id,
            participantId: participant.id,
            paymentId: response.razorpay_payment_id,
          });
          toast.success("Payment successful!");
        },
        prefill: {
          name: participant.name ?? "",
          email: participant.email ?? "",
          contact: participant.phone ?? "",
        },
        notes: {
          eventId: "event_id",
          eventName: event.name,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Button
        className={`${className}`}
        disabled={isProcessing}
        onClick={handlePayment}
      >
        {isProcessing ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <CircleDollarSignIcon />
        )}
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </>
  );
}
