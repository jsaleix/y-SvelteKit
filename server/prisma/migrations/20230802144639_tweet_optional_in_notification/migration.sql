-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_tweetId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "tweetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
