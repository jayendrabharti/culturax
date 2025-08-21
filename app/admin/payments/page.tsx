import { columns } from "@/components/admin/payments/columns";
import { DataTable } from "@/components/admin/payments/data-table";
import RevealHero from "@/components/animations/RevealHero";
import prisma from "@/prisma/client";

export default async function PaymentsPage() {
  const payments = await prisma.payments.findMany({
    orderBy: {
      createdAt: "desc",
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
  });

  return (
    <section className="flex w-full flex-col items-center p-2">
      <RevealHero className="font-extrabold text-3xl">
        Payments Management
      </RevealHero>
      <div className="w-full">
        <DataTable columns={columns} data={payments} />
      </div>
    </section>
  );
}
