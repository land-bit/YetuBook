import React, { useEffect, useRef, useState } from "react";
import './chatBoxMessages.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMessage, faMicrophone, faPaperPlane, faPhone, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import showChat from "./showChat";
import closeChat from "./closeChat";
import getGPT from "../../pages/chatGPT/getAiResponse";
import Markdown from "react-markdown";
import meteochat from "../../assets/icon/goutedeau.png"
import getGemini from "../../utilities/ai/getGemini";


export default function ChatBoxMessages() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setInput("")

        // Si l'input n'est pas vide on créer les messages, si non on ne fait rien
        if (input !== '') {
            setMessages([
                ...messages,
                { user: "me", msg: `${input}` },
            ]);

            try {
                // let resp = await getGPT(input);
                let resp = await getGemini(input, messages)
                console.log(resp)
                if (resp == undefined) {
                    resp = 'Bonjour, nous n\'arrivons pas à accéder au modèle GPT suit à une erreur inattendue. Vérifier votre connection internet puis réessayer. Si le problème persiste contacter le service client.'
                }
                setMessages([
                    ...messages,
                    { user: "me", msg: `${input}` },
                    { user: "gpt", msg: `${resp}` },
                ]);

                setInput("");
            } catch (err) {
                console.error({ message: err.message });
            }
        }


    }
    // Toujours scroller au dernier message ici


    return (
        <>
            {/* <button className="chatbot-toggler" id="init" onClick={showChat}>
                <span className="material-symbols-outlined"><FontAwesomeIcon icon={faMessage} /></span>
                <span className="notification"><strong>3</strong></span>
                <span className="material-symbols-outlined"><FontAwesomeIcon icon={faClose} /></span>
            </button>
            <div className="notif-message">
                <p>Alerte Alerte ⚠️🚨 Tuna julisha ya kwamba nvuwa kubwa inaweza kujitokeza mjini Bukavu kesho na saa sita. Tuwe makini... </p>
            </div> */}

            <div className="chatbot" >
                <div className="child" >

                    <div className="headerChat">
                        <div className="h-child">
                            <div className="imgBot-Contenair">
                                <img src={meteochat} alt="avatar" id="avatar" />
                            </div>
                            <div className="userName">
                                MeteoChat
                                <p className="showOnline">online</p>
                                {/*<span className="typing" style="color:white; font-weight: 100; font-style:italic;font-size: 10px;line-height: 8px; display: none;">typing . . .</span> */}
                            </div>

                        </div>

                        <div className="headerBtn">
                            <span><FontAwesomeIcon icon={faPhone} /></span>
                            <span><FontAwesomeIcon icon={faVideo} /></span>
                            <span onClick={closeChat}><FontAwesomeIcon icon={faClose} /></span>
                        </div>
                    </div>

                    <div id="chat-box">
                        {/*Le contenu des messages */}
                        <div className="chat-messages">


                            {messages.map((item, index) => (
                                <ChatMessage key={index} message={item} i={index}/>
                            ))}


                        </div>
                    </div>
                    <div className="chat-input">

                        <form onSubmit={handleSubmit}>
                            <span><FontAwesomeIcon icon={faSmile} /></span>
                            <textarea type="text" value={input} onChange={handleChange} placeholder="Andika lisolô" name="story" rows="5" cols="33"></textarea>
                            <button type="submit" className="send"><FontAwesomeIcon icon={faPaperPlane} /></button>
                            <button type="submit" className="send"><FontAwesomeIcon icon={faMicrophone} /></button>
                        </form>

                    </div>

                </div>
            </div>

        </>
    )
}


const ChatMessage = ({ message, i }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const typingSpeed = 1; // Adjust the typing speed here (milliseconds per character)
        let index = 0;
        const msge = [];
        const typeText = () => {

            if (index < message.msg.length) {

                msge.push(message.msg.charAt(index))
                setDisplayedText(() => msge.join(''));
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
            <Markdown>{`${message.user === 'gpt' && message["i"] == message.length-1 ? displayedText : message.msg}`}</Markdown>
            {isTyping && message.user === 'gpt' && <span className="typing-indicator">•</span>}
        </div>
    )
}