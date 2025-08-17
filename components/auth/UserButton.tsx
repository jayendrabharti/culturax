"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { Loader2Icon, LockIcon, UserRoundCogIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { SessionWithProfile } from "@/types/auth";
import GoogleButton from "./GoogleButton";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function UserButton({ className = "" }: { className?: string }) {
  const { data: session, status } = useSession();
  const userSession = session as SessionWithProfile | null;

  if (status == "loading")
    return <Loader2Icon className={cn("animate-spin", className)} />;

  if (status == "unauthenticated") return <GoogleButton />;

  const initials = userSession?.user.profile?.name
    ? userSession.user.profile.name.slice(0, 2).toUpperCase()
    : userSession?.user?.email?.slice(0, 2).toUpperCase();

  if (userSession)
    return (
      <div className={cn("flex items-center", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={
                  userSession?.user.profile?.image ||
                  `/images/blankProfilePicture.jpg`
                }
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="space-y-2 px-3 py-2 text-center">
              {userSession?.user.profile?.name && (
                <span className="block font-medium text-gray-900 dark:text-gray-100">
                  {userSession.user.profile.name}
                </span>
              )}
              <Separator />
              {userSession?.user?.profile?.email && (
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {userSession.user.profile.email}
                </span>
              )}
              {userSession?.user.profile?.phone && (
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {userSession.user.profile.phone}
                </span>
              )}
            </div>

            <DropdownMenuSeparator />

            <div className="flex flex-col gap-2 p-1">
              <Link href="/profile" prefetch={true}>
                <Button
                  variant={"outline"}
                  className="mx-auto flex w-full items-center justify-start"
                >
                  <UserRoundCogIcon />
                  Profile Settings
                </Button>
              </Link>

              {userSession?.user?.profile?.isAdmin && (
                <Link href={`/admin`} prefetch={true}>
                  <Button
                    variant={"outline"}
                    className="mx-auto flex w-full items-center justify-start"
                  >
                    <LockIcon />
                    Admin Dashboard
                  </Button>
                </Link>
              )}

              <SignOutButton className="mx-auto flex w-full items-center justify-start" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
}
