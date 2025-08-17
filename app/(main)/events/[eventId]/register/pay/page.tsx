import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { SessionWithProfile } from "@/types/auth";
import {
  CheckCheckIcon,
  LayoutDashboardIcon,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealHero from "@/components/animations/RevealHero";
import { Separator } from "@/components/ui/separator";
import Payment from "@/components/Payment";

interface PaymentPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { eventId } = await params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    notFound();
  }

  const userSession = (await getServerSession(
    authOptions
  )) as SessionWithProfile;

  const participant = await prisma.participant.findFirst({
    where: {
      eventId: eventId,
      email: userSession.user.profile.email,
    },
    include: {
      team: true,
    },
  });

  if (!participant) {
    notFound();
  }

  if (event.eventType === "INDIVIDUAL") {
    if (participant.isPaid) {
      return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-5">
          <CheckCheckIcon className="size-16 text-green-500" />
          <span className="text-green-500 text-2xl font-extrabold">
            Payment complete
          </span>
          <Link href={`/dashboard`}>
            <Button variant={"outline"}>
              <LayoutDashboardIcon />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      );
    }
  } else {
    // Team event - check if user is team leader
    if (participant.team?.isPaid) {
      return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-5">
          <CheckCheckIcon className="size-16 text-green-500" />
          <span className="text-green-500 text-2xl font-extrabold">
            Payment complete
          </span>
          <Link href={`/dashboard`}>
            <Button variant={"outline"}>
              <LayoutDashboardIcon />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      );
    }

    // Check if user is team leader for payment
    if (!participant.isLeader) {
      return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-5 p-8">
          <AlertTriangle className="size-16 text-amber-500" />
          <span className="text-amber-600 text-2xl font-bold text-center">
            Only Team Leader Can Complete Payment
          </span>
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Please ask your team leader to complete the payment for the entire
              team.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Team:</strong> {participant.team?.name}
            </p>
          </div>
          <Link href={`/events/${event.id}`}>
            <Button variant={"outline"}>
              <LayoutDashboardIcon />
              Go Back to Event
            </Button>
          </Link>
        </div>
      );
    }
  }

  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl mb-3">
        {event.name} Payment
      </RevealHero>

      <div className="max-w-xl mx-auto p-8 bg-card border border-border rounded-xl shadow-md flex flex-col gap-6">
        <p className="text-muted-foreground mb-4">
          Complete your registration by making the payment below.
        </p>
        <div className="border border-muted rounded-lg p-6 bg-muted/40 flex flex-col gap-3">
          <h2 className="font-semibold text-lg mb-1">Payment Details</h2>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Event</span>
            <span className="font-medium">{event.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              {event.eventType === "TEAM" ? "Team Name" : "Participant Name"}
            </span>
            <span className="font-medium">
              {event.eventType === "TEAM"
                ? participant.team?.name
                : participant.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Registration Fee</span>
            <span className="font-bold text-green-600">
              ₹{event.registrationFee}
            </span>
          </div>
        </div>
        <Payment className="w-full" event={event} participant={participant} />
      </div>
    </section>
  );
}
