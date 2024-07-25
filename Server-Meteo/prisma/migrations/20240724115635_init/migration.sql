-- CreateTable
CREATE TABLE "localisation" (
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,

    CONSTRAINT "localisation_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "currentweather" (
    "date" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "rain" DOUBLE PRECISION,
    "snow" DOUBLE PRECISION,
    "pressure" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "clouds" TEXT NOT NULL,
    "visibility" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" INTEGER NOT NULL,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "windChill" TEXT NOT NULL,
    "feelsLike" INTEGER NOT NULL,
    "dewPoint" INTEGER NOT NULL,
    "weatherType" TEXT,
    "weatherIcon" TEXT,

    CONSTRAINT "currentweather_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "currenthour" (
    "date" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "description" TEXT,
    "weatherType" TEXT,
    "weatherIcon" TEXT,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" INTEGER NOT NULL,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "rain" DOUBLE PRECISION,
    "snow" DOUBLE PRECISION,
    "pressure" INTEGER NOT NULL,
    "pop" INTEGER,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "currenthour_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "byhour" (
    "date" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "description" TEXT,
    "weatherType" TEXT,
    "weatherIcon" TEXT,
    "partOfTheDay" TEXT NOT NULL,
    "periodOfTheDay" TEXT NOT NULL,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" INTEGER NOT NULL,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "windChill" INTEGER NOT NULL,
    "rain" DOUBLE PRECISION,
    "snow" DOUBLE PRECISION,
    "pressure" INTEGER NOT NULL,
    "pop" INTEGER,
    "dewPoint" INTEGER NOT NULL,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "uvi" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "byhour_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "next5days" (
    "date" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "description" TEXT,
    "weatherType" TEXT,
    "weatherIcon" TEXT,
    "partOfTheDay" TEXT NOT NULL,
    "periodOfTheDay" TEXT NOT NULL,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" INTEGER NOT NULL,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "windChill" INTEGER NOT NULL,
    "rain" DOUBLE PRECISION,
    "snow" DOUBLE PRECISION,
    "pressure" INTEGER NOT NULL,
    "pop" INTEGER,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "uvi" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "next5days_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "airpollution" (
    "date" TEXT NOT NULL,
    "pm25" DOUBLE PRECISION,
    "pm10" DOUBLE PRECISION,
    "o3" DOUBLE PRECISION,
    "no2" DOUBLE PRECISION,
    "so2" DOUBLE PRECISION,
    "co" DOUBLE PRECISION,
    "aqi" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airpollution_pkey" PRIMARY KEY ("date")
);

-- CreateIndex
CREATE UNIQUE INDEX "currentweather_dt_key" ON "currentweather"("dt");

-- CreateIndex
CREATE UNIQUE INDEX "currenthour_dt_key" ON "currenthour"("dt");

-- CreateIndex
CREATE UNIQUE INDEX "byhour_dt_key" ON "byhour"("dt");

-- CreateIndex
CREATE UNIQUE INDEX "next5days_dt_key" ON "next5days"("dt");
