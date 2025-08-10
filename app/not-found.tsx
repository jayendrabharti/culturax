import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BanIcon, HomeIcon } from "lucide-react";

export default async function NotFound() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center space-y-5">
      <BanIcon className="size-20 font-bold" />
      <span className="text-4xl font-extrabold">Not found</span>
      <span>This page does not exist.</span>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href={"/"} prefetch={true}>
          <Button className="active:scale-90">
            <HomeIcon />
            Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
