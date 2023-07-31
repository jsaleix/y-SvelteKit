/*
  Warnings:

  - You are about to drop the column `followingId` on the `Following` table. All the data in the column will be lost.
  - Added the required column `followedId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_followingId_fkey";

-- AlterTable
ALTER TABLE "Following" DROP COLUMN "followingId",
ADD COLUMN     "followedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
