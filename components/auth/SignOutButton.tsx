"use client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton({
  className = "",
}: {
  className?: string;
}) {
  const [signingOut, startSignOut] = useTransition();

  return (
    <Button
      onClick={() => {
        startSignOut(async () => {
          await signOut();
          toast.success("Signed out !!");
        });
      }}
      disabled={signingOut}
      variant={"destructive"}
      className={cn(`active:scale-90 ${className}`)}
    >
      {signingOut ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <LogOutIcon className="size-4" />
      )}
      {signingOut ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}
