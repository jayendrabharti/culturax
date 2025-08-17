/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `prizes` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "contactInfo",
DROP COLUMN "content",
DROP COLUMN "prizes",
DROP COLUMN "rules",
ADD COLUMN     "about" JSONB;
