/*
  Warnings:

  - You are about to drop the column `logo` on the `JobPosting` table. All the data in the column will be lost.
  - You are about to drop the column `posted` on the `JobPosting` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'Internship';

-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "logo",
DROP COLUMN "posted",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "skills" SET NOT NULL,
ALTER COLUMN "skills" SET DATA TYPE TEXT;
