// import MessagesData from "../../FackApis/MessageData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faMicrophone, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons"


export default function Box(){
    return(
        <>
            <div className="chat-container">
                <div className="header-container">
                    <div className="header-content">
                        <div className="head">
                            <div className="kiriku">
                                {/* {MessagesData.map((user, i) => (<img src={user.img} alt="" key={i}/>))} */}
                            </div>
                                {/* {MessagesData.map((user, i) => (<h4 key={i}>{user.name}</h4>))} */}
                        </div>
                    </div>
                </div>

                <div className="message-container">
                    <div className="messages">

                        <div className="bulle">
                            <p>Comment rencontrer le président Tchisekedi ?</p>
                        </div>
                        <div className="bulle2">
                            <p>Je ne peux pas fournir des informations sur la manière de rencontrer le président Tshisekedi. Je vous recommande de contacter les autorités compétentes en République Démocratique du Congo pour obtenir des informations officielles sur la procédure à suivre pour rencontrer le président.</p>
                        </div>

                    </div>
                </div>

                <div className="input-container">

                    <form action="">
                        <input type="text" placeholder="Pose moi n'importe quelle question" />
                        <span><FontAwesomeIcon icon={faMicrophone} /></span>
                        <span><FontAwesomeIcon icon={faImage} /></span>
                        <span><FontAwesomeIcon icon={faPaperclip} /></span>
                        <button type="submit" className="send"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>

            </div>
        </>
    )
}