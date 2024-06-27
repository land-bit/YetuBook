import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AI from "../../assets/icon/brain.png";
import "./chatGPT.css";
import {
  faArrowLeft,
  faImage,
  faMicrophone,
  faPaperPlane,
  faPaperclip,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import { API_KEY_OPENAI } from "../../../dotenv";

export default function ChatGPT() {
  const [userInput, setUserInput] = useState("");
  const [responseAI, setResponseAI] = useState([]);



  async function handleApiResponse(event) {
    event.preventDefault(); // Empêcher le rafraîchissement de la page
    setUserInput(""); // Lorsqu'on soumet le formulaire l'input revien à un string vide
    setResponseAI([...responseAI, { user: "me", message: `${userInput}` }])
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_OPENAI}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: 'user', content: userInput }], //responseAI.map((message) => message.message).join("")
          max_tokens: 100,
        })
      })


      const data = await response.json();
      console.log(data)
      setResponseAI([...responseAI, { user: "me", message: `${userInput}` }, { user: "gpt", message: `${data.choices[0].message.content}` }])

    }
    catch (error) {
      console.error("Erreur lors de la requête à l'API OpenAI :", error);
    }

  };


  return (
    <>

      <div className="box">

        <div className="chat-container">

          <div className="message-container">
            <div className="messages">
              {responseAI.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          </div>

          <div className="input-container">
            <form onSubmit={handleApiResponse}>
              <input type="text" rows="1" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Pose moi n'importe quelle question" />
              <span><FontAwesomeIcon icon={faMicrophone} /></span>
              <label htmlFor='gptFiles'>
                <span><FontAwesomeIcon icon={faImage} /></span>
                <input type='file' id='gptFiles' />
              </label>
              <span><FontAwesomeIcon icon={faPaperclip} /></span>
              <button type="submit" className="send"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}


const ChatMessage = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingSpeed = 1; // Adjust the typing speed here (milliseconds per character)
    let index = 0;
    const msg = [];
    const typeText = () => {    

      if (index < message.message.length) {
        
        msg.push(message.message.charAt(index))
        setDisplayedText(()=> msg.join(''));
        index++;
      setTimeout(typeText, typingSpeed);

      } else {
        setIsTyping(false);
      }
    };

    typeText();
  }, [message]);
  return (
      <div className={`${message.user === 'gpt' ? 'bulle2' : 'bulle'}`}>
      <Markdown>{`${message.user === 'gpt' ? displayedText : message.message}`}</Markdown>
      {isTyping && message.user === 'gpt' && <span className="typing-indicator">•</span>}
    </div>
  )
}


