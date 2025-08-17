import RevealHero from "@/components/animations/RevealHero";

export default async function DashboardPage() {
  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl mb-3">
        Dashboard (Registered events)
      </RevealHero>
      <span>Coming soon</span>
    </section>
  );
}
