import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import localisationRoute from "./routes/localisation.route.js";
import currentWeatherRoute from "./routes/currentWeather.route.js";
import currentHourRoute from "./routes/currentHour.route.js";
import byHourRoute from "./routes/byHour.route.js";
import next5daysRoute from "./routes/next5days.route.js";
import airPollutionRoute from "./routes/airPollution.route.js";
import post from "./routes/posts.js";
import profileRoutes from "./routes/profile.js";
import friendsRoutes from "./routes/friends.js";

dotenv.config();
const port = process.env.PORT || 5000;

// Vérificationd de la connectivité à la base de donnée
import pkg from "pg";
import allWeatherDataRouter from "./routes/allWeatherData.routes.js";
const { Client } = pkg; // Assurez-vous d'avoir pg installé

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack))
  .finally(() => client.end());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yetubook",
      version: "0.0.1",
      description:
        "Un reseau social qui aide les etudiants à se rencontrer et à partager leurs expériences.",
      contact: {
        name: "Landry Bitege",
        url: "https://yetubook.com",
        email: "letu@gmail.com",
      },
    },
  },
  apis: ["./routes/*.js"],
};

const app = express();
app.use(cors());
app.use(express.json());

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/", allWeatherDataRouter);
app.use("/", localisationRoute);
app.use("/", currentWeatherRoute);
app.use("/", currentHourRoute);
app.use("/", byHourRoute);
app.use("/", next5daysRoute);
app.use("/", airPollutionRoute);
app.use("/api/posts", post);
app.use("/api/profile", profileRoutes);
app.use("/api/friends", friendsRoutes);

// app.use('/', (req, res)=>{
//     res.send('Welcome to Yetubook MétéoChat API. Allez ici https://yetubook/api-docs pour voir la documentation');
// })

app.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
