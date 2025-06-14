/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
DROP COLUMN "username",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'User';
