/*
  Warnings:

  - The values [BOTH] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `registrationFee` on the `events` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EventType_new" AS ENUM ('INDIVIDUAL', 'TEAM');
ALTER TABLE "public"."events" ALTER COLUMN "eventType" DROP DEFAULT;
ALTER TABLE "public"."events" ALTER COLUMN "eventType" TYPE "public"."EventType_new" USING ("eventType"::text::"public"."EventType_new");
ALTER TYPE "public"."EventType" RENAME TO "EventType_old";
ALTER TYPE "public"."EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
ALTER TABLE "public"."events" ALTER COLUMN "eventType" SET DEFAULT 'TEAM';
COMMIT;

-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "registrationOpen" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "registrationFee" SET DEFAULT 0,
ALTER COLUMN "registrationFee" SET DATA TYPE INTEGER;
