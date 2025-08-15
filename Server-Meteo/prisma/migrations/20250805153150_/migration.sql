-- CreateTable
CREATE TABLE "localisation" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "timezone" INTEGER,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,

    CONSTRAINT "localisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currentweather" (
    "id" SERIAL NOT NULL,
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
    "description" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" DOUBLE PRECISION,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "windChill" INTEGER NOT NULL,
    "feelsLike" INTEGER NOT NULL,
    "dewPoint" INTEGER NOT NULL,
    "weatherType" TEXT,
    "weatherIcon" TEXT,
    "uvi" INTEGER NOT NULL,
    "alert" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "currentweather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currenthour" (
    "id" SERIAL NOT NULL,
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
    "windGust" DOUBLE PRECISION,
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

    CONSTRAINT "currenthour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "byhour" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shortdate" TEXT NOT NULL,
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
    "grndLevel" INTEGER NOT NULL,
    "seaLevel" INTEGER NOT NULL,
    "feelsLike" INTEGER NOT NULL,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "Kalmanfilter" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" DOUBLE PRECISION,
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

    CONSTRAINT "byhour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next5days" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shortdate" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "description" TEXT,
    "weatherType" TEXT,
    "weatherIcon" TEXT,
    "partOfTheDay" TEXT NOT NULL,
    "periodOfTheDay" TEXT NOT NULL,
    "grndLevel" INTEGER NOT NULL,
    "seaLevel" INTEGER NOT NULL,
    "feelsLike" INTEGER NOT NULL,
    "clouds" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tempMin" INTEGER NOT NULL,
    "tempMax" INTEGER NOT NULL,
    "Kalmanfilter" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "windGust" DOUBLE PRECISION,
    "windDeg" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "windChill" INTEGER NOT NULL,
    "rain" DOUBLE PRECISION,
    "snow" DOUBLE PRECISION,
    "pressure" INTEGER NOT NULL,
    "pop" INTEGER,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "dewPoint" INTEGER NOT NULL,
    "uvi" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "next5days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airpollution" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "dt" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "aqi" INTEGER,
    "pm25" DOUBLE PRECISION,
    "pm10" DOUBLE PRECISION,
    "o3" DOUBLE PRECISION,
    "no2" DOUBLE PRECISION,
    "so2" DOUBLE PRECISION,
    "co" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airpollution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "authorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_authorId_postId_key" ON "Like"("authorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
