import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY_GEMINI } from "../../../dotenv";
import dataPrevisions from "../../pages/dashboard/previsiondataexemple";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getGemini(promptInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const data = dataPrevisions.list;
  const firstTenItems = data.slice(0, 10);
  // Map each item object to a string representation and join them together
  const itemsData = firstTenItems.map(item => {
    return `Prévision pour ${item.dt_txt}: Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité${item.main.humidity}%, pression${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}, Vent : ${item.wind}, Probabilité de pluie${item.pop}% de chance de pluie`;
  });
  console.log(firstTenItems)
  // Combine the prompt with the data to generate a new text response
  const prompt = `${promptInput} voici les données des prévisions pour ma région à traiter: ${itemsData.join('\n')}`;
  
  // Combine the prompt with the data to generate a new text response
  // const prompt = `${promptInput} voici les donnés des pévisions pour ma région à traiter:${firstTenItems}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}