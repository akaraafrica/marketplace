/*
  Warnings:

  - You are about to drop the column `bioId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Bio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Bio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_bioId_fkey";

-- DropIndex
DROP INDEX "Profile_bioId_key";

-- AlterTable
ALTER TABLE "Bio" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bioId";

-- CreateIndex
CREATE UNIQUE INDEX "Bio_profileId_key" ON "Bio"("profileId");

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
