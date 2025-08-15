/* eslint-disable react/prop-types */
import "./comments.css";
import { Link } from "react-router-dom";

import { useAuth } from "@/lib/contexts/AuthProvider";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Comments({
  handleCommentSubmit,
  setComment,
  comment,
  contents,
  LoadingComment,
}) {
  const { user } = useAuth();
  return (
    <div className="comments">
      <div className="writebox">
        <form action="#" onSubmit={handleCommentSubmit}>
          <div className="user">
            <img src={user.user_metadata.avatar_url} alt="" />
            <input
              className="px-4 py-2"
              type="text"
              placeholder="Andika maoni yako"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            {LoadingComment ? (
              <Button
                size="sm"
                disabled
                className="btn flex h-auto btn-primary"
              >
                <Loader2Icon className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                className="btn h-auto btn-primary"
              >
                Comment
              </Button>
            )}
          </div>
        </form>
      </div>
      {contents.map((comment, i) => (
        <Link to="" key={i}>
          <div className="user flex" key={comment.id}>
            <img src={comment.author.avatarUrl} alt="" className="w-1/10" />
            <div className="w-7/10">
              <h5>{comment.author.fullName}</h5>
              <p>{comment.content}</p>
            </div>
            <div className="w-2/10 flex justify-center items-center gap-5">
              <FaRegEdit size={24} className="hover:text-black" />
              <MdDeleteForever className="text-red-500" size={28} />
              {/* <small>1h</small> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
