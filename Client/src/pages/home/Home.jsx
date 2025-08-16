import { useState, useEffect } from "react";
import AddPost from "../../components/addPost/AddPost";
import Stories from "../../components/stories/Stories";
import Feeds from "../../components/feeds/Feeds";
import axios from "axios";
import "./home.css";
import { supabase } from "@/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [LoadingComment, setLoadingComment] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Erreur récupération posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Ajout optimiste
  const handleAddPost = async (newPostData) => {
    setLoadingPost(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    try {
      // 2. Envoyer au backend
      const res = await axios.post(`${API}/api/posts`, newPostData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts([res.data, ...posts]);
    } catch (error) {
      console.error("Erreur ajout post:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setLoadingPost(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;

    try {
      // 1. Supprimer sur le backend
      await axios.delete(`${API}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Mettre à jour la liste localement
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Erreur suppression post:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleLike = async (postId, userId) => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    try {
      await axios.post(
        `${API}/api/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes: p.likes.includes(userId)
                  ? [...p.likes, userId]
                  : p.likes.filter((id) => id !== userId),
              }
            : p
        )
      );
    }
  };

  // 🔹 Ajouter un commentaire
  const handleAddComment = async (commentData) => {
    setLoadingComment(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    try {
      const res = await axios.post(
        `${API}/api/posts/${commentData.postId}/comments`,
        commentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts((prev) =>
        prev.map((p) =>
          p.id === res.data.postId
            ? {
                ...p,
                comments: [res.data, ...p.comments],
              }
            : p
        )
      );
      setLoadingComment(false);
    } catch {
      console.error("Erreur lors de l'ajout du commentaire");
    }
  };
  return (
    <div className="home">
      <Stories />
      <AddPost
        loadingPost={loadingPost}
        setLoadingPost={setLoadingPost}
        onPostSubmit={handleAddPost}
        isProfile={false}
      />
      <Feeds
        handleDeletePost={handleDeletePost}
        loadingPost={loadingPost}
        LoadingComment={LoadingComment}
        posts={posts}
        onLike={handleLike}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
