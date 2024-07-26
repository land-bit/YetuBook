import { GoogleGenerativeAI } from "@google/generative-ai";
import getGoodFormatWeatherData from "../weather/getGoodFormatWeatherData";
import autherdata from "./aboutAuther";

const API_KEY_GEMINI = import.meta.env.VITE_API_KEY_GEMINI

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getGemini(promptInput, conversationHistory) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const data = await getGoodFormatWeatherData();

const userName = 'Gérard Cubaka';

  const promptWithJson = `
    **Role:** assistant named MétéoChat developped by Gérard Cubaka form Goma D.R.Congo (${autherdata})

    **Style of conversation:** Casual, friendly, respectful, not too enthusiastic or flowery. 

    **Answer:** short, precise and clear.

    **User Name:** ${userName}

    **User Input:** ${promptInput}

    **Conversation Context:**
    ${conversationHistory}

    **Weather Data:**
    ${JSON.stringify(data, null, 2)}
  `

  const result = await model.generateContent(promptWithJson);
  const response = result.response;
  const text = response.text();
  return text;
}