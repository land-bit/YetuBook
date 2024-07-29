/*
  Warnings:

  - Added the required column `shortdate` to the `byhour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortdate` to the `next5days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "byhour" ADD COLUMN     "shortdate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "next5days" ADD COLUMN     "shortdate" TEXT NOT NULL;
