import EventCard from "@/components/admin/events/EventCard";
import RevealHero from "@/components/animations/RevealHero";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventsAdminPage() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "asc" } });

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

      {events.length === 0 && (
        <p className="text-muted-foreground">No events found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
