"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  Copy,
  Check,
  X,
  Users,
  User,
  FileText,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { setPaymentStatus } from "@/actions/payment";
import { formatTimestamp } from "@/utils/utils";
import { toast } from "sonner";

export type Payment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  teamId: string | null;
  status: "UNVERIFIED" | "COMPLETED" | "FAILED";
  amount: number;
  paymentId: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  imageUrl: string | null;
  paidAt: Date | null;
  participantId: string | null;
  participant: {
    name: string;
    email: string | null;
    phone: string | null;
    event: {
      name: string;
      id: string;
    };
  } | null;
  team: {
    name: string;
    id: string;
    event: {
      name: string;
      id: string;
    };
  } | null;
};

// Placeholder functions for status updates
const markAsCompleted = async (paymentId: string) => {
  await setPaymentStatus("COMPLETED", paymentId);
  console.log("Mark as completed:", paymentId);
};

const markAsFailed = async (paymentId: string) => {
  await setPaymentStatus("FAILED", paymentId);
};

const markAsUnverified = async (paymentId: string) => {
  await setPaymentStatus("UNVERIFIED", paymentId);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const TeamDialog = ({ team }: { team: Payment["team"] }) => {
  if (!team) return <span className="text-muted-foreground">N/A</span>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-1" />
          Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Information</DialogTitle>
          <DialogDescription>
            Details about the team for this payment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Team Name:</label>
            <p className="text-sm text-muted-foreground">{team.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Team ID:</label>
            <p className="text-sm text-muted-foreground font-mono">{team.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Event:</label>
            <p className="text-sm text-muted-foreground">{team.event.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Event ID:</label>
            <p className="text-sm text-muted-foreground font-mono">
              {team.event.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ParticipantDialog = ({
  participant,
}: {
  participant: Payment["participant"];
}) => {
  if (!participant) return <span className="text-muted-foreground">N/A</span>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-1" />
          Participant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Participant Information</DialogTitle>
          <DialogDescription>
            Details about the participant for this payment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name:</label>
            <p className="text-sm text-muted-foreground">{participant.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email:</label>
            <p className="text-sm text-muted-foreground">
              {participant.email || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Phone:</label>
            <p className="text-sm text-muted-foreground">
              {participant.phone || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Event:</label>
            <p className="text-sm text-muted-foreground">
              {participant.event.name}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Event ID:</label>
            <p className="text-sm text-muted-foreground font-mono">
              {participant.event.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Eye className="h-3 w-3 mr-1" />
        View
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕
            </button>
            <Image
              src={imageUrl}
              alt="Payment Receipt"
              className="max-w-full max-h-full object-contain rounded-lg"
              width={800}
              height={600}
            />
          </div>
        </div>
      )}
    </>
  );
};

const PaymentDetailsSheet = ({ payment }: { payment: Payment }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Payment Details</SheetTitle>
          <SheetDescription>
            Complete information about this payment
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Basic Information</h4>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm font-medium">Payment ID:</label>
                <p className="text-sm text-muted-foreground font-mono">
                  {payment.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Internal Payment ID:
                </label>
                <p className="text-sm text-muted-foreground font-mono">
                  {payment.paymentId || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Created At:</label>
                <p className="text-sm text-muted-foreground">
                  {payment.createdAt.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Updated At:</label>
                <p className="text-sm text-muted-foreground">
                  {payment.updatedAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Related Information</h4>
            <div className="grid grid-cols-1 gap-3">
              {payment.team && (
                <>
                  <div>
                    <label className="text-sm font-medium">Team:</label>
                    <p className="text-sm text-muted-foreground">
                      {payment.team.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Team Event:</label>
                    <p className="text-sm text-muted-foreground">
                      {payment.team.event.name}
                    </p>
                  </div>
                </>
              )}
              {payment.participant && (
                <>
                  <div>
                    <label className="text-sm font-medium">Participant:</label>
                    <p className="text-sm text-muted-foreground">
                      {payment.participant.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Participant Event:
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {payment.participant.event.name}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return <div className="font-medium">{formatCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Payment["status"];

      switch (status) {
        case "COMPLETED":
          return (
            <Badge variant={"default"} className={`bg-green-500`}>
              {status}
            </Badge>
          );
        case "UNVERIFIED":
          return (
            <Badge variant={"default"} className={`bg-yellow-500`}>
              {status}
            </Badge>
          );
        case "FAILED":
          return (
            <Badge variant={"default"} className={`bg-red-500`}>
              {status}
            </Badge>
          );
        default:
          return <Badge variant={"default"}>{status}</Badge>;
      }
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as string | null;
      return <div>{method || "N/A"}</div>;
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const txnId = row.getValue("transactionId") as string | null;
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs">{txnId || "N/A"}</span>
          {txnId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(txnId);
                toast.success("Transaction ID copied to clipboard");
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      );
    },
  },
  {
    id: "team",
    header: "Team",
    cell: ({ row }) => {
      const payment = row.original;
      return <TeamDialog team={payment.team} />;
    },
  },
  {
    id: "participant",
    header: "Participant",
    cell: ({ row }) => {
      const payment = row.original;
      return <ParticipantDialog participant={payment.participant} />;
    },
  },
  {
    id: "statusActions",
    header: "Status Actions ( Mark as )",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex gap-1">
          {payment.status !== "UNVERIFIED" && (
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700"
              onClick={() => markAsCompleted(payment.id)}
            >
              <Check className="h-3 w-3 mr-1" />
              Complete
            </Button>
          )}
          {payment.status !== "FAILED" && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => markAsFailed(payment.id)}
            >
              <X className="h-3 w-3 mr-1" />
              Failed
            </Button>
          )}
          {payment.status !== "FAILED" && (
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-600 hover:text-yellow-700"
              onClick={() => markAsUnverified(payment.id)}
            >
              <X className="h-3 w-3 mr-1" />
              Unverified
            </Button>
          )}
        </div>
      );
    },
  },
  {
    id: "viewReceipt",
    header: "Receipt",
    cell: ({ row }) => {
      const payment = row.original;

      if (!payment.imageUrl) {
        return <span className="text-muted-foreground text-sm">N/A</span>;
      }

      return <ImageModal imageUrl={payment.imageUrl} />;
    },
  },
  {
    accessorKey: "paidAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paid At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paidAt = row.getValue("paidAt") as Date | null;
      return (
        <div className="text-sm">
          {paidAt ? formatTimestamp(paidAt) : "N/A"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return <PaymentDetailsSheet payment={payment} />;
    },
  },
];
