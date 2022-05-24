/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Bio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bio_profileId_key" ON "Bio"("profileId");
