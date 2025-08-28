import { Event } from "@prisma/client";
import TimestampDisplay from "../TimeDisplay";

export const EventStatus = ({ event }: { event: Event }) => {
  const now = new Date();
  const registrationStartsAt = new Date(event.registrationStartsAt);
  const registrationEndsAt = new Date(event.registrationEndsAt);
  const startsAt = new Date(event.startsAt);
  const endsAt = new Date(event.endsAt);

  if (now < registrationStartsAt) {
    return (
      <span className="text-sm text-muted-foreground">
        Registration starts at{" "}
        <TimestampDisplay timestamp={event.registrationStartsAt} />
      </span>
    );
  }
  if (now >= registrationStartsAt && now < registrationEndsAt) {
    return (
      <span className="text-sm text-green-600">
        Registration ends in{" "}
        <TimestampDisplay timestamp={event.registrationEndsAt} />
      </span>
    );
  }
  if (now >= registrationEndsAt && now < startsAt) {
    return (
      <span className="text-sm text-yellow-600">
        Registration ended. Event starts at{" "}
        <TimestampDisplay timestamp={event.startsAt} />
      </span>
    );
  }
  if (now >= startsAt && now < endsAt) {
    return (
      <span className="text-sm text-blue-600">
        Event ongoing. Ends at <TimestampDisplay timestamp={event.endsAt} />
      </span>
    );
  }
  if (now >= endsAt) {
    return <span className="text-sm text-muted-foreground">Event ended.</span>;
  }
  return null;
};
