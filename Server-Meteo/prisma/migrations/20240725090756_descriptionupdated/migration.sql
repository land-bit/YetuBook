/*
  Warnings:

  - You are about to drop the column `desc` on the `currentweather` table. All the data in the column will be lost.
  - Added the required column `description` to the `currentweather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currentweather" DROP COLUMN "desc",
ADD COLUMN     "description" TEXT NOT NULL;
