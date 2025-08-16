import RevealHero from "@/components/animations/RevealHero";

export default function EventsPage() {
  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl">Events</RevealHero>
      <span className="font-extralight">Coming Soon</span>
    </section>
  );
}
