import "./addPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import showAddPost from "../popup/showAddPost/showAddPost";
import { useAuth } from "@/lib/contexts/AuthProvider";

export default function AddPost() {
  const { user } = useAuth();
  return (
    <form className="postForm">
      <div className="user form-top">
        <Link to="/profile/id">
          <img src={user.user_metadata.avatar_url} alt="" />
        </Link>
        <input
          type="text"
          placeholder={`Quoi de neuf ${user.user_metadata.name} ?`}
          onClick={showAddPost}
          className="outline-none px-4 py-2"
        />
        <button type="submit" className="btn btn-primary">
          Publier
        </button>
      </div>

      <div className="post-categories">
        <label htmlFor="file">
          <input type="file" id="file" accept="image/*" multiple />
          <span>
            <FontAwesomeIcon icon={faImage} />{" "}
          </span>
          <strong>Photo</strong>
        </label>
        <label htmlFor="file">
          <input type="file" id="file" accept="video/*" />
          <span>
            <FontAwesomeIcon icon={faVideo} />{" "}
          </span>
          <strong> Video</strong>
        </label>
        <div>
          <span>
            <FontAwesomeIcon icon={faTags} />{" "}
          </span>
          <strong>Tag</strong>
        </div>
        <div>
          <span>
            <FontAwesomeIcon icon={faSmile} />{" "}
          </span>
          <strong>Emojis</strong>
        </div>
      </div>
    </form>
  );
}
