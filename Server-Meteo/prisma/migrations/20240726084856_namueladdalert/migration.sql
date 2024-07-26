/*
  Warnings:

  - Made the column `alert` on table `currentweather` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "currentweather" ALTER COLUMN "alert" SET NOT NULL;
