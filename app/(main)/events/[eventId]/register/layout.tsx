import Unauthenticated from "@/components/auth/Unauthenticated";
import { SessionWithProfile } from "@/types/auth";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = (await getServerSession(
    authOptions
  )) as SessionWithProfile | null;

  if (!userSession) {
    return <Unauthenticated />;
  }

  return <>{children}</>;
}
