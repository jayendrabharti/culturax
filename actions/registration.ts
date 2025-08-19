"use server";

import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/utils/utils";

// Type definitions for registration
export type ParticipantData = {
  name: string;
  email: string;
  phone: string;
  year?: string;
  course?: string;
};

export type TeamRegistrationData = {
  teamName: string;
  teamDescription?: string;
  participants: ParticipantData[];
};

export type IndividualRegistrationData = ParticipantData;

interface EventDetails {
  name: string;
  id: string;
  registrationFee: number;
  _count: {
    teams: number;
  };
  eventType: "INDIVIDUAL" | "TEAM";
  minParticipantsPerTeam: number | null;
  maxParticipantsPerTeam: number | null;
  maxTeams: number | null;
  registrationEndsAt: Date;
  registrationOpen: boolean;
}

// Individual event registration
export async function registerForIndividualEvent(
  eventId: string,
  data: IndividualRegistrationData
) {
  try {
    // Get event details for validation
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        name: true,
        eventType: true,
        registrationOpen: true,
        registrationEndsAt: true,
        registrationFee: true,
      },
    });

    if (!event) {
      return { data: null, errorMessage: "Event not found" };
    }

    if (!event.registrationOpen) {
      return {
        data: null,
        errorMessage: "Registration is closed for this event",
      };
    }

    if (new Date() > event.registrationEndsAt) {
      return { data: null, errorMessage: "Registration deadline has passed" };
    }

    if (event.eventType !== "INDIVIDUAL") {
      return { data: null, errorMessage: "This is not an individual event" };
    }

    // Check if user is already registered
    const existingParticipant = await prisma.participant.findUnique({
      where: {
        email_eventId: {
          email: data.email,
          eventId: eventId,
        },
      },
    });

    if (existingParticipant) {
      return {
        data: null,
        errorMessage: "You are already registered for this event",
      };
    }

    // Create participant
    const participant = await prisma.participant.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        year: data.year,
        course: data.course,
        eventId: eventId,
        registrationFee: event.registrationFee,
        isLeader: true, // Individual participants are considered leaders
        isPaid: event.registrationFee === 0,
      },
    });

    revalidatePath(`/events/${eventId}/register`);
    revalidatePath(`/events/${eventId}`);
    return { data: participant, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        data: null,
        errorMessage: "You are already registered for this event",
      };
    }
    return { data: null, errorMessage: getErrorMessage(error) };
  }
}

// Team event registration
export async function registerForTeamEvent(
  event: EventDetails,
  data: TeamRegistrationData,
  leaderEmail: string
) {
  try {
    if (!event) {
      return { data: null, errorMessage: "Event not found" };
    }

    if (!event.registrationOpen) {
      return {
        data: null,
        errorMessage: "Registration is closed for this event",
      };
    }

    if (new Date() > event.registrationEndsAt) {
      return { data: null, errorMessage: "Registration deadline has passed" };
    }

    if (event.eventType !== "TEAM") {
      return { data: null, errorMessage: "This is not a team event" };
    }

    // Validate team size
    const participantCount = data.participants.length;
    if (
      event.minParticipantsPerTeam &&
      participantCount < event.minParticipantsPerTeam
    ) {
      return {
        data: null,
        errorMessage: `Team must have at least ${event.minParticipantsPerTeam} participants`,
      };
    }

    if (
      event.maxParticipantsPerTeam &&
      participantCount > event.maxParticipantsPerTeam
    ) {
      return {
        data: null,
        errorMessage: `Team cannot have more than ${event.maxParticipantsPerTeam} participants`,
      };
    }

    // Check if maximum teams limit is reached
    if (event.maxTeams && event._count.teams >= event.maxTeams) {
      return {
        data: null,
        errorMessage: "Maximum number of teams reached for this event",
      };
    }

    // Check if team name already exists for this event
    const existingTeam = await prisma.team.findUnique({
      where: {
        name_eventId: {
          name: data.teamName,
          eventId: event.id,
        },
      },
    });

    if (existingTeam) {
      return {
        data: null,
        errorMessage: "Team name already exists for this event",
      };
    }

    // Check if any participant is already registered for this event
    const participantEmails = data.participants.map((p) => p.email);
    const existingParticipants = await prisma.participant.findMany({
      where: {
        eventId: event.id,
        email: {
          in: participantEmails,
        },
      },
      select: { email: true },
    });

    if (existingParticipants.length > 0) {
      const existingEmails = existingParticipants
        .map((p) => p.email)
        .join(", ");
      return {
        data: null,
        errorMessage: `The following participants are already registered: ${existingEmails}`,
      };
    }

    // Validate that leader email is in participants
    const leaderInTeam = data.participants.find((p) => p.email === leaderEmail);
    if (!leaderInTeam) {
      return {
        data: null,
        errorMessage: "Team leader must be included in the participants list",
      };
    }

    // Create team and participants in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create team
      const team = await tx.team.create({
        data: {
          name: data.teamName,
          description: data.teamDescription,
          eventId: event.id,
          leaderEmail: leaderEmail,
          registrationFee: event.registrationFee * participantCount,
          isPaid: event.registrationFee === 0, // Mark as paid if fee is 0
        },
      });

      const participants = await tx.participant.createMany({
        data: data.participants.map((participant) => ({
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          year: participant.year,
          course: participant.course,
          eventId: event.id,
          teamId: team.id,
          registrationFee: event.registrationFee,
          isLeader: participant.email === leaderEmail,
          isPaid: event.registrationFee === 0, // Mark as paid if fee is 0
        })),
      });

      return { team, participants };
    });

    revalidatePath(`/events/${event.id}/register`);
    revalidatePath(`/events/${event.id}`);
    return { data: result, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        data: null,
        errorMessage:
          "Team name already exists or participant already registered",
      };
    }
    return { data: null, errorMessage: getErrorMessage(error) };
  }
}

// Check registration status for a user
export async function checkRegistrationStatus(
  eventId: string,
  userEmail: string
) {
  try {
    const participant = await prisma.participant.findUnique({
      where: {
        email_eventId: {
          email: userEmail,
          eventId: eventId,
        },
      },
      include: {
        team: true,
      },
    });

    if (!participant) {
      return {
        data: {
          isRegistered: false,
          isPaid: false,
          participant: null,
          team: null,
        },
        errorMessage: null,
      };
    }

    // For individual events, check participant's isPaid
    // For team events, check team's isPaid
    const isPaid = participant.team
      ? participant.team.isPaid
      : participant.isPaid;

    return {
      data: {
        isRegistered: true,
        isPaid,
        participant,
        team: participant.team,
        isTeamLeader: participant.isLeader,
      },
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error),
    };
  }
}

// Check if emails are already registered for an event
export async function checkEmailsAlreadyRegistered(
  eventId: string,
  emails: string[]
) {
  try {
    const existingParticipants = await prisma.participant.findMany({
      where: {
        eventId: eventId,
        email: {
          in: emails,
        },
      },
      select: {
        email: true,
        name: true,
        team: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      data: existingParticipants,
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error),
    };
  }
}

// Check if event has available slots
export async function checkEventAvailability(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        registrationOpen: true,
        maxTeams: true,
        eventType: true,
        _count: {
          select: {
            teams: true,
            participants: true,
          },
        },
      },
    });

    if (!event) {
      return {
        data: null,
        errorMessage: "Event not found",
      };
    }

    const isRegistrationClosed = !event.registrationOpen;
    const isFull = event.maxTeams
      ? event._count.teams >= event.maxTeams
      : false;

    return {
      data: {
        canRegister: !isRegistrationClosed && !isFull,
        isRegistrationClosed,
        isFull,
        availableSlots: event.maxTeams
          ? event.maxTeams - event._count.teams
          : null,
        totalSlots: event.maxTeams,
      },
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getEventDetails(
  eventId: string
): Promise<EventDetails | null> {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        name: true,
        id: true,
        registrationFee: true,
        _count: {
          select: { teams: true },
        },
        eventType: true,
        minParticipantsPerTeam: true,
        maxParticipantsPerTeam: true,
        maxTeams: true,
        registrationEndsAt: true,
        registrationOpen: true,
      },
    });

    return event;
  } catch (error) {
    console.error("Error fetching event details:", getErrorMessage(error));
    return null;
  }
}
