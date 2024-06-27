import axios from "axios";
import { API_KEY_OPENWEATHER } from "../../../dotenv";

axios
export default async function getPrevisionMeteo(long, lat){
    const units = 'metric'
    const lang = 'fr'
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY_OPENWEATHER}&lang=${lang}&units=${units}`

    try {
        const response = await axios.get(url);
        
        return response
    } catch (error) {
        console.error(error)
    }
}