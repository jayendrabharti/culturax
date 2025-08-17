import { formatTimestamp } from "@/utils/utils";
import { Event } from "@prisma/client";
import {
  CalendarIcon,
  ExternalLinkIcon,
  MapPinIcon,
  UserPlus2Icon,
} from "lucide-react";
import Image from "next/image";
import { EventStatus } from "./EventStatus";
import Link from "next/link";
import { Button } from "../ui/button";
import { isRegistrationOpen } from "@/utils/events";

export default function EventCard({
  event,
  className = "",
}: {
  event: Event;
  className?: string;
}) {
  return (
    <div
      key={event.id}
      className={`border border-border shadow-lg rounded-3xl p-6 flex flex-col gap-4 items-center transition hover:scale-[1.02] hover:shadow-xl bg-card ${className}`}
    >
      <Image
        src={event.coverImage}
        alt={event.name}
        width={240}
        height={120}
        className="object-cover rounded-xl w-full border border-border mb-2"
      />
      <h4 className="font-extrabold text-2xl text-center">{event.name}</h4>
      <div className="flex flex-row items-center gap-2 text-base font-semibold text-muted-foreground">
        <MapPinIcon size={18} />
        <span>{event.location}</span>
      </div>
      <div className="flex flex-row items-center gap-2 text-base text-muted-foreground">
        <CalendarIcon size={18} />
        <span>{`${formatTimestamp(event.startsAt)} - ${formatTimestamp(
          event.endsAt
        )}`}</span>
      </div>
      <EventStatus event={event} />
      <div className="flex flex-row items-center justify-end gap-3 w-full mt-2">
        {isRegistrationOpen(event) && (
          <Link href={`/events/${event.id}/register`}>
            <Button size="sm" className="flex gap-1 items-center">
              <UserPlus2Icon size={16} />
              Register Now
            </Button>
          </Link>
        )}
        <Link href={`/events/${event.id}`}>
          <Button
            size="sm"
            variant="outline"
            className="flex gap-1 items-center"
          >
            <ExternalLinkIcon size={16} />
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
