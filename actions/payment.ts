"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const logSuccessfullPayment = async ({
  eventId,
  participantId,
  transactionId,
  imageUrl,
  paymentMethod = "UPI",
  paidAt = new Date(),
}: {
  eventId: string;
  participantId: string;
  transactionId: string;
  imageUrl: string;
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
            transactionId,
            paymentId: transactionId,
            paymentMethod: paymentMethod,
            paidAt,
            teamId: participant?.team?.id,
            imageUrl,
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
            transactionId,
            paymentId: transactionId,
            paymentMethod: paymentMethod,
            paidAt,
            participantId: participantId,
            imageUrl,
          },
        });
        await tx.participant.update({
          where: { id: participantId },
          data: { isPaid: true },
        });
      });
    }

    revalidatePath(`/events/${eventId}`, "layout");
    return { data: { success: true }, errorMessage: null };
  } catch (error) {
    console.error("Error logging successful payment:", error);
    return { data: null, errorMessage: "Failed to log payment" };
  }
};

export const setPaymentStatus = async (
  status: "UNVERIFIED" | "COMPLETED" | "FAILED",
  paymentId: string
) => {
  try {
    const updatedPayment = await prisma.payments.updateMany({
      where: { id: paymentId },
      data: { status },
    });

    revalidatePath("/admin/payments");
    return { data: updatedPayment, errorMessage: null };
  } catch (error) {
    return { data: null, errorMessage: "Failed to set payment status" };
  }
};
