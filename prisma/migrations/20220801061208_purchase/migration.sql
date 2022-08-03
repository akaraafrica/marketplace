-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('User', 'Single', 'Collection');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS', 'NON_BINARY');

-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemId" INTEGER NOT NULL,
    "bidderId" INTEGER NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT NOT NULL,
    "purchaserId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "collectionTypeId" INTEGER NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "images" TEXT[],
    "videos" TEXT[],

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionRating" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "minContributors" INTEGER NOT NULL,
    "maxContributors" INTEGER NOT NULL,
    "minItems" INTEGER NOT NULL,
    "maxItems" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "CollectionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "collectionId" INTEGER,
    "tokenId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "images" TEXT[],
    "video" TEXT NOT NULL,
    "acceptedBid" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openForBid" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "published" BOOLEAN NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemRating" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "name" TEXT NOT NULL,
    "rating" INTEGER,
    "avatar" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bio" VARCHAR(250) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "raterId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "profileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollower" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFollower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_transactionId_key" ON "Purchase"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_tokenId_key" ON "Collection"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionType_name_key" ON "CollectionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionType_typeId_key" ON "CollectionType"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_tokenId_key" ON "Item"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_collectionTypeId_fkey" FOREIGN KEY ("collectionTypeId") REFERENCES "CollectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionRating" ADD CONSTRAINT "CollectionRating_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionRating" ADD CONSTRAINT "CollectionRating_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRating" ADD CONSTRAINT "ItemRating_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRating" ADD CONSTRAINT "ItemRating_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollower" ADD CONSTRAINT "UserFollower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollower" ADD CONSTRAINT "UserFollower_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
