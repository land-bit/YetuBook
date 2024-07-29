import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import localisationRoute from "./routes/localisation.route.js";
import currentWeatherRoute from "./routes/currentWeather.route.js";
import currentHourRoute from "./routes/currentHour.route.js";
import byHourRoute from "./routes/byHour.route.js";
import next5daysRoute from "./routes/next5days.route.js";
import airPollutionRoute from "./routes/airPollution.route.js";
import getGoodFormatWeatherData from "./utilities/weather/getGoodFormatWeatherData.js";
import { db } from "./dbconnection/db.js";


dotenv.config();
const port = process.env.PORT || 5000;

// Vérificationd de la connectivité à la base de donnée
import pkg from 'pg';
import allWeatherDataRouter from "./routes/allWeatherData.routes.js";
const { Client } = pkg; // Assurez-vous d'avoir pg installé

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack))
    .finally(() => client.end());


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Yetubook MétéoChat",
            version: '1.0.0',
            description: "Découvrez l'API intégrée à l'application Yetubook MétéoWatch, qui vous offre un accès complet aux données météorologiques historiques de l'OpenWeather API. Grâce à cette API, vous pouvez consulter les Données Actuelles, les Prévisions Heure par Heure et les Prévisions étendues pour les 5 prochains jours, le tout dans des formats clairs et adaptés. En outre, MétéoWatch enrichit votre expérience en fournissant des informations essentielles sur la qualité de l'air, le calcul de l'indice UV, ainsi que des indications sur le point de rosée et la direction du vent, déterminée selon les points cardinaux. Restez informé grâce à des alertes météorologiques et des bulletins détaillés, afin de prendre les meilleures décisions au quotidien. Utilisez notre andpoint en fournissant les coordonnées ex http://localhost:5000/yetubook/meteodata?longitude=29.2205&latitude=-1.6585 pour optenir les données actuelles, les prévisions et données de la pollution. Pour obtenir les données historique vous devez entre la date à cette endpoint comme par exmple : http://localhost:5000/yetubook/meteodata/history?date=26-Juillet-2024"
        }
    },
    apis: ['./routes/*.js']
};

const app = express();
app.use(cors());
app.use(express.json());

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', (req, res)=>{
    res.send('Welcome to Yetubook MétéoChat API');
})
app.use('/', allWeatherDataRouter);

// app.use('/', localisationRoute);
app.use('/', currentWeatherRoute);
app.use('/', currentHourRoute);
app.use('/', byHourRoute);
app.use('/', next5daysRoute);
app.use('/', airPollutionRoute);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});