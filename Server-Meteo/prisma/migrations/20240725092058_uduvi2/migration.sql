/*
  Warnings:

  - Added the required column `uvi` to the `currentweather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currentweather" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uvi" INTEGER NOT NULL;
