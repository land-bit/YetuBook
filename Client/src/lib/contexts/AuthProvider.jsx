/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { supabase } from "@/supabaseClient";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          await axios.post(`${API}/api/profile`, {
            id: session.user.id,
            email: session.user.email,
            fullName:
              session.user.user_metadata.full_name ||
              session.user.user_metadata.name,
            avatarUrl: session.user.user_metadata.avatar_url,
          });
        } catch (error) {
          console.error("Erreur lors de la création du profil :", error);
        }
      }
    };

    // 🔒 Appel uniquement si onAuthStateChange fournit une session
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
          checkSession(); // 👈 appelle checkSession ici, pas au montage
        } else {
          setUser(null);
        }
      }
    );

    // Supprimer l’appel direct ici
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
