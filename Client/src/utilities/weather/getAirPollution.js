import axios from "axios";
import getUserLocation from "./getUserLocation";
const API_KEY_OPENWEATHER = import.meta.env.VITE_API_KEY_OPENAI
export default async function getAirPollution() {

    return getUserLocation()
        .then( async position => {
            const { latitude, longitude } = position.coords;

            const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPENWEATHER}`;
            
            return axios.get(url)
                .then(response => {
                    return response.data;
                })
            .catch (error => {
                console.error("Erreur lors de la requête à l'API Meteo:", error);
                throw error;
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de la géolocalisation:", error);
            throw error;
        });
}