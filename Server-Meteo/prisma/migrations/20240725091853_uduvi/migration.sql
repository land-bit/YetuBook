/*
  Warnings:

  - Added the required column `uvi` to the `currenthour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currenthour" ADD COLUMN     "uvi" INTEGER NOT NULL;
