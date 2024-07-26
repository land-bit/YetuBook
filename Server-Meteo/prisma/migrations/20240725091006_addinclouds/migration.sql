/*
  Warnings:

  - Changed the type of `clouds` on the `currentweather` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "currentweather" DROP COLUMN "clouds",
ADD COLUMN     "clouds" INTEGER NOT NULL;
