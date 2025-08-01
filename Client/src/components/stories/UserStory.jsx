import "./stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/contexts/AuthProvider";

export default function UserStory() {
  const { user } = useAuth();
  return (
    <div className="userStory md:w-36 h-52 w-24">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={user.user_metadata.avatar_url}
          alt=""
          className="rounded-full border-2 md:border-4 w-8 md:w-16 border-primary"
        />
      </div>
      <div className="addStory py-2 px-1">
        <label htmlFor="storyFiles" className="p-1 md:p-2">
          <FontAwesomeIcon icon={faAdd}/>
          <input type="file" id="storyFiles" />
        </label>
        <h5 className="text-md">Add a Story</h5>
      </div>
    </div>
  );
}
