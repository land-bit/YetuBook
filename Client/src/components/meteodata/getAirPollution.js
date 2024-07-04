import axios from "axios";
const API_KEY_OPENWEATHER = import.meta.env.VITE_API_KEY_OPENAI
axios
export default async function getAirPollution(long, lat){
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${API_KEY_OPENWEATHER}`;
    try {
        const response = await axios.get(url);
        
        return response
    } catch (error) {
        console.error(error)
    }
}