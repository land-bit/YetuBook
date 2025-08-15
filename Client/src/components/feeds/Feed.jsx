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
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDeleteForever } from "react-icons/md";

export default function Feed({
  handleDeletePost,
  LoadingComment,
  post,
  onLike,
  onAddComment,
}) {
  const [openComment, SetOpenComment] = useState(false);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(
    post.likes.some((e) => e.authorId === user.user_metadata.id) ? true : false
  );
  const [nLike, setNLike] = useState(post.likes.length);

  const CommentHandeler = () => {
    SetOpenComment(!openComment);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddComment({
      content: comment,
      authorId: user.user_metadata.id,
      postId: post.id,
    });

    setComment("");
  };

  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    const date = new Date(post.createdAt);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) {
      setDisplayTime("À l’instant");
    } else if (diffMin < 60) {
      setDisplayTime(`Il y a ${diffMin} min`);
    } else if (diffHrs < 24) {
      setDisplayTime(`Il y a ${diffHrs} h`);
    } else if (diffDays === 1) {
      setDisplayTime(
        `Hier à ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
    } else {
      setDisplayTime(
        `${date.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
        })} à ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
    }
  }, [post.createdAt]);
  return (
    <div className="feed" key={post.id}>
      <div className="top-centent">
        <Link to="./profile/id">
          <div className="user">
            <img src={post.author.avatarUrl} alt="" />
            <div>
              <h5 className="text-foreground font-bold">
                {post.author.fullName}
              </h5>
              <small>{displayTime}</small>
            </div>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span>
              <FontAwesomeIcon icon={faEllipsis} color="black" />
            </span>
          </DropdownMenuTrigger>
          {user.user_metadata.id === post.authorId && (
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className={"text-red-500 hover:bg-red-200"}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Supprimer ce post
                      <DropdownMenuShortcut>
                        <MdDeleteForever className="text-red-500" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Êtes-vous absolument sûr ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. Elle supprimera
                        définitivement ce post de nos serveurs.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        className={"bg-red-300 hover:bg-red-500"}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <div className="mid-content">
        <p>{post.content}</p>
        {post.imageUrl && (
          <div
            className="w-full h-full aspect-[1/1.5] bg-top bg-cover"
            style={{ backgroundImage: `url(${post.imageUrl})` }}
          ></div>
        )}
      </div>
      <div className="like-icon"></div>
      <div className="bottom-content">
        <div
          className="action-item cursor-pointer"
          onClick={() => {
            setLike(!like);
            setNLike(like ? nLike - 1 : nLike + 1);
            onLike(post.id, user.user_metadata.id);
          }}
        >
          <span>
            <FontAwesomeIcon
              icon={faHeart}
              className={like ? "text-black" : ""}
            />
            {"  "}
            {`${nLike} like(s)`}
          </span>
        </div>
        <div className="action-item cursor-pointer" onClick={CommentHandeler}>
          <span>
            <FontAwesomeIcon icon={faComment} />
            {"  "}
            {`${post.comments.length} comment(s)`}
          </span>
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faShare} />
            {"  "} {"3 partage(s)"}
          </span>
        </div>
      </div>
      {openComment && (
        <Comments
          contents={post.comments}
          handleCommentSubmit={handleCommentSubmit}
          setComment={setComment}
          comment={comment}
          LoadingComment={LoadingComment}
        />
      )}
    </div>
  );
}
