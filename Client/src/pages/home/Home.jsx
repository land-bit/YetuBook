//Components..................
import AddPost from "../../components/addPost/AddPost";
import Stories from "../../components/stories/Stories";
import Feeds from "../../components/feeds/Feeds";

export default function Home() {
  return (
    <>
      <Stories />
      <AddPost />
      <Feeds />
    </>
  );
}
