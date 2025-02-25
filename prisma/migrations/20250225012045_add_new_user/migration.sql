/*
  Warnings:

  - Added the required column `userId` to the `Pallette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pallette" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pallette" ADD CONSTRAINT "Pallette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
