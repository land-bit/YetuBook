/*
  Warnings:

  - Added the required column `feelsLike` to the `byhour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grndLevel` to the `byhour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seaLevel` to the `byhour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feelsLike` to the `next5days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grndLevel` to the `next5days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seaLevel` to the `next5days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "byhour" ADD COLUMN     "feelsLike" INTEGER NOT NULL,
ADD COLUMN     "grndLevel" INTEGER NOT NULL,
ADD COLUMN     "seaLevel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "next5days" ADD COLUMN     "feelsLike" INTEGER NOT NULL,
ADD COLUMN     "grndLevel" INTEGER NOT NULL,
ADD COLUMN     "seaLevel" INTEGER NOT NULL;
