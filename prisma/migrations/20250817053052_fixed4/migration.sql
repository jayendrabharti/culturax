/*
  Warnings:

  - You are about to drop the column `gallery` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `totalFee` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the `announcements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `winners` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."announcements" DROP CONSTRAINT "announcements_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."participants" DROP CONSTRAINT "participants_teamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."winners" DROP CONSTRAINT "winners_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."winners" DROP CONSTRAINT "winners_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "gallery";

-- AlterTable
ALTER TABLE "public"."participants" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "registrationFee" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "teamId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."teams" DROP COLUMN "paidAt",
DROP COLUMN "paymentId",
DROP COLUMN "paymentMethod",
DROP COLUMN "totalFee",
ADD COLUMN     "registrationFee" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."announcements";

-- DropTable
DROP TABLE "public"."winners";

-- DropEnum
DROP TYPE "public"."AnnouncementType";

-- CreateTable
CREATE TABLE "public"."Payments" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT,
    "paymentMethod" TEXT,
    "paidAt" TIMESTAMP(3),
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "teamId" TEXT,
    "participantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."participants" ADD CONSTRAINT "participants_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
