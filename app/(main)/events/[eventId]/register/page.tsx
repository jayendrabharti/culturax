import RevealHero from "@/components/animations/RevealHero";
import { IndividualEventRegistration } from "@/components/events/IndividualEventRegistration";
import { TeamEventRegistration } from "@/components/events/TeamEventRegistration";
import { prisma } from "@/prisma/client";
import { SessionWithProfile } from "@/types/auth";
import { authOptions } from "@/utils/authOptions";
import { getEventStatus } from "@/utils/events";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import {
  checkRegistrationStatus,
  checkEventAvailability,
} from "@/actions/registration";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, AlertTriangle, Users } from "lucide-react";

export async function generateStaticParams() {
  const events = await prisma.event.findMany({
    select: { id: true },
  });

  return events.map((event) => ({
    slug: event.id,
  }));
}

export default async function RegisterEventsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const userSession = (await getServerSession(
    authOptions
  )) as SessionWithProfile;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      teams: true,
      participants: true,
    },
  });

  if (!event) return notFound();

  const eventStatusInfo = getEventStatus(event);

  // Check if user is already registered
  const { data: registrationStatus } = await checkRegistrationStatus(
    eventId,
    userSession.user.profile.email
  );

  // Check event availability
  const { data: eventAvailability } = await checkEventAvailability(eventId);

  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="text-3xl mb-3">
        Event Registration -{" "}
        <span className="font-extrabold underline">{event.name}</span>
      </RevealHero>

      {!eventStatusInfo.canRegister && (
        <>
          <span className="font-bold">{eventStatusInfo.message}</span>
          <span className="font-extralight text-muted-foreground">
            You cannot register for this event at this moment.
          </span>
        </>
      )}

      {/* Event availability check */}
      {eventAvailability && !eventAvailability.canRegister && (
        <Card className="w-full max-w-md border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              {eventAvailability.isRegistrationClosed
                ? "Registration Closed"
                : "Event Full"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              {eventAvailability.isRegistrationClosed
                ? "Registration for this event has been closed by the organizers."
                : `All ${eventAvailability.totalSlots} slots have been filled for this event.`}
            </p>
            {eventAvailability.isFull && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {eventAvailability.totalSlots} /{" "}
                  {eventAvailability.totalSlots} slots filled
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {eventStatusInfo.canRegister &&
        registrationStatus &&
        eventAvailability?.canRegister && (
          <>
            {registrationStatus.isRegistered && registrationStatus.isPaid ? (
              // Already registered and paid
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    Successfully Registered!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    You are successfully registered and have completed payment
                    for this event.
                  </p>
                  {registrationStatus.team && (
                    <p className="text-sm">
                      <strong>Team:</strong> {registrationStatus.team.name}
                    </p>
                  )}
                  <p className="text-sm">
                    <strong>Registration Status:</strong> Confirmed
                  </p>
                </CardContent>
              </Card>
            ) : registrationStatus.isRegistered &&
              !registrationStatus.isPaid ? (
              // Registered but not paid
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-orange-600">
                    <CreditCard className="h-6 w-6" />
                    Complete Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    You are registered for this event but need to complete
                    payment.
                  </p>
                  {registrationStatus.team && (
                    <p className="text-sm">
                      <strong>Team:</strong> {registrationStatus.team.name}
                    </p>
                  )}

                  {/* Team leader payment restriction */}
                  {registrationStatus.team &&
                  !registrationStatus.isTeamLeader ? (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-600 font-medium">
                        ⚠️ Ask team leader to complete payment
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Only the team leader can complete payment for the entire
                        team.
                      </p>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={`/events/${eventId}/register/pay`}>
                        Complete Payment
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              // Not registered - show registration forms
              <>
                {event.eventType === "TEAM" ? (
                  <TeamEventRegistration event={event} session={userSession} />
                ) : (
                  <IndividualEventRegistration
                    event={event}
                    session={userSession}
                  />
                )}
              </>
            )}
          </>
        )}

      {eventStatusInfo.canRegister && !registrationStatus && (
        <div className="text-center text-red-600">
          <p>Error checking registration status. Please try again.</p>
        </div>
      )}
    </section>
  );
}
