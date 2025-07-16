/*
  Warnings:

  - Added the required column `contact` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "contact" INTEGER NOT NULL;
