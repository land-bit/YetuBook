import { GoogleGenerativeAI } from "@google/generative-ai";
// import { API_KEY_GEMINI } from "../../../dotenv";
import dataPrevisions from "../../pages/dashboard/previsiondataexemple";

const API_KEY_GEMINI = import.meta.env.VITE_API_KEY_GEMINI

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getGemini(promptInput, conversationHistory) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const data = dataPrevisions.list;
  const ville = dataPrevisions.city.name;
  const firstTenItems = data.slice(0, 10);
  const itemsData = firstTenItems.map(item => {
    return `Prévision pour ${item.dt_txt}: Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité${item.main.humidity}%, pression${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}, Vitesse du Vent : ${item.wind.speed} m/s, l'ortientation du vent ${item.wind.deg},  Probabilité de pluie${item.pop}% de chance de pluie`;
  });

  const itemsDataJson = firstTenItems.map(item => {
    return {
      dt_txt: item.dt_txt,
      main: item.main,
      weather: item.weather,
      wind: item.wind,
      pop: item.pop,
      ville: ville
    }
    // return `Prévision pour ${item.dt_txt}: Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité${item.main.humidity}%, pression${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}, Vitesse du Vent : ${item.wind.speed} m/s, l'ortientation du vent ${item.wind.deg},  Probabilité de pluie${item.pop}% de chance de pluie`;
  });
  console.log(itemsDataJson)

  const prompt = `
        **User Input:** ${promptInput}

        **Conversation Context:**
        ${conversationHistory}

        **Weather Data:**
        ${itemsData.join('\n')}
        `;

  const promptWithJson = `

    **Role:** chatbot assistant named MétéoChat developped by Gérard Cubaka form Goma D.R.Congo

    **Style of conversation:** Casual, respectful, not too enthusiastic or flowery.

    **Answer:** short, precise and clear 

    **User Input:** ${promptInput}

    **Conversation Context:**
    ${conversationHistory}

    **Weather Data:**
    ${JSON.stringify(itemsDataJson, null, 2)}
    
  `

  const result = await model.generateContent(promptWithJson);
  const response = await result.response;
  const text = response.text();
  return text;
}