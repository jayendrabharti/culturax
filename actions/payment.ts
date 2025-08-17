"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables."
  );
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (amount: number) => {
  try {
    // Razorpay receipt must be <= 40 characters
    const shortReceipt = `rcpt_${uuidv4().replace(/-/g, "").slice(0, 32)}`;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: shortReceipt,
    });

    return { data: { orderId: order.id }, errorMessage: null };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return { data: null, errorMessage: "Failed to create order" };
  }
};

export const logSuccessfullPayment = async ({
  eventId,
  participantId,
  paymentId,
}: {
  eventId: string;
  participantId: string;
  paymentId: string;
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

    if (event?.eventType === "TEAM") {
      await prisma.$transaction(async (tx) => {
        await tx.payments.create({
          data: {
            paymentId: paymentId,
            paymentMethod: "RAZORPAY",
            paidAt: new Date(),
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
            paymentId: paymentId,
            paymentMethod: "RAZORPAY",
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
