/*
  Warnings:

  - Added the required column `dt` to the `airpollution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `airpollution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "airpollution" ADD COLUMN     "dt" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
