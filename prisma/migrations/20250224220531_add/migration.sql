/*
  Warnings:

  - Added the required column `profesion` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileDescription` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "profesion" TEXT NOT NULL,
ADD COLUMN     "profileDescription" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
