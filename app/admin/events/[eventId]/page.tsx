import EventForm from "@/components/admin/events/EventForm";
import RevealHero from "@/components/animations/RevealHero";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ eventId: string }[]> {
  const events = await prisma.event.findMany({
    select: { id: true },
  });

  return events.map((event) => ({
    eventId: event.id,
  }));
}

export default async function AdminEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) return notFound();

  return (
    <section className="flex w-full flex-col items-center">
      <RevealHero className="font-extrabold text-3xl">
        Event - {event?.name}
      </RevealHero>
      <EventForm event={event} type="update" />
    </section>
  );
}
