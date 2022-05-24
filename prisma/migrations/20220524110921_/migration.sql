/*
  Warnings:

  - You are about to drop the `Bio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bio" DROP CONSTRAINT "Bio_profileId_fkey";

-- AlterTable
CREATE SEQUENCE "profile_id_seq";
ALTER TABLE "Profile" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('profile_id_seq');
ALTER SEQUENCE "profile_id_seq" OWNED BY "Profile"."id";

-- DropTable
DROP TABLE "Bio";

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
