-- CreateTable
CREATE TABLE "Item" (
    "owner" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "images" TEXT[],
    "video" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CollectionType" (
    "name" TEXT NOT NULL,
    "minOwners" INTEGER NOT NULL,
    "maxOwners" INTEGER NOT NULL,
    "minItems" INTEGER NOT NULL,
    "maxItems" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bio" (
    "id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "bioId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_tokenId_key" ON "Item"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionType_name_key" ON "CollectionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionType_typeId_key" ON "CollectionType"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_id_key" ON "Bio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_address_key" ON "Bio"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_email_key" ON "Bio"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_bioId_key" ON "Profile"("bioId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "Bio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
