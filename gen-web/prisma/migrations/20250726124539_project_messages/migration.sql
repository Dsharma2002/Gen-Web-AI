/*
  Warnings:

  - You are about to drop the column `messageID` on the `Fragment` table. All the data in the column will be lost.
  - You are about to drop the column `projectID` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId]` on the table `Fragment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `Fragment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fragment" DROP CONSTRAINT "Fragment_messageID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_projectID_fkey";

-- DropIndex
DROP INDEX "Fragment_messageID_key";

-- AlterTable
ALTER TABLE "Fragment" DROP COLUMN "messageID",
ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "projectID",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fragment_messageId_key" ON "Fragment"("messageId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fragment" ADD CONSTRAINT "Fragment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
