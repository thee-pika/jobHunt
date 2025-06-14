/*
  Warnings:

  - Added the required column `logo_url` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "logo_url" TEXT NOT NULL;
