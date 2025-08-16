import RevealHero from "@/components/animations/RevealHero";
import Unauthenticated from "@/components/auth/Unauthenticated";
import { SessionWithProfile } from "@/types/auth";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function RegisterPage() {
  const userSession = (await getServerSession(
    authOptions
  )) as SessionWithProfile | null;

  if (!userSession) {
    return <Unauthenticated />;
  }

  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl">Register</RevealHero>
      <span className="font-extralight">Starting Soon</span>
    </section>
  );
}
