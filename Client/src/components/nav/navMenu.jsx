import { faBell, faHome, faMessage, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./nav.css";
import { Link } from "react-router-dom";
import CurrentUser from "../../FackApis/CurrentUserData";
import showMeteoDetails from "../popup/showMeteoDetails/showMeteoDetails";
import showChat from "../popup/showChat";
import showAddPost from "../popup/showAddPost/showAddPost";
export default function NavMenu() {
    return (
        <>
            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item"><a href="#home" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href="#about" class="nav__link">About</a></li>
                    <li class="nav__item"><a href="#skills" class="nav__link">Skills</a></li>
                    <li class="nav__item"><a href="#work" class="nav__link">Work</a></li>
                    <li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
                </ul>
            </div>

        </>
    )
}

const showHome = () => {
    alert('Home Page');

}
const showMeteo = () => {
    alert('Meteo');
    document.body.classList.remove("container");
    document.body.classList.remove("container");
}
const showMessage = () => {
    alert('Message');
}
const showNotification = () => {
    alert('Notification');
}

export function NavMenubottom() {
    return (
        <>
            <div class="menu-bottom">
                <div className="menu-bottom-child-left">
                    <div className="nemu-bottom-itms" onClick={showHome}>
                        <span className="topbar-active"></span>
                        <FontAwesomeIcon icon={faHome} />
                        <small>Nyumbani</small>
                    </div>
                    <div className="nemu-bottom-itms" onClick={showMeteoDetails}>
                        <span ></span>
                        <FontAwesomeIcon icon={faUmbrella} />
                        <small>Majira</small>
                    </div>
                </div>
                <div className="user-navbottom add-post-bottom">
                    <div className="coner-raduis-left"></div>
                    <div className="creu-img-contener">
                        <div className="user-navbottom-img" onClick={showAddPost}>
                            <img src={CurrentUser.map(user => (user.ProfieImage))} alt=""  />
                        </div>
                        <div className="creu"></div>
                    </div>
                    <div className="coner-raduis-right"></div>
                </div>
                <div className="menu-bottom-child-right">
                    <div className="nemu-bottom-itms" onClick={showChat}>
                        <span ></span>
                        <FontAwesomeIcon icon={faMessage} />
                        <small>Meteochat</small>
                    </div>
                    <div className="nemu-bottom-itms" onClick={showNotification}>
                        <span ></span>
                        <div className="notification-nav-contener-bottom">
                            <FontAwesomeIcon icon={faBell} />
                            <span className="notification-nav-bottom"><strong>3</strong></span>
                        </div>
                        <small>Arifa</small>
                    </div>
                </div>
                {/* <span className="topbar-active"></span> */}


            </div >

        </>
    )
}

