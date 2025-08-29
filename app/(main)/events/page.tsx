import RevealHero from "@/components/animations/RevealHero";
import EventCard from "@/components/events/EventCard";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl mb-3">Events</RevealHero>
      {events.length === 0 && (
        <p className="text-center text-muted-foreground">
          No events available at the moment. Check back soon!
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
