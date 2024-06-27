import { Link, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCircleNotch, faEllipsis, faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons"

// import Message from "../../components/message/Message"
import MessagesData from "../../FackApis/MessageData"
import CurrentUser from "../../FackApis/CurrentUserData"
// import Box from "./Box"
import "./chatbox.css"

export default function ChatBox() {

    return (
        <>

            <div className="box">
                <div className="sidebarChatbox">
                    <div className="side-header2">
                        <Link to="/"><div className="retour"><span><FontAwesomeIcon icon={faArrowLeft} /></span></div></Link>
                        <div className="nav-sidebar">

                            <Link to='/profile/id'>
                                <div className="user">
                                    <img src={CurrentUser.map(user => (user.ProfieImage))} alt="" />
                                </div>
                            </Link>
                            <div className="nav-sidebaricon">
                                <span><FontAwesomeIcon icon={faCircleNotch} /></span>
                                <span><FontAwesomeIcon icon={faEllipsisVertical} /></span>
                            </div>
                        </div>

                    </div>

                    <div className="message-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="search" placeholder="Tafuta Ujumbe" />
                    </div>

                    {
                        MessagesData.map(user => (
                            <Link to="chatbox/:chatboxId" key={user.id}>
                                <div className="message" >
                                    <div className="user">
                                        <img src={user.img} alt="" />
                                        <div className="green-active"></div>
                                    </div>
                                    <div className="message-body2">

                                        <div className="message-brif">
                                            <h5>{user.name}</h5>
                                            <p>{user.mText}</p>
                                        </div>
                                        <div>
                                            <div className="notification-message">
                                                <p>12:30</p>
                                                <div className="nombre"><span>2</span></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))
                    }

                </div>

                <Outlet />

            </div>
        </>

    )
}