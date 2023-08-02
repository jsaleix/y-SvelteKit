-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE');

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "media" TEXT,
ADD COLUMN     "mediaType" "MediaType",
ADD COLUMN     "retweetOf" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_retweetOf_fkey" FOREIGN KEY ("retweetOf") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
