/*
  Warnings:

  - Added the required column `alert` to the `currentweather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currentweather" ADD COLUMN     "alert" TEXT NULL,
ALTER COLUMN "windGust" DROP NOT NULL;
