/*
  Warnings:

  - Added the required column `sizes` to the `Pallette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pallette" ADD COLUMN     "sizes" JSONB NOT NULL;
