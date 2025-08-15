import "./userProfile.css";

// Fach APIs................
import CurrentUserData from "../../FackApis/CurrentUserData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/contexts/AuthProvider";

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div className="userProlile">
      <div className="cover-photos">
        <img src={CurrentUserData.map((user) => user.CoverPhoto)} alt="" />
      </div>
      <div className="profile-info">
        <img src={user.picture} alt="" />
        <div className="profile-name">
          <h3>{user.name}</h3>
          <h5>{`@${user.name.replaceAll(" ", "").toLowerCase()}`}</h5>
        </div>
        <div className="profile-button">
          <Link to={`/chatbox/${user.id}`}>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </Link>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faFeed} />
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
        <div className="see-more">Vous êtes ami de :</div>
      </div>
    </div>
  );
}
