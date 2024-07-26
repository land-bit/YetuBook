/*
  Warnings:

  - Added the required column `dewPoint` to the `next5days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "next5days" ADD COLUMN     "dewPoint" INTEGER NOT NULL;
