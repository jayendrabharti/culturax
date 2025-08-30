import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/prisma/client";
import {
  CalendarIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [
    profileCount,
    eventCount,
    teamCount,
    totalParticipantCount,
    individualParticipantCount,
    moneyCollected,
    paymentCount,
  ] = await prisma.$transaction([
    prisma.profile.count(),
    prisma.event.count(),
    prisma.team.count(),
    prisma.participant.count(),
    prisma.participant.count({
      where: {
        teamId: null,
      },
    }),
    prisma.payments.aggregate({
      _sum: {
        amount: true,
      },
    }),
    prisma.payments.count(),
  ]);

  const overviewData: {
    title: string;
    value: number | string;
    icon: ReactNode;
    link?: string;
    linkLabel?: string;
  }[] = [
    {
      title: "Users",
      value: profileCount,
      icon: <UserIcon />,
      link: "/admin/users",
      linkLabel: "View all users",
    },
    {
      title: "Events",
      value: eventCount,
      icon: <CalendarIcon />,
      link: "/admin/events",
      linkLabel: "View all events",
    },
    {
      title: "Teams",
      value: teamCount,
      icon: <UserIcon />,
    },
    {
      title: "Individual Participants",
      value: individualParticipantCount,
      icon: <UserIcon />,
    },
    {
      title: "Total Participants",
      value: totalParticipantCount,
      icon: <UserIcon />,
    },
    {
      title: "Money Collected",
      value: `₹${moneyCollected?._sum?.amount ?? 0}`,
      icon: <DollarSignIcon />,
      link: "/admin/payments",
      linkLabel: "View all payments",
    },
    {
      title: "Payments",
      value: `${paymentCount} / ${teamCount + individualParticipantCount}`,
      icon: <DollarSignIcon />,
      link: "/admin/payments",
      linkLabel: "View all payments",
    },
  ];

  return (
    <section className="flex w-full flex-col p-4 items-center">
      <h1 className="font-extrabold text-3xl">Admin Dashboard</h1>
      <p className="font-extralight">Manage your application settings</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center gap-3">
              <div className="flex flex-row w-full items-center justify-between">
                <span className="text-lg">{item.title}</span>
                {item.icon}
              </div>
              <div className="flex flex-row w-full items-baseline justify-between">
                <span className="font-bold text-3xl">{item.value}</span>
                {item.link && item.linkLabel && (
                  <Link href={item.link}>
                    <Button variant={"link"}>
                      {item.linkLabel} <ExternalLinkIcon />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
