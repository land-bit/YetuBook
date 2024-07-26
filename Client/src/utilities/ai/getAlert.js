import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY_GEMINI = import.meta.env.VITE_API_KEY_GEMINI

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getAlert(weatherdata) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const promptWithJson = `
    **Answer:** short, precise and clear.

    **User Input:** Génère une alerte météorologique pour ces données

    **Weather Data:**
    ${JSON.stringify(weatherdata, null, 2)}
  `

  const result = await model.generateContent(promptWithJson);
  const response = result.response;
  const text = response.text();
  return text;
}