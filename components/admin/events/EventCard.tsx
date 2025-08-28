import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Event } from "@prisma/client";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteEventButton from "./DeleteEventButton";
import { Badge } from "@/components/ui/badge";
import TimestampDisplay from "@/components/TimeDisplay";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardContent className="flex flex-col space-y-4">
        {event.coverImage && (
          <Image
            className="w-full h-48 object-cover mb-4 rounded-md"
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
        <p className="text-base mb-2">{event.description}</p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Type:</span> {event.eventType}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Fee:</span> ₹{event.registrationFee}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Starts:</span>{" "}
          <TimestampDisplay timestamp={event.startsAt} />
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Ends:</span>{" "}
          <TimestampDisplay timestamp={event.endsAt} />
        </p>

        <Separator className="my-2" />

        <div className="flex flex-row justify-end gap-2">
          <DeleteEventButton eventId={event.id} />

          <Link href={`/admin/events/${event.id}`}>
            <Button>
              Open
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
