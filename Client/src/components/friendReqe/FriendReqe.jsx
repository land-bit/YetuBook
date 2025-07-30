import "./friendReqe.css";
import { Link } from "react-router-dom";

// FackApis...................
import FriendReqData from "../../FackApis/FirendReqData";

export default function FriendReqe() {
  return (
    <div className="Friend-Request">
      <br />
      <h4>{"Invitation d'amis"}</h4>

      {FriendReqData.map((friend, index) => (
        <div className="request" key={index}>
          <Link to="/profile/id">
            <div className="inform">
              <div className="user">
                <img src={friend.img} alt="" />
                <h5 className="text-foreground">{friend.name}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info} Amis en commun</p>
              </div>
            </div>
          </Link>

          <div className="action">
            <button className="btn btn-primary">Accepter</button>
            <button className="btn btn-red">Refuser</button>
          </div>
        </div>
      ))}
    </div>
  );
}
