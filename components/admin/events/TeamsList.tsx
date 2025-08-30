import { TeamWithData } from "@/actions/admin";

export default function TeamsList({ teams }: { teams: TeamWithData[] }) {
  return (
    <div className="flex flex-col w-full">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className=" flex flex-row text-lg border-border border bg-card rounded-md shadow-md px-2 gap-2 items-center flex-wrap"
        >
          <span>{index + 1}.</span>
          <span className="font-bold">{team.name}</span>
        </div>
      ))}
    </div>
  );
}
