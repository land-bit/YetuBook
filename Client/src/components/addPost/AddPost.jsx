/* eslint-disable react/prop-types */
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
import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export default function AddPost({ loadingPost, onPostSubmit }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("posts")
        .upload(fileName, imageFile);
      if (error) {
        alert("Erreur upload image");
        return;
      }
      const { data: publicUrl } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);
      imageUrl = publicUrl.publicUrl;
    }

    // 🔹 On envoie au parent immédiatement
    onPostSubmit({
      content,
      imageUrl,
    });

    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <form className="postForm hidden md:flex" onSubmit={handleSubmit}>
      <div className="user form-top relative">
        <Link to="/profile/id">
          <img src={user.user_metadata.avatar_url} alt="" />
        </Link>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder={`Quoi de neuf ${user.user_metadata.name} ?`}
          onClick={showAddPost}
          className="outline-none px-4 py-2"
        />
        {previewUrl && (
          <div
            className="my-2 absolute w-1/2 aspect-[1/1.5] bg-top bg-cover rounded-2xl top-14 right-36 border-4 border-primary"
            style={{ backgroundImage: `url(${previewUrl})` }}
          >
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setImageFile(null);
              }}
              className="text-3xl text-primary w-full"
            >
              <FaXmark className="absolute right-4 top-2" />
            </button>
          </div>
        )}
        {loadingPost ? (
          <Button size="sm" disabled className="btn flex h-auto btn-primary">
            <Loader2Icon className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" size="sm" className="btn h-auto btn-primary">
            Publier
          </Button>
        )}
      </div>

      <div className="post-categories">
        <label
          htmlFor="image-upload"
          className="flex gap-2 justify-center items-center"
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
          <span>
            <FontAwesomeIcon icon={faImage} />
          </span>
          <strong>Photo</strong>
        </label>

        <label
          htmlFor="file-video"
          className="flex gap-2 justify-center items-center"
        >
          <input type="file" id="file-video" accept="video/*" />
          <span>
            <FontAwesomeIcon icon={faVideo} />
          </span>
          <strong>Video</strong>
        </label>

        <div className="flex gap-2 justify-center items-center">
          <span>
            <FontAwesomeIcon icon={faTags} />
          </span>
          <strong>Tag</strong>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <span>
            <FontAwesomeIcon icon={faSmile} />
          </span>
          <strong>Emojis</strong>
        </div>
      </div>
    </form>
  );
}
