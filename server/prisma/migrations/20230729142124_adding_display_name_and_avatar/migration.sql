-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '/assets/default-pp.jpg',
ADD COLUMN     "displayName" TEXT;
