"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type Profile = {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  bio: string | null;
  image: string | null;
  registrationNumber: string | null;
  course: string | null;
  year: string | null;
  graduationYear: string | null;
  dayScholar: boolean | null;
  dateOfBirth: Date | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Profile>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string | null;
      return <div>{phone || "N/A"}</div>;
    },
  },
  {
    accessorKey: "registrationNumber",
    header: "Registration No.",
    cell: ({ row }) => {
      const regNo = row.getValue("registrationNumber") as string | null;
      return <div className="font-mono text-sm">{regNo || "N/A"}</div>;
    },
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => {
      const course = row.getValue("course") as string | null;
      return <div>{course || "N/A"}</div>;
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const year = row.getValue("year") as string | null;
      return <div>{year || "N/A"}</div>;
    },
  },
  {
    accessorKey: "dayScholar",
    header: "Day Scholar",
    cell: ({ row }) => {
      const dayScholar = row.getValue("dayScholar") as boolean | null;
      if (dayScholar === null) return <div>N/A</div>;
      return (
        <Badge variant={dayScholar ? "default" : "secondary"}>
          {dayScholar ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin") as boolean;
      return (
        <Badge variant={isAdmin ? "destructive" : "outline"}>
          {isAdmin ? "Admin" : "User"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const profile = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(profile.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
