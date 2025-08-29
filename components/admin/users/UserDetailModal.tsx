"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, MailIcon, PhoneIcon } from "lucide-react";
import { Profile } from "@prisma/client";
import { formatTimestamp } from "@/utils/utils";

interface UserDetailModalProps {
  user: Profile;
  onClose: () => void;
}

export default function UserDetailModal({
  user,
  onClose,
}: UserDetailModalProps) {
  if (!user) return null;

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const userDetails = [
    { title: "Registration No.", value: user.registrationNumber ?? "N/A" },
    { title: "Course", value: user.course ?? "N/A" },
    { title: "Year", value: user.year ?? "N/A" },
    { title: "Graduation Year", value: user.graduationYear ?? "N/A" },
    {
      title: "Day Scholar / Hosteller",
      value: user.dayScholar ? "Day Scholar" : "Hosteller",
    },
    {
      title: "Date of Birth",
      value: user.dateOfBirth ? formatTimestamp(user.dateOfBirth, 2) : "N/A",
    },
    { title: "Joined At", value: formatTimestamp(user.createdAt) },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="bg-background overflow-hidden rounded-3xl backdrop-blur-sm">
          <CardContent>
            {/* Header Section */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start space-x-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Avatar className="size-20">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="text-lg">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="min-w-0 flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="truncate text-2xl font-bold">
                        {user.name || "No name"}
                      </h3>
                      {user.isAdmin && (
                        <Badge variant="destructive">
                          <Shield className="mr-1 size-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-row gap-2 items-center text-sm">
                      <MailIcon className="size-4" />
                      {user.email}
                    </div>
                    <div className="flex flex-row gap-2 items-center text-sm">
                      <PhoneIcon className="size-4" />
                      {user.phone ?? "N/A"}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <Separator className="my-2" />

            {userDetails.map((item, index) => (
              <div
                className="flex flex-row w-full justify-between items-center"
                key={index}
              >
                <span className="text-muted-foreground">{item.title}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}

            <Separator className="my-2" />

            <span className="font-bold text-2xl">About ( Bio )</span>
            <p>{user.bio ?? "No bio available"}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
