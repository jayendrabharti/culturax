import RevealHero from "@/components/animations/RevealHero";
import { prisma } from "@/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { getEventStatus } from "@/utils/events";

export default async function SchedulePage() {
  const events = await prisma.event.findMany({
    orderBy: {
      startsAt: "asc",
    },
  });

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.startsAt).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  const sortedDates = Object.keys(eventsByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  if (events.length === 0) {
    return (
      <section className="flex w-full flex-col p-4 items-center">
        <RevealHero className="font-extrabold text-3xl mb-8">
          Festival Schedule
        </RevealHero>
        <span className="font-extralight text-muted-foreground">
          No events scheduled yet
        </span>
      </section>
    );
  }

  return (
    <section className="w-full p-4">
      <div className="container mx-auto">
        <RevealHero className="font-extrabold text-3xl text-center mb-12">
          Festival Schedule
        </RevealHero>

        <div className="space-y-12">
          {sortedDates.map((dateKey) => {
            const date = new Date(dateKey);
            const dayEvents = eventsByDate[dateKey];

            return (
              <div key={dateKey} className="relative">
                {/* Date Header */}
                <div className="sticky top-4 z-10 mb-8">
                  <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-4 shadow-sm">
                    <h2 className="text-2xl font-bold text-center">
                      {date.toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

                  <div className="space-y-8">
                    {dayEvents.map((event) => {
                      const eventStatus = getEventStatus(event);
                      const startTime = new Date(event.startsAt);
                      const endTime = new Date(event.endsAt);
                      const regStartTime = new Date(event.registrationStartsAt);
                      const regEndTime = new Date(event.registrationEndsAt);

                      return (
                        <div key={event.id} className="relative ml-12">
                          {/* Timeline dot */}
                          <div className="absolute -left-10 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm"></div>

                          <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <CardTitle className="text-xl">
                                    {event.name}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <Badge
                                  variant={
                                    eventStatus.status === "registration_open"
                                      ? "default"
                                      : eventStatus.status === "upcoming"
                                      ? "secondary"
                                      : eventStatus.status === "ongoing"
                                      ? "destructive"
                                      : "outline"
                                  }
                                >
                                  {eventStatus.message}
                                </Badge>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <p className="text-muted-foreground line-clamp-2">
                                {event.description}
                              </p>

                              {/* Event Timeline */}
                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Registration Period */}
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm text-blue-600">
                                    Registration Period
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon className="h-3 w-3" />
                                      <span>
                                        {regStartTime.toLocaleDateString(
                                          "en-IN",
                                          {
                                            day: "numeric",
                                            month: "short",
                                          }
                                        )}{" "}
                                        -{" "}
                                        {regEndTime.toLocaleDateString(
                                          "en-IN",
                                          {
                                            day: "numeric",
                                            month: "short",
                                          }
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <ClockIcon className="h-3 w-3" />
                                      <span>
                                        {regStartTime.toLocaleTimeString(
                                          "en-IN",
                                          {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          }
                                        )}{" "}
                                        -{" "}
                                        {regEndTime.toLocaleTimeString(
                                          "en-IN",
                                          {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Event Period */}
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm text-green-600">
                                    Event Period
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon className="h-3 w-3" />
                                      <span>
                                        {startTime.toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                        })}{" "}
                                        -{" "}
                                        {endTime.toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <ClockIcon className="h-3 w-3" />
                                      <span>
                                        {startTime.toLocaleTimeString("en-IN", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}{" "}
                                        -{" "}
                                        {endTime.toLocaleTimeString("en-IN", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Event Details */}
                              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                                <div className="flex items-center gap-1">
                                  <UsersIcon className="h-4 w-4" />
                                  <span>
                                    {event.eventType === "TEAM"
                                      ? `Team (${event.minParticipantsPerTeam}-${event.maxParticipantsPerTeam})`
                                      : "Individual"}
                                  </span>
                                </div>
                                {event.registrationFee > 0 && (
                                  <div>
                                    <span className="font-medium">
                                      ₹{event.registrationFee}
                                    </span>
                                  </div>
                                )}
                                {event.maxTeams && (
                                  <div>
                                    <span>Max teams: {event.maxTeams}</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
