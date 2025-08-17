/*
  Warnings:

  - You are about to drop the column `venue` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "venue",
ALTER COLUMN "about" SET DATA TYPE TEXT;
