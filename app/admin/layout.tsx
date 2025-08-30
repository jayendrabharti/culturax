import AdminBottomBar from "@/components/admin/AdminBottomBar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSideBar from "@/components/admin/AdminSideBar";
import Unauthenticated from "@/components/auth/Unauthenticated";
import Main from "@/components/Main";
import { Button } from "@/components/ui/button";
import { SessionWithProfile } from "@/types/auth";
import { authOptions } from "@/utils/authOptions";
import { BanIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminLayout({
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

  if (!userSession.user.profile.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-2">
        <BanIcon className="text-red-500 size-16" />
        <span className="text-2xl font-bold text-red-500">
          Admin Access Only
        </span>
        <Link href="/">
          <Button variant="outline">
            <HomeIcon />
            Go back to home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Main className="bg-background text-foreground grid h-full max-h-dvh w-full grid-rows-[auto_1fr]">
      <div className="flex min-h-screen flex-row">
        <AdminSideBar className="hidden md:block" />
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <div className="flex w-full flex-1 flex-col gap-3 overflow-y-scroll p-3 pb-20 md:pb-3">
            {children}
          </div>
          <AdminBottomBar className="block md:hidden" />
        </div>
      </div>
    </Main>
  );
}
