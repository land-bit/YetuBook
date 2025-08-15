/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import getGPT from "./getAiResponse";

export default function ChatGPT() {
  const [userInput, setUserInput] = useState("");
  const [responseAI, setResponseAI] = useState([]);

  async function handleApiResponse(e) {
    e.preventDefault(); // Empêcher le rafraîchissement de la page
    setUserInput(""); // Lorsqu'on soumet le formulaire l'input revien à un string vide
    setResponseAI([...responseAI, { user: "me", message: `${userInput}` }]);
    try {
      const data = await getGPT(userInput);
      setResponseAI([
        ...responseAI,
        { user: "me", message: `${userInput}` },
        { user: "gpt", message: `${data}` },
      ]);
    } catch (error) {
      console.error("Erreur lors de la requête à l'API OpenAI :", error);
    }
  }

  return (
    <>
      <div className="box">
        <div className="sidebar">
          <div className="side-header">
            <Link to="/">
              <div className="retour">
                <span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              </div>
            </Link>
            <button>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>{" "}
              Nouvelle discussion
            </button>
          </div>

          <div className="historique">
            <h4>Discussion précedentes</h4>
            <br />
            <p>Comment rencontrer le président Tchisekedi ?</p>
          </div>
          <div className="inforchagpt">
            <small>
              {"Cette application utilise l'API de chatGPT-3.5 de OpenAI."}
              <br />
              Et a été dévelopé à Goma, RDCongo ©2025
            </small>
          </div>
        </div>
        <div className="chat-container">
          <div className="header-container">
            <div className="header-content">
              <div className="head">
                <div className="kiriku">
                  <img src={AI} alt="" />
                </div>
                <h4>Toto-IA</h4>
              </div>
            </div>
          </div>

          <div className="message-container">
            <div className="messages">
              {responseAI.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          </div>

          <div className="input-container">
            <form onSubmit={handleApiResponse}>
              <input
                className="outiline-none px-4 py-2"
                type="text"
                rows="1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Pose moi n'importe quelle question"
              />
              <span>
                <FontAwesomeIcon icon={faMicrophone} />
              </span>
              <label htmlFor="gptFiles">
                <span>
                  <FontAwesomeIcon icon={faImage} />
                </span>
                <input type="file" id="gptFiles" />
              </label>
              <span>
                <FontAwesomeIcon icon={faPaperclip} />
              </span>
              <button type="submit" className="send">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
            <small>
              Toto-AI peut afficher des informations inexactes, y compris sur
              des personnes. Vérifiez donc ses réponses.
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

const ChatMessage = ({ message }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingSpeed = 1; // Adjust the typing speed here (milliseconds per character)
    let index = 0;
    const msg = [];
    const typeText = () => {
      if (index < message.message.length) {
        msg.push(message.message.charAt(index));
        setDisplayedText(() => msg.join(""));
        index++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeText();
  }, [message]);
  return (
    <div className={`${message.user === "gpt" ? "bulle2" : "bulle"}`}>
      <Markdown>{`${
        message.user === "gpt" ? displayedText : message.message
      }`}</Markdown>
      {isTyping && message.user === "gpt" && (
        <span className="typing-indicator">•</span>
      )}
    </div>
  );
};
