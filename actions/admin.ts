"use server";

import { prisma } from "@/prisma/client";
import type { Event, Prisma } from "@prisma/client";

export interface EventWithTeamsAndParticipants
  extends Prisma.EventGetPayload<{
    include: {
      teams: {
        select: { id: true };
      };
      participants: {
        select: { id: true };
      };
    };
  }> {}

export interface TeamWithData
  extends Prisma.TeamGetPayload<{
    include: {
      payments: true;
      participants: {
        include: {
          payments: true;
          profile: true;
        };
      };
    };
  }> {}

export interface ParticipantWithData
  extends Prisma.ParticipantGetPayload<{
    include: {
      payments: true;
      profile: true;
    };
  }> {}

// users
export const getUsersCount = async () => {
  const count = await prisma.profile.count();
  return count;
};

export const getUsers = async (options: Prisma.ProfileFindManyArgs = {}) => {
  const profiles = await prisma.profile.findMany(options);
  return profiles;
};

// payments
export const getPaymentsCount = async () => {
  const count = await prisma.payments.count();
  return count;
};

export const getPayments = async (
  options: Prisma.PaymentsFindManyArgs = {}
) => {
  const payments = await prisma.payments.findMany(options);
  return payments;
};

// events
export const getEventsCount = async () => {
  const count = await prisma.event.count();
  return count;
};

export const getEvents = async (): Promise<EventWithTeamsAndParticipants[]> => {
  const events = await prisma.event.findMany({
    include: {
      teams: {
        select: { id: true },
      },
      participants: {
        select: { id: true },
      },
    },
  });

  return events;
};

export const getTeamsAndParticipantsByEventId = async (
  id: string
): Promise<{
  teams?: TeamWithData[];
  participants?: ParticipantWithData[];
  event: Event;
}> => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error(`Event with id ${id} not found`);
  }

  if (event.eventType === "INDIVIDUAL") {
    const participants = await prisma.participant.findMany({
      where: { eventId: id },
      include: {
        payments: true,
        profile: true,
      },
    });

    return { participants, event };
  } else {
    const teams = await prisma.team.findMany({
      where: { eventId: id },
      include: {
        payments: true,
        participants: {
          include: {
            payments: true,
            profile: true,
          },
        },
      },
    });

    return { teams, event };
  }
};
