"use client";

import Script from "next/script";
import { Button } from "./ui/button";
import { CircleDollarSignIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Event, Participant, Team } from "@prisma/client";
import { createOrder, verifyPayment } from "@/actions/payment";
import { toast } from "sonner";

declare global {
  interface Window {
    Cashfree: any;
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

      const { data, errorMessage } = await createOrder({
        amount: event.registrationFee,
        customer_details: {
          customer_id: participant.id,
          customer_email: participant.email || "customer@example.com",
          customer_phone: participant.phone || "9999999999",
          customer_name: participant.name,
        },
      });

      if (errorMessage || !data?.payment_session_id || !data?.order_id) {
        toast.error(errorMessage ?? "Failed to create order");
        return;
      }

      const orderId = data.order_id;
      const paymentSessionId = data.payment_session_id;

      const cashfree = new window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
      });
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then(async function (result: any) {
        if (result.error) {
          toast.error(result.error.message);
        }
        if (result.redirect) {
          console.log("Redirection");
        }
        const { data, errorMessage } = await verifyPayment({
          orderId: orderId,
          eventId: event.id,
          participantId: participant.id,
        });

        if (data?.success) {
          toast.success("Payment successful!", {
            description: "Payment has been verified",
          });
        } else if (errorMessage) {
          toast.error(errorMessage);
        }
      });
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" />
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
