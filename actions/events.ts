"use server";

import { EventFormData } from "@/components/admin/events/EventForm";
import prisma from "@/prisma/client";
import { getErrorMessage } from "@/utils/utils";
import { revalidatePath } from "next/cache";

// Type for cleaned data coming from client
type CleanedEventData = Omit<
  EventFormData,
  "startsAt" | "endsAt" | "registrationStartsAt" | "registrationEndsAt"
> & {
  startsAt: string;
  endsAt: string;
  registrationStartsAt: string;
  registrationEndsAt: string;
};

export const createEvent = async (data: CleanedEventData) => {
  try {
    // Convert string dates back to Date objects for Prisma
    const eventData = {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
      registrationStartsAt: new Date(data.registrationStartsAt),
      registrationEndsAt: new Date(data.registrationEndsAt),
    };

    const event = await prisma.event.create({ data: eventData });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");

    return { data: event, errorMessage: null };
  } catch (error) {
    return { data: null, errorMessage: getErrorMessage(error) };
  }
};

export const updateEvent = async (eventId: string, data: CleanedEventData) => {
  try {
    const eventData = {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
      registrationStartsAt: new Date(data.registrationStartsAt),
      registrationEndsAt: new Date(data.registrationEndsAt),
    };

    const event = await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");

    return { data: event, errorMessage: null };
  } catch (error) {
    return { data: null, errorMessage: getErrorMessage(error) };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");

    return { data: null, errorMessage: null };
  } catch (error) {
    return { data: null, errorMessage: getErrorMessage(error) };
  }
};
