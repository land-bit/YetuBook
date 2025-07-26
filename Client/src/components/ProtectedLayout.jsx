// src/layouts/ProtectedLayout.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";

import Nav from "./nav/nav";
import LeftBar from "./leftbar/LeftBar";
import RightBar from "./rightbar/RightBar";

export default function ProtectedLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };
        fetchSession();
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (!session) return <Navigate to="/login" replace />;

    return (
        <>
            <Nav />
            <main>
                <LeftBar />
                <div className="container">
                    <Outlet />
                </div>
                <RightBar />
            </main>
        </>
    );
}
