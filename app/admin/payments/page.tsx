"use client";
import { getPayments, getPaymentsCount } from "@/actions/admin";
import PaymentsList from "@/components/admin/payments/PaymentsList";
import RevealHero from "@/components/animations/RevealHero";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export interface PaymentWithTeamAndParticipant {
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
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentWithTeamAndParticipant[]>([]);
  const [paymentsCount, setPaymentsCount] = useState<number | null>(0);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    getPaymentsCount().then(setPaymentsCount);
  }, []);

  useEffect(() => {
    startLoading(async () => {
      await getPayments({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          team: {
            select: {
              id: true,
              name: true,
              event: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          participant: {
            select: {
              name: true,
              email: true,
              phone: true,
              event: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }).then((result) => {
        const paymentsWithRelations: PaymentWithTeamAndParticipant[] =
          result.map((payment: any) => ({
            ...payment,
            participant: payment.participant ?? null,
            team: payment.team ?? null,
          }));
        setPayments(paymentsWithRelations);
      });
    });
  }, []);

  return (
    <section className="flex w-full flex-col items-center p-2">
      <RevealHero className="font-extrabold text-3xl">
        Payments ( {paymentsCount ? paymentsCount : "Loading..."} )
      </RevealHero>
      <div className="w-full">
        {loading ? (
          <div className="p-10 w-full">
            <LoaderCircleIcon className="animate-spin mx-auto size-16" />
          </div>
        ) : (
          <PaymentsList payments={payments} setPayments={setPayments} />
        )}
      </div>
    </section>
  );
}
