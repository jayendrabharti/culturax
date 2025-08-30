import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteEventButton from "./DeleteEventButton";
import { Badge } from "@/components/ui/badge";
import { EventWithTeamsAndParticipants } from "@/actions/admin";
import { formatTimestamp } from "@/utils/utils";

export default function EventCard({
  event,
}: {
  event: EventWithTeamsAndParticipants;
}) {
  const eventData: { label: string; value: string }[] = [
    { label: "Location", value: event.location },
    { label: "Fee", value: `₹${event.registrationFee}` },
    { label: "Starts", value: formatTimestamp(event.startsAt) ?? "N/A" },
    { label: "Ends", value: formatTimestamp(event.endsAt) ?? "N/A" },

    event.eventType === "TEAM"
      ? { label: "Teams", value: `${event.teams.length}` }
      : null,
    { label: "Participants", value: `${event.participants.length}` },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <Card>
      <CardContent className="flex flex-col space-y-4">
        {event.coverImage && (
          <Image
            className="w-full h-48 object-cover rounded-md"
            src={event.coverImage}
            alt={event.name}
            width={500}
            height={300}
          />
        )}
        <div className="flex flex-row items-center justify-between">
          <h4 className="font-bold text-xl mb-2">{event.name}</h4>
          <Badge>{event.eventType}</Badge>
        </div>
        <p className="text-xs font-light text-muted-foreground text-balance text-center w-full">
          {event.description}
        </p>
        <div>
          {eventData.map((item) => (
            <div
              className="flex flex-row justify-between gap-4 text-sm"
              key={item.label}
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-bold text-right">{item.value}</span>
            </div>
          ))}
        </div>
        <Separator className="my-2" />

        <div className="flex flex-row flex-wrap justify-end gap-2">
          <DeleteEventButton eventId={event.id} />

          <Link href={`/admin/events/${event.id}/teams-and-participants`}>
            <Button size={"sm"} variant={"outline"}>
              <UsersIcon />
              {event.eventType === "TEAM" ? "Teams" : "Participants"}
              <ExternalLinkIcon />
            </Button>
          </Link>

          <Link href={`/admin/events/${event.id}`}>
            <Button size={"sm"}>
              Open
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
