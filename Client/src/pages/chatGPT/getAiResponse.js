import { API_KEY_OPENAI } from "../../../dotenv";
async function getGPT(question) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${API_KEY_OPENAI}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${question}`,
          },
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    console.log(data)

    const message = await data.choices; //["0"].message.conten
    return message;
  } catch (error) {
    console.error("Erreur lors de la requête de l'API :", error);
  }
}

export default getGPT;