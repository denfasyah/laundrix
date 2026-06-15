-- CreateEnum
CREATE TYPE "machine_report_status" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_fkey";

-- AlterTable
ALTER TABLE "machine_reports" ADD COLUMN     "status" "machine_report_status" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "deleted_at" TIMESTAMPTZ,
ADD COLUMN     "deleted_by" UUID;
