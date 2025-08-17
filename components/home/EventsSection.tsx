import { Event } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  IndianRupeeIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { getEventStatus } from "@/utils/events";
import Image from "next/image";

interface EventsSectionProps {
  events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Events</h2>
          <p className="text-center text-muted-foreground">
            No events available at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const eventStatus = getEventStatus(event);

            return (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Image
                      src={event.coverImage}
                      alt={event.name}
                      className="w-full h-48 object-cover rounded-lg"
                      width={500}
                      height={200}
                    />
                    <div className="absolute top-2 right-2">
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
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>
                  </CardHeader>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(event.startsAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.eventType === "TEAM"
                          ? `Team Event (${event.minParticipantsPerTeam}-${event.maxParticipantsPerTeam} members)`
                          : "Individual Event"}
                      </span>
                    </div>

                    {event.registrationFee > 0 && (
                      <div className="flex items-center gap-2">
                        <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                        <span>₹{event.registrationFee}</span>
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/events">
              View All Events <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
