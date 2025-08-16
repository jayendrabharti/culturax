import { BanIcon } from "lucide-react";
import GoogleButton from "./GoogleButton";

export default function Unauthenticated() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      <BanIcon className="text-red-500 size-16" />
      <span className="text-2xl font-bold text-red-500">Unauthenticated</span>
      <span className="text-sm text-muted-foreground">
        You must be logged in to access this page.
      </span>
      <GoogleButton />
    </div>
  );
}
