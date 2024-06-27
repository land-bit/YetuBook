import "./message.css"
import { Link } from "react-router-dom"
import ai from "../../assets/icon/brain.png"
import meteochat from "../../assets/icon/goutedeau.png"

//FackApis...............................
import MessageData from "../../FackApis/MessageData"

//FontAwesome Icon.......................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons"
import showChat from "../popup/showChat"

export default function Message() {
    return (
        <div className="Messages">
            <div className="message-top">
                <h4>Masolô ! </h4>
                <span><FontAwesomeIcon icon={faEdit} /></span>
            </div>
            <div className="message-search">
                <span><FontAwesomeIcon icon={faSearch} /></span>
                <input type="search" placeholder="Tafuta lisolô" />
            </div>




            <div className="message" onClick={showChat}>
                <div className="user">
                    <img src={meteochat} alt="" />
                    <div className="green-active"></div>
                </div>
                <div className="message-body2">
                    <div className="message-body">
                        <h5>MeteoChat</h5>
                        <p className="para">Jambo Gérard, hii ni ripoti ya ma jira ya léo</p>
                    </div>
                    <div>
                        <div className="notification-message">
                            <p>12:30</p>
                            <div className="nombre"><span>2</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="message" onClick={showChat}>
                <div className="user">
                    <img src={ai} alt="" />
                    <div className="green-active"></div>
                </div>
                <div className="message-body2">
                    <div className="message-body">
                        <h5>AIChat</h5>
                        <p className="para">Jambo Gérard, nikusaidiye namna gani léo ?</p>
                    </div>
                    <div>
                        <div className="notification-message">
                            <p>12:30</p>
                            <div className="nombre"><span>2</span></div>
                        </div>
                    </div>
                </div>
            </div>
            {
                MessageData.map(mess => (

                    <div className="message" onClick={showChat} key={mess.id}>
                        <div className="user">
                            <img src={mess.img} alt="" />
                            <div className="green-active"></div>
                        </div>
                        <div className="message-body2">
                            <div className="message-body">
                                <h5>{mess.name}</h5>
                                <p className="para">{mess.mText}</p>
                            </div>
                            <div>
                                <div className="notification-message">
                                    <p>12:30</p>
                                    <div className="nombre"><span>2</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }
            <br />
            <div className='see-more'>Ona mengi</div>
            <br />

        </div>
    )
}