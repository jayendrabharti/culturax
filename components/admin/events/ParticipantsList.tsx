import { ParticipantWithData } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon } from "lucide-react";

export default function ParticipantsList({
  participants,
}: {
  participants: ParticipantWithData[];
}) {
  return (
    <div className="flex flex-col w-full">
      {participants.map((participant, index) => (
        <div
          key={participant.id}
          className=" flex flex-row text-lg border-border border bg-card rounded-md shadow-md px-2 gap-2 items-center flex-wrap"
        >
          <span>{index + 1}.</span>
          <span className="font-bold">{participant.name}</span>
          <Button variant={"ghost"}>
            <MailIcon /> {participant.email ?? "N/A"}
          </Button>
          <Button variant={"ghost"}>
            <PhoneIcon /> {participant.phone ?? "N/A"}
          </Button>
        </div>
      ))}
    </div>
  );
}
