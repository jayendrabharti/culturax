import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import { prisma } from "@/prisma/client";

export default async function Home() {
  // Fetch events for the events section
  const events = await prisma.event.findMany({
    orderBy: {
      startsAt: "asc",
    },
    take: 6, // Show only first 6 events on home page
  });

  return (
    <>
      <HeroSection />
      <EventsSection events={events} />
    </>
  );
}
