import EventForm from "@/components/admin/events/EventForm";
import RevealHero from "@/components/animations/RevealHero";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { ExternalLinkIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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
      <RevealHero className="font-extrabold text-3xl flex flex-row gap-3 text-center">
        Event - {event?.name}
        <Link href={`/admin/events/${event.id}/teams-and-participants`}>
          <Button size={"sm"} variant={"outline"}>
            <UsersIcon />
            {event.eventType === "TEAM" ? "Teams" : "Participants"}
            <ExternalLinkIcon />
          </Button>
        </Link>
      </RevealHero>
      <EventForm event={event} type="update" />
    </section>
  );
}
