import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2Icon className="text-primary h-10 w-10 animate-spin" />
    </div>
  );
}
