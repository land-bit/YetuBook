import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;

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
  `;

  try {
    const result = await model.generateContent(promptWithJson);
    const response = result.response;
    // Assurez-vous d'utiliser await ici
    if (!response || typeof response.text !== 'function') {
      throw new Error('Invalid response object');
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error; // Relancer l'erreur pour la gérer ailleurs si nécessaire
  }
}