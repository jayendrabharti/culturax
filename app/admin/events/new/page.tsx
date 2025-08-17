import EventForm from "@/components/admin/events/EventForm";
import RevealHero from "@/components/animations/RevealHero";

export default async function NewEventSheet() {
  return (
    <section className="flex w-full flex-col items-center">
      <RevealHero className="font-extrabold text-3xl">New Events</RevealHero>
      <EventForm type={"create"} />
    </section>
  );
}
