import { Event } from "@prisma/client";

export const isRegistrationOpen = (event: Event) => {
  const now = new Date();
  return event.registrationStartsAt <= now && event.registrationEndsAt >= now;
};

export function getEventStatus(event: Event) {
  const now = new Date();
  const registrationStart = new Date(event.registrationStartsAt);
  const registrationEnd = new Date(event.registrationEndsAt);
  const eventStart = new Date(event.startsAt);
  const eventEnd = new Date(event.endsAt);

  if (now < registrationStart) {
    return {
      status: "upcoming",
      message: "Registration Opens Soon",
      canRegister: false,
    };
  } else if (
    now >= registrationStart &&
    now <= registrationEnd &&
    now < eventStart
  ) {
    return {
      status: "registration_open",
      message: "Registration Open",
      canRegister: true,
    };
  } else if (now > registrationEnd && now < eventStart) {
    return {
      status: "registration_closed",
      message: "Registration Closed",
      canRegister: false,
    };
  } else if (now >= eventStart && now <= eventEnd) {
    return { status: "ongoing", message: "Event Ongoing", canRegister: false };
  } else if (now > eventEnd) {
    return { status: "ended", message: "Event Ended", canRegister: false };
  }

  return { status: "unknown", message: "Status Unknown", canRegister: false };
}
