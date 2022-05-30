/*
  Warnings:

  - Added the required column `acceptedBid` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openForBid` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('User', 'Single', 'Collection');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "acceptedBid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "openForBid" BOOLEAN NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bidId" TEXT;

-- CreateTable
CREATE TABLE "Bid" (
    "bidId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("bidId")
);

-- CreateTable
CREATE TABLE "Bio" (
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT E'MALE',
    "username" TEXT NOT NULL,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Collection" (
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "collectiontypeId" TEXT NOT NULL,
    "items" TEXT[],
    "img" TEXT[],
    "vid" TEXT[],
    "description" TEXT NOT NULL,
    "owners" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upated" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "Rating" (
    "entityId" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL DEFAULT E'User',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("entityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_userId_key" ON "Collection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_collectiontypeId_key" ON "Collection"("collectiontypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_key" ON "Rating"("userId");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Item"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid"("bidId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_collectiontypeId_fkey" FOREIGN KEY ("collectiontypeId") REFERENCES "CollectionType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
