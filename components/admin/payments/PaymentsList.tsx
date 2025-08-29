"use client";

import {
  Eye,
  Users,
  User,
  FileText,
  XIcon,
  Copy,
  CheckIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sheet";
import Image from "next/image";
import { setPaymentStatus } from "@/actions/payment";
import { AnimatePresence, motion } from "framer-motion";
import { PaymentWithTeamAndParticipant } from "@/app/admin/payments/page";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatTimestamp } from "@/utils/utils";

export default function PaymentsList({
  payments,
  setPayments,
}: {
  payments: PaymentWithTeamAndParticipant[];
  setPayments: React.Dispatch<
    React.SetStateAction<PaymentWithTeamAndParticipant[]>
  >;
}) {
  const [changingStatus, startChangingStatus] = useTransition();
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentWithTeamAndParticipant | null>(null);

  const changePaymentStatus = async (
    paymentId: string,
    status: PaymentWithTeamAndParticipant["status"]
  ) => {
    startChangingStatus(async () => {
      const { errorMessage } = await setPaymentStatus(status, paymentId);
      if (errorMessage) {
        toast.error("Error marking as completed.", {
          description: errorMessage,
        });
      } else {
        toast.success(`Marked as ${status}.`);
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === paymentId ? { ...payment, status } : payment
          )
        );
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="border border-border shadow-lg bg-card rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/20 p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-primary">
                {formatCurrency(payment.amount)}
              </h3>
              <PaymentStatusBadge status={payment.status} />
            </div>

            {/* Transaction ID */}
            <div className="flex flex-row justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Transaction ID:
              </span>
              <div className="flex items-center gap-1 bg-background border-2 border-zinc-500 pl-2 rounded-md w-max overflow-hidden">
                <span className="font-light">
                  {payment.transactionId || "N/A"}
                </span>
                {payment.transactionId && (
                  <div
                    className="p-2 hover:bg-accent border-l-2 border-zinc-500"
                    onClick={() => {
                      navigator.clipboard.writeText(payment.transactionId!);
                      toast.success("Transaction ID copied to clipboard");
                    }}
                  >
                    <Copy className="size-3" />
                  </div>
                )}
              </div>
            </div>

            {/* Paid At */}
            {payment.paidAt && (
              <div className="flex flex-row justify-between items-center gap-2">
                <span className="text-sm text-muted-foreground">Paid At:</span>
                <span className="text-foreground">
                  {formatTimestamp(payment.paidAt)}
                </span>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 p-2">
            {payment.team && <TeamDialog team={payment.team} />}
            {payment.participant && (
              <ParticipantDialog participant={payment.participant} />
            )}
            {payment.imageUrl ? (
              <ImageModal imageUrl={payment.imageUrl} />
            ) : (
              <Button variant="outline" size="sm" disabled>
                No receipt uploaded
              </Button>
            )}
            {payment.status !== "COMPLETED" && (
              <Button
                variant="outline"
                size="sm"
                disabled={changingStatus}
                className="text-green-600 hover:text-green-700 hover:border-green-300 flex-1 sm:flex-none"
                onClick={() => changePaymentStatus(payment.id, "COMPLETED")}
              >
                <CheckIcon className="h-3 w-3 mr-1" />
                Complete
              </Button>
            )}
            {payment.status !== "FAILED" && (
              <Button
                variant="outline"
                size="sm"
                disabled={changingStatus}
                className="text-red-600 hover:text-red-700 hover:border-red-300 flex-1 sm:flex-none"
                onClick={() => changePaymentStatus(payment.id, "FAILED")}
              >
                <XIcon className="h-3 w-3 mr-1" />
                Mark Failed
              </Button>
            )}
            {payment.status !== "UNVERIFIED" && (
              <Button
                variant="outline"
                size="sm"
                disabled={changingStatus}
                className="text-yellow-600 hover:text-yellow-700 hover:border-yellow-300 flex-1 sm:flex-none"
                onClick={() => changePaymentStatus(payment.id, "UNVERIFIED")}
              >
                <XIcon className="h-3 w-3 mr-1" />
                Unverify
              </Button>
            )}

            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setSelectedPayment(payment)}
            >
              <FileText />
              View Full Details
            </Button>
          </div>
        </div>
      ))}

      {selectedPayment && (
        <PaymentDetailsSheet
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const TeamDialog = ({
  team,
}: {
  team: PaymentWithTeamAndParticipant["team"];
}) => {
  if (!team) return <span className="text-muted-foreground">N/A</span>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Team:</span>
          <span className="font-medium">{team.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Information
          </DialogTitle>
          <DialogDescription>
            Details about the team for this payment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Team Name
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">{team.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Team ID
              </label>
              <p className="text-sm font-mono bg-muted p-2 rounded-md">
                {team.id}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Event
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">
                {team.event.name}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Event ID
              </label>
              <p className="text-sm font-mono bg-muted p-2 rounded-md">
                {team.event.id}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ParticipantDialog = ({
  participant,
}: {
  participant: PaymentWithTeamAndParticipant["participant"];
}) => {
  if (!participant) return <span className="text-muted-foreground">N/A</span>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Participant:</span>
          <span className="font-medium">{participant.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Participant Information
          </DialogTitle>
          <DialogDescription>
            Details about the participant for this payment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">
                {participant.name}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">
                {participant.email || "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">
                {participant.phone || "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Event
              </label>
              <p className="text-sm bg-muted p-2 rounded-md">
                {participant.event.name}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Event ID
              </label>
              <p className="text-sm font-mono bg-muted p-2 rounded-md">
                {participant.event.id}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-700 hover:border-blue-300"
      >
        <Eye className="h-3 w-3 mr-1" />
        View Receipt
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/80 backdrop-blur-sm fixed flex w-full h-full top-0 left-0 z-[200] justify-center items-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full bg-card rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2">
                <Image
                  src={imageUrl}
                  alt="Payment receipt"
                  width={800}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PaymentDetailsSheet = ({
  payment,
  onClose,
}: {
  payment: PaymentWithTeamAndParticipant;
  onClose: () => void;
}) => {
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Payment Details
          </SheetTitle>
          <SheetDescription>
            Complete information about this payment transaction
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Payment Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              💰 Payment Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <PaymentStatusBadge status={payment.status} />
              </div>
              {payment.paidAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paid At:</span>
                  <span className="text-sm">
                    {formatTimestamp(payment.paidAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Technical Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              🔧 Technical Information
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Payment ID
                </label>
                <p className="text-sm font-mono bg-muted p-2 rounded break-all">
                  {payment.id}
                </p>
              </div>
              {payment.paymentId && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Internal Payment ID
                  </label>
                  <p className="text-sm font-mono bg-muted p-2 rounded break-all">
                    {payment.paymentId}
                  </p>
                </div>
              )}
              {payment.transactionId && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Transaction ID
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono bg-muted p-2 rounded flex-1 break-all">
                      {payment.transactionId}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(payment.transactionId!);
                        toast.success("Transaction ID copied to clipboard");
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Created At
                </label>
                <p className="text-sm bg-muted p-2 rounded">
                  {payment.createdAt.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Updated At
                </label>
                <p className="text-sm bg-muted p-2 rounded">
                  {payment.updatedAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Related Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              👥 Related Information
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {payment.team && (
                <div className="border border-border p-3 rounded-lg">
                  <h5 className="font-medium mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Team Details
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Name:{" "}
                      </span>
                      <span className="text-sm">{payment.team.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Event:{" "}
                      </span>
                      <span className="text-sm">{payment.team.event.name}</span>
                    </div>
                  </div>
                </div>
              )}
              {payment.participant && (
                <div className="border border-border p-3 rounded-lg">
                  <h5 className="font-medium mb-2 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Participant Details
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Name:{" "}
                      </span>
                      <span className="text-sm">
                        {payment.participant.name}
                      </span>
                    </div>
                    {payment.participant.email && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Email:{" "}
                        </span>
                        <span className="text-sm">
                          {payment.participant.email}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Event:{" "}
                      </span>
                      <span className="text-sm">
                        {payment.participant.event.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Receipt Section */}
          {payment.imageUrl && (
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                📄 Receipt
              </h4>
              <div className="border border-border p-3 rounded-lg">
                <ImageModal imageUrl={payment.imageUrl} />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const PaymentStatusBadge = ({
  status,
}: {
  status: PaymentWithTeamAndParticipant["status"];
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return {
          variant: "default" as const,
          className:
            "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
          label: "Completed",
        };
      case "UNVERIFIED":
        return {
          variant: "default" as const,
          className:
            "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
          label: "Unverified",
        };
      case "FAILED":
        return {
          variant: "default" as const,
          className:
            "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
          label: "Failed",
        };
      default:
        return {
          variant: "secondary" as const,
          className:
            "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} font-medium`}
    >
      {config.label}
    </Badge>
  );
};
