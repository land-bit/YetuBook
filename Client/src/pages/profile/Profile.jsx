import { supabase } from "@/supabaseClient";
import AddPost from "../../components/addPost/AddPost";
import UserProfile from "../../components/userProfile/UserProfile";
import axios from "axios";
import { useState } from "react";
// import Feeds from "../../components/feeds/Feeds";

export default function Profile() {
  const [loadingPost, setLoadingPost] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const handleAddPost = async (newPostData) => {
    setLoadingPost(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    try {
      // 2. Envoyer au backend
      await axios.post(`${API}/api/posts`, newPostData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Erreur ajout post:", error);
    } finally {
      setLoadingPost(false);
    }
  };
  return (
    <>
      <UserProfile />
      <AddPost
        loadingPost={loadingPost}
        setLoadingPost={setLoadingPost}
        onPostSubmit={handleAddPost}
        isProfile={true}
      />
      {/* <Feeds /> */}
    </>
  );
}
