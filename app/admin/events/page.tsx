"use client";
import { EventWithTeamsAndParticipants, getEvents } from "@/actions/admin";
import EventCard from "@/components/admin/events/EventCard";
import RevealHero from "@/components/animations/RevealHero";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventWithTeamsAndParticipants[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const events = await getEvents();
      setEvents(events);
    });
  }, []);

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex flex-row w-full justify-between items-center">
        <RevealHero className="font-extrabold text-3xl">Events</RevealHero>
        <Link href="/admin/events/new">
          <Button variant="outline">
            <PlusIcon />
            Create New Event
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="w-full p-10 flex justify-center items-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <>
          {events.length === 0 && (
            <p className="text-muted-foreground">No events found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
