import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY_OPENWEATHER = process.env.API_KEY_OPENWEATHER
export default async function getAirPollution(longitude, latitude) {

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPENWEATHER}`;

    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Erreur lors de la requête à l'API Meteo:", error);
            throw error;
        });
}