"use client";

import { Profile } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";

export default function UsersList({ users }: { users: Profile[] }) {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

  const expandUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user || null);
  };

  const closeUser = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onExpand={expandUser} />
        ))}
      </div>
      <AnimatePresence>
        {selectedUser && (
          <UserDetailModal user={selectedUser} onClose={closeUser} />
        )}
      </AnimatePresence>
    </>
  );
}
