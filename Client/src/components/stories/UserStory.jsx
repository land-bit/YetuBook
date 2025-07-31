import "./stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/contexts/AuthProvider";

export default function UserStory() {
  const { user } = useAuth();
  return (
    <div className="userStory w-36 h-52">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={user.user_metadata.avatar_url}
          alt=""
          className="rounded-full border-4 border-primary"
        />
      </div>
      <div className="addStory py-5 px-2">
        <label htmlFor="storyFiles">
          <FontAwesomeIcon icon={faAdd} />
          <input type="file" id="storyFiles" />
        </label>
        <h5>Add a Story</h5>
      </div>
    </div>
  );
}
