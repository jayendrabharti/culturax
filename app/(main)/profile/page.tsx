import RevealHero from "@/components/animations/RevealHero";
import { SessionWithProfile } from "@/types/auth";
import ProfileForm from "@/components/Profile/ProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Unauthenticated from "@/components/auth/Unauthenticated";

export default async function ProfilePage() {
  const userSession = (await getServerSession(
    authOptions
  )) as SessionWithProfile | null;

  if (!userSession) {
    return <Unauthenticated />;
  }

  return (
    <section className="flex w-full flex-col p-4 items-center max-w-2xl mx-auto">
      <RevealHero className="font-extrabold text-3xl mb-8">Profile</RevealHero>
      <ProfileForm userSession={userSession} />
    </section>
  );
}
