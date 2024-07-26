/*
  Warnings:

  - The primary key for the `airpollution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `byhour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `currenthour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `currentweather` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `localisation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `next5days` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "byhour_dt_key";

-- DropIndex
DROP INDEX "currenthour_dt_key";

-- DropIndex
DROP INDEX "currentweather_dt_key";

-- DropIndex
DROP INDEX "next5days_dt_key";

-- AlterTable
ALTER TABLE "airpollution" DROP CONSTRAINT "airpollution_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "airpollution_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "byhour" DROP CONSTRAINT "byhour_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "byhour_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "currenthour" DROP CONSTRAINT "currenthour_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "currenthour_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "currentweather" DROP CONSTRAINT "currentweather_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "currentweather_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "localisation" DROP CONSTRAINT "localisation_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "localisation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "next5days" DROP CONSTRAINT "next5days_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "next5days_pkey" PRIMARY KEY ("id");
