/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `creatorEmail` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_creatorId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "creatorId",
ADD COLUMN     "creatorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorEmail_fkey" FOREIGN KEY ("creatorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
