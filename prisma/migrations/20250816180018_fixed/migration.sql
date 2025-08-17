/*
  Warnings:

  - The `about` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "about",
ADD COLUMN     "about" JSONB;
