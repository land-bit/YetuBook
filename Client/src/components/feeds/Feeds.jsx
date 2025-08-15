/* eslint-disable react/prop-types */
import "./feeds.css";
import Feed from "./Feed";
import { LoaderPinwheelIcon } from "lucide-react";

export default function Feeds({
  handleDeletePost,
  loadingPost,
  LoadingComment,
  onLike,
  onAddComment,
  posts,
}) {
  return (
    <div className="feeds">
      {loadingPost ? (
        <LoaderPinwheelIcon size={"38px"} className="animate-spin mt-14" />
      ) : (
        <>
          {posts.map((post, index) => (
            <Feed
              handleDeletePost={handleDeletePost}
              post={post}
              key={index}
              onLike={onLike}
              onAddComment={onAddComment}
              LoadingComment={LoadingComment}
            />
          ))}
        </>
      )}
    </div>
  );
}
