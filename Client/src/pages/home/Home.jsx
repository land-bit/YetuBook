//Components..................
import AddPost from "../../components/addPost/AddPost";
import Stories from "../../components/stories/Stories";
import Feeds from "../../components/feeds/Feeds";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <Stories />
      <AddPost />
      <Feeds />
    </div>
  );
}
