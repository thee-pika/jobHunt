/*
  Warnings:

  - You are about to drop the column `logo` on the `Company` table. All the data in the column will be lost.
  - Added the required column `logo_public_id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo_url` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logo",
ADD COLUMN     "logo_public_id" TEXT NOT NULL,
ADD COLUMN     "logo_url" TEXT NOT NULL;
