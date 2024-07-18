import { GoogleGenerativeAI } from "@google/generative-ai";
import getPrevision from '../../utilities/weather/getPrevisionMeteo';

const API_KEY_GEMINI = import.meta.env.VITE_API_KEY_GEMINI

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getGemini(promptInput, conversationHistory) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const data = getPrevision();
  console.log(data, airpollution);

  const promptWithJson = `
    **Role:** chatbot assistant named MétéoChat developped by Gérard Cubaka form Goma D.R.Congo

    **Style of conversation:** Casual, respectful, not too enthusiastic or flowery.

    **Answer:** short, precise and clear 

    **User Input:** ${promptInput}

    **Conversation Context:**
    ${conversationHistory}

    **Weather Data:**
    ${JSON.stringify(data, null, 2)}

    **Weather Overview exempl:**
    The current weather is overcast with a 
temperature of 16°C and a feels-like temperature of 16°C. 
The wind speed is 4 meter/sec with gusts up to 6 meter/sec 
coming from the west-southwest direction. 
The air pressure is at 1007 hPa with a humidity level of 79%. 
The dew point is at 12°C and the visibility is 10000 meters. 
The UV index is at 4, indicating moderate risk from the 
sun's UV rays (if you don't have information related to uvi don't mention it). 
The sky is covered with overcast clouds, and there is 
no precipitation expected at the moment. 
Overall, it is a moderately cool and cloudy day 
with light to moderate winds from the west-southwest.

  **In case you don't access to weather data you can say** 
  Je n'ai pas accès aux prévisions météorologiques pour le moment. 
  Je vous recommande de consulter les sites ou applications spécialisés 
  pour obtenir les informations les plus à jour.

  `

  const result = await model.generateContent(promptWithJson);
  const response = result.response;
  const text = response.text();
  return text;
}