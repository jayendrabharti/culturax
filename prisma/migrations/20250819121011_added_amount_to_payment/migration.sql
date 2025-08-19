/*
  Warnings:

  - Added the required column `amount` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payments" DROP CONSTRAINT "Payments_participantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payments" DROP CONSTRAINT "Payments_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."Payments" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
