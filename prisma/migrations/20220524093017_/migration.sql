-- AlterTable
ALTER TABLE "Bio" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "bio_id_seq";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Profile_id_seq";
