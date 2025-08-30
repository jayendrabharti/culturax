"use client";

import {
  getTeamsAndParticipantsByEventId,
  ParticipantWithData,
  TeamWithData,
} from "@/actions/admin";
import ParticipantsList from "@/components/admin/events/ParticipantsList";
import TeamsList from "@/components/admin/events/TeamsList";
import RevealHero from "@/components/animations/RevealHero";
import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import { ExternalLinkIcon, LoaderCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function TeamsAndParticipantsPage() {
  const { eventId } = useParams<{ eventId: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [teams, setTeams] = useState<TeamWithData[] | null>(null);
  const [participants, setParticipants] = useState<
    ParticipantWithData[] | null
  >(null);
  const [loading, startLoading] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startLoading(async () => {
      try {
        const { event, teams, participants } =
          await getTeamsAndParticipantsByEventId(eventId);

        setEvent(event);

        if (teams) {
          setTeams(teams);
        } else if (participants) {
          setParticipants(participants);
        }
      } catch (error) {
        setError("Failed to load teams and participants");
      }
    });
  }, [eventId]);

  if (error) {
    <div className="w-full p-10 flex justify-center items-center">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex flex-row w-full justify-between items-center">
        <RevealHero className="text-3xl">
          {event ? (
            <>
              <span className="underline">
                {event.eventType === "TEAM" ? "Teams: " : "Participants: "}
              </span>
              <span className="font-extrabold">{event.name}</span>
            </>
          ) : (
            <span className="font-extrabold">Loading...</span>
          )}
        </RevealHero>
        <Link href={`/admin/events/${eventId}`}>
          <Button variant="outline">
            Go to Event
            <ExternalLinkIcon />
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="w-full p-10 flex justify-center items-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <>
          {participants && <ParticipantsList participants={participants} />}
          {teams && <TeamsList teams={teams} />}
        </>
      )}
    </section>
  );
}
