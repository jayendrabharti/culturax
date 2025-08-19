import { columns } from "@/components/admin/users/columns";
import { DataTable } from "@/components/admin/users/data-table";
import RevealHero from "@/components/animations/RevealHero";
import prisma from "@/prisma/client";

export default async function UsersPage() {
  const profiles = await prisma.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="flex w-full flex-col items-center p-2">
      <RevealHero className="font-extrabold text-3xl">
        Users Management
      </RevealHero>
      <div className="w-full">
        <DataTable columns={columns} data={profiles} />
      </div>
    </section>
  );
}
