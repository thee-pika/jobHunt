/*
  Warnings:

  - Added the required column `comapny` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Accepted', 'Rejected', 'Pending');

-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "comapny" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "jobRole" TEXT;
