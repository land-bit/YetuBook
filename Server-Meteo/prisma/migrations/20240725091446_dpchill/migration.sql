/*
  Warnings:

  - Added the required column `windChill` to the `currenthour` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `windChill` on the `currentweather` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "currenthour" ADD COLUMN     "windChill" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "currentweather" DROP COLUMN "windChill",
ADD COLUMN     "windChill" INTEGER NOT NULL;
