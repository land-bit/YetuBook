import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dashboard.css";
import {
  faBars,
  faBell,
  faDownload,
  faEnvelope,
  faFileArrowDown,
  faFileLines,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function DashboardNav({ text }) {
  return (
    <>
      <div className="dashoard-nav">
        <div className="dash-title-hard">
          <h3 className="logo-dashbord">{text}</h3>
          <div className="dash-downloard">
            <FontAwesomeIcon icon={faDownload} />
            <FontAwesomeIcon incon={faFileArrowDown} />
            <FontAwesomeIcon icon={faFileLines} />
          </div>
        </div>
        <div className="Nav-Serchbar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" />
        </div>

        <div className="dash-nav-icons">
          <Link to="/chatbox/">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to="/">
            <div className="notification-nav-contener">
              <FontAwesomeIcon icon={faBell} />
              <span className="notification-nav">
                <strong>3</strong>
              </span>
            </div>
          </Link>

          <Link to="/">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          {/* <DarkMoode /> */}
        </div>
      </div>
    </>
  );
}
