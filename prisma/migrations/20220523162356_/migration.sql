-- AlterTable
CREATE SEQUENCE "bio_id_seq";
ALTER TABLE "Bio" ALTER COLUMN "id" SET DEFAULT nextval('bio_id_seq');
ALTER SEQUENCE "bio_id_seq" OWNED BY "Bio"."id";
