import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY_OPENWEATHER = process.env.API_KEY_OPENWEATHER
export default async function getCurrentWeather(longitude, latitude) {

    const units = 'metric'
    const lang = 'fr'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPENWEATHER}&lang=${lang}&units=${units}`;

    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Erreur lors de la requête à l'API Meteo:", error);
            throw error;
        });

}