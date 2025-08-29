"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Shield, Maximize2, MailIcon, PhoneIcon } from "lucide-react";
import { Profile } from "@prisma/client";

interface UserCardProps {
  user: Profile;
  onExpand: (userId: string) => void;
}

export default function UserCard({ user, onExpand }: UserCardProps) {
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

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.02, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onExpand(user.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative h-full transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <Avatar className="size-12">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="text-sm">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="truncate text-base">
                  {user.name || "No name"}
                </CardTitle>
                {user.isAdmin && (
                  <Badge variant="destructive" className="text-xs">
                    <Shield className="mr-1 size-3" />
                    Admin
                  </Badge>
                )}
              </div>
              <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
                <MailIcon className="size-4" />
                {user.email}
              </div>

              <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
                <PhoneIcon className="size-4" />
                {user.phone ?? "N/A"}
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="text-center">
            <Maximize2 className="mx-auto mb-2 size-8" />
            <p className="text-sm font-medium">View Details</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
