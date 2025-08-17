import RevealHero from "@/components/animations/RevealHero";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UserPlus2Icon,
} from "lucide-react";
import { formatTimestamp } from "@/utils/utils";
import { getEventStatus } from "@/utils/events";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { Delta } from "quill";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      teams: true,
      participants: true,
    },
  });

  if (!event) return notFound();

  const participantCount = event.participants.length;
  const teamCount = event.teams.length;
  const eventStatusInfo = getEventStatus(event);

  return (
    <div className="w-full bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-card border-b border-border/50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Event Image */}
            <div className="w-full lg:w-1/3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20">
                <Image
                  src={event.coverImage}
                  alt={event.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Event Header Info */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium"
                  >
                    {event.eventType}
                  </Badge>
                  <Badge
                    variant={
                      eventStatusInfo.status === "registration_open"
                        ? "default"
                        : eventStatusInfo.status === "ongoing"
                        ? "default"
                        : eventStatusInfo.status === "ended"
                        ? "destructive"
                        : "secondary"
                    }
                    className="px-3 py-1 text-sm font-medium"
                  >
                    {eventStatusInfo.message}
                  </Badge>
                </div>

                <RevealHero className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {event.name}
                </RevealHero>

                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>{formatTimestamp(event.startsAt, 2)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <span>{formatTimestamp(event.startsAt, 1)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4 text-primary" />
                  <span>₹{event.registrationFee}</span>
                </div>
              </div>

              {/* Register Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                {eventStatusInfo.canRegister ? (
                  <Link href={`/events/${event.id}/register`}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 text-lg font-semibold"
                    >
                      <UserPlus2Icon className="mr-2 h-5 w-5" />
                      Register Now
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 text-lg font-semibold"
                    disabled
                  >
                    <UserPlus2Icon className="mr-2 h-5 w-5" />
                    {eventStatusInfo.message}
                  </Button>
                )}

                {eventStatusInfo.canRegister && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    Registration ends:{" "}
                    {formatTimestamp(event.registrationEndsAt, 2)}
                  </div>
                )}
                {eventStatusInfo.status === "ongoing" && (
                  <div className="flex items-center text-sm text-green-600">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    Event is currently ongoing
                  </div>
                )}
                {eventStatusInfo.status === "ended" && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    Event ended on {formatTimestamp(event.endsAt, 2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  About This Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <Separator />
                {event.about && (
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <RichTextEditor
                      content={event.about as unknown as Delta}
                      readOnly
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Timeline */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Event Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div>
                      <div className="font-semibold">Registration Opens</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTimestamp(event.registrationStartsAt, 1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div>
                      <div className="font-semibold">Registration Ends</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTimestamp(event.registrationEndsAt, 1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div>
                      <div className="font-semibold">Event Starts</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTimestamp(event.startsAt, 1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div>
                      <div className="font-semibold">Event Ends</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTimestamp(event.endsAt, 1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Stats */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Event Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-2xl font-bold text-primary">
                      {participantCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Participants
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border/50">
                    <div className="text-2xl font-bold">{teamCount}</div>
                    <div className="text-sm text-muted-foreground">Teams</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline">{event.eventType}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Registration Fee:
                    </span>
                    <span className="font-semibold">
                      ₹{event.registrationFee}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold text-right">
                      {event.location}
                    </span>
                  </div>
                  {event.eventType === "TEAM" && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Team Size:
                        </span>
                        <span className="font-semibold">
                          {event.minParticipantsPerTeam}-
                          {event.maxParticipantsPerTeam} members
                        </span>
                      </div>
                      {event.maxTeams && (
                        <>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Max Teams:
                            </span>
                            <span className="font-semibold">
                              {event.maxTeams}
                            </span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Registration Status */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  {eventStatusInfo.canRegister ? (
                    <Link href={`/events/${event.id}/register`}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        <UserPlus2Icon className="mr-2 h-4 w-4" />
                        Register Now
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      disabled
                    >
                      <UserPlus2Icon className="mr-2 h-4 w-4" />
                      {eventStatusInfo.message}
                    </Button>
                  )}

                  {eventStatusInfo.canRegister && (
                    <p className="text-xs text-muted-foreground">
                      Registration closes on{" "}
                      {formatTimestamp(event.registrationEndsAt, 2)}
                    </p>
                  )}
                  {eventStatusInfo.status === "ongoing" && (
                    <p className="text-xs text-green-600">
                      Event is currently ongoing
                    </p>
                  )}
                  {eventStatusInfo.status === "ended" && (
                    <p className="text-xs text-muted-foreground">
                      Event ended on {formatTimestamp(event.endsAt, 2)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
