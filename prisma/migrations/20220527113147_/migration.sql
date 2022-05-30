/*
  Warnings:

  - You are about to drop the column `img` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `vid` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the `Bio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bio` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'NON_BINARY';

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "img",
DROP COLUMN "vid",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "videos" TEXT[];

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bio" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bio";
