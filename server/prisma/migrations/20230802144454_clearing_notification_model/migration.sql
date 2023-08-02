/*
  Warnings:

  - You are about to drop the column `accountId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `toNotifyId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `tweetId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'RETWEET';

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "accountId",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "toNotifyId" TEXT NOT NULL,
ALTER COLUMN "tweetId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toNotifyId_fkey" FOREIGN KEY ("toNotifyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
