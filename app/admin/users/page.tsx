"use client";

import { getUsers, getUsersCount } from "@/actions/admin";
import UsersList from "@/components/admin/users/UsersList";
import RevealHero from "@/components/animations/RevealHero";
import { Profile } from "@prisma/client";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function UsersPage() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    getUsersCount().then(setUsersCount);
  }, []);

  useEffect(() => {
    startLoading(async () => {
      await getUsers({
        orderBy: { createdAt: "asc" },
      }).then(setUsers);
    });
  }, []);

  return (
    <section className="flex w-full flex-col items-center p-2">
      <RevealHero className="font-extrabold text-3xl">
        Users ( {usersCount ? usersCount : "Loading..."} )
      </RevealHero>
      <div className="w-full">
        {loading ? (
          <div className="p-10 w-full">
            <LoaderCircleIcon className="animate-spin mx-auto size-16" />
          </div>
        ) : (
          <UsersList users={users} />
        )}
      </div>
    </section>
  );
}
