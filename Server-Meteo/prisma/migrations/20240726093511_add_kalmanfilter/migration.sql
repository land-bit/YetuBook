/*
  Warnings:

  - Added the required column `Kalmanfilter` to the `byhour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Kalmanfilter` to the `next5days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `next5days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "byhour" ADD COLUMN     "Kalmanfilter" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "next5days" ADD COLUMN     "Kalmanfilter" INTEGER NOT NULL,
ADD COLUMN     "day" TEXT NOT NULL;
