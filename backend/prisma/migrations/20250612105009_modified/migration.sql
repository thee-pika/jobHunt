/*
  Warnings:

  - You are about to drop the column `comapny` on the `Applications` table. All the data in the column will be lost.
  - Added the required column `company` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applications" DROP COLUMN "comapny",
ADD COLUMN     "company" TEXT NOT NULL;
