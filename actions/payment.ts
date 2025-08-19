"use server";
import prisma from "@/prisma/client";
import { getErrorMessage } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

interface CreateOrderData {
  amount: number;
  customer_details: {
    customer_id: string;
    customer_email: string;
    customer_phone: string;
    customer_name: string;
  };
}

export const createOrder = async ({
  amount,
  customer_details,
}: CreateOrderData) => {
  try {
    if (
      !process.env.CASHFREE_BASE_URL ||
      !process.env.CASHFREE_API_VERSION ||
      !process.env.CASHFREE_APP_ID ||
      !process.env.CASHFREE_SECRET_KEY
    ) {
      return { data: null, errorMessage: "Missing Cashfree configuration" };
    }

    const orderId = `order_${uuid()}`;
    const url = `${process.env.CASHFREE_BASE_URL}/orders`;
    const options = {
      method: "POST",
      headers: {
        "x-api-version": process.env.CASHFREE_API_VERSION as string,
        "x-client-id": process.env.CASHFREE_APP_ID as string,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_currency: "INR",
        order_amount: amount,
        customer_details: customer_details,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return {
      data: {
        payment_session_id: data.payment_session_id as string,
        order_id: orderId,
      },
      errorMessage: null,
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return { data: null, errorMessage: "Failed to create order" };
  }
};

export const verifyPayment = async ({
  orderId,
  eventId,
  participantId,
}: {
  orderId: string;
  eventId: string;
  participantId: string;
}) => {
  try {
    if (
      !process.env.CASHFREE_BASE_URL ||
      !process.env.CASHFREE_API_VERSION ||
      !process.env.CASHFREE_APP_ID ||
      !process.env.CASHFREE_SECRET_KEY
    ) {
      return { data: null, errorMessage: "Missing Cashfree configuration" };
    }

    const url = `${process.env.CASHFREE_BASE_URL}/orders/${orderId}/payments`;
    const options = {
      method: "GET",
      headers: {
        "x-api-version": process.env.CASHFREE_API_VERSION as string,
        "x-client-id": process.env.CASHFREE_APP_ID as string,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY as string,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to verify payment");
    }

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (data[0] && data[0].payment_amount === event?.registrationFee) {
      if (data[0].payment_status === "SUCCESS") {
        await logSuccessfullPayment({
          eventId: eventId,
          participantId: participantId,
          paymentId: String(data[0].cf_payment_id),
          paymentMethod: String(data[0].payment_group),
          paidAt: new Date(String(data[0].payment_time)),
        });

        return {
          data: { success: true },
          errorMessage: null,
        };
      } else {
        return {
          data: { success: false },
          errorMessage: data[0].payment_message,
        };
      }
    } else {
      return {
        data: { success: false },
        errorMessage: "Payment verification failed",
      };
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      data: { success: false },
      errorMessage: getErrorMessage(error ?? "Failed to verify payment"),
    };
  }
};

export const logSuccessfullPayment = async ({
  eventId,
  participantId,
  paymentId,
  paymentMethod,
  paidAt = new Date(),
}: {
  eventId: string;
  participantId: string;
  paymentId: string;
  paymentMethod?: string;
  paidAt?: Date;
}) => {
  try {
    const [event, participant] = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
      });

      const participant = await tx.participant.findUnique({
        where: { id: participantId },
        include: { team: true },
      });
      return [event, participant];
    });

    if (!event || !participant) {
      throw new Error("Event or participant not found");
    }

    if (event?.eventType === "TEAM") {
      await prisma.$transaction(async (tx) => {
        await tx.payments.create({
          data: {
            amount: event.registrationFee,
            paymentId: paymentId,
            paymentMethod: paymentMethod,
            paidAt: paidAt,
            status: "COMPLETED",
            teamId: participant?.team?.id,
          },
        });
        await tx.team.update({
          where: { id: participant?.team?.id },
          data: { isPaid: true },
        });
      });
    } else {
      await prisma.$transaction(async (tx) => {
        await tx.payments.create({
          data: {
            amount: event.registrationFee,
            paymentId: paymentId,
            paymentMethod: "CASHFREE",
            paidAt: new Date(),
            status: "COMPLETED",
            participantId: participantId,
          },
        });
        await tx.participant.update({
          where: { id: participantId },
          data: { isPaid: true },
        });
      });
    }

    revalidatePath(`/events/${eventId}/register`);
    revalidatePath(`/events/${eventId}/register/pay`);
    return { data: { success: true }, errorMessage: null };
  } catch (error) {
    console.error("Error logging successful payment:", error);
    return { data: null, errorMessage: "Failed to log payment" };
  }
};
