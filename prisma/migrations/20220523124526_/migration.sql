/*
  Warnings:

  - Added the required column `bioId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bio_profileId_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bioId" INTEGER NOT NULL;
