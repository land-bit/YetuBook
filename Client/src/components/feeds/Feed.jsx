/* eslint-disable react/prop-types */
import "./feeds.css";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsis,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Feed({ fed }) {
  let [openComment, SetOpenComment] = useState(false);

  const CommentHandeler = () => {
    SetOpenComment(!openComment);
  };

  return (
    <div className="feed" key={fed.id}>
      <div className="top-centent">
        <Link to="./profile/id">
          <div className="user">
            <img src={fed.feedProfile} alt="" />
            <div>
              <h5 className="text-foreground font-bold">{fed.name}</h5>
              <small>{fed.time}</small>
            </div>
          </div>
        </Link>
        <span>
          <FontAwesomeIcon icon={faEllipsis} color="black" />
        </span>
      </div>
      <div className="mid-content">
        <p>{fed.desc}</p>
        <div
          className="w-full aspect-[1/1.5] bg-top bg-cover"
          style={{ backgroundImage: `url(${fed.feedImage})` }}
        ></div>
        {/* <img src={fed.feedImage} alt="" /> */}
      </div>
      <div className="like-icon">
        {/* <FontAwesomeIcon icon={faHeart} /> */}
      </div>
      <div className="bottom-content">
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faHeart} /> 14 like
          </span>
        </div>
        <div className="action-item" onClick={CommentHandeler}>
          <span>
            <FontAwesomeIcon icon={faComment} /> 4 Maoni
          </span>
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faShare} /> 3 Migawanyiko
          </span>
        </div>
      </div>
      {openComment && <Comments />}
    </div>
  );
}
