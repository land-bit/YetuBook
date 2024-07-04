  import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

//Pages......................................
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ChatBox from "../pages/chatbox/ChatBox";
import ChatGPT from "../pages/chatGPT/ChatGPT"


//Components..................................
import Nav from "../components/nav/nav";
import LeftBar from "../components/leftbar/LeftBar";
import RightBar from "../components/rightbar/RightBar";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Box from "../pages/chatbox/Box";
import Init from "../pages/chatbox/Init"
import Boutique from "../pages/boutique/Boutique";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/dashboardchildren/DashboardHome";
import Mantenant from "../pages/dashboard/dashboardchildren/Mantenant";
import Historique from "../pages/dashboard/dashboardchildren/Historique";
import Previsions from "../pages/dashboard/dashboardchildren/Previsions";
import Statistiques from "../pages/dashboard/dashboardchildren/Statistiques";
import Cartes from "../pages/dashboard/dashboardchildren/Cartes";
import Alertes from "../pages/dashboard/dashboardchildren/Alertes";
import CreatAdmins from "../pages/dashboard/dashboardchildren/CreatAdmins";
import Calendrier from "../pages/dashboard/dashboardchildren/Calendrier";
import FAQPage from "../pages/dashboard/dashboardchildren/FAQPage";


export default function LayOut() {

    //Structure de l'application..............
    const Structure = () => {
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
        )
    }
    //Structure des Routers............

    const router = createBrowserRouter([  
        {
            path: '/',
            element: <Structure />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/profile/:id',
                    element: <Profile />
                },
            ],
            errorElement: <ErrorPage />,
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/chatbox',
            element: <ChatBox />,
            children: [
                {
                    path: 'chatbox/:chatboxId',
                    element: <Box />
                },
                {
                    path: '/chatbox',
                    element: <Init />
                }
            ]
        },

        {
            path: '/chatgpt',
            element: <ChatGPT />
        },
        {
            path: '/boutique',
            element: <Boutique />
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                {
                    path: '/dashboard',
                    element: <DashboardHome />
                },
                { 
                    path: '/dashboard/historique',
                    element: <Historique/>
                },
                {
                    path: '/dashboard/maintenant',
                    element: <Mantenant />
                },
                {
                    path: '/dashboard/previsions',
                    element: <Previsions/>
                },
                {
                    path: '/dashboard/statistiques',
                    element: <Statistiques />
                },
                {
                    path: '/dashboard/cartes',
                    element: <Cartes/>
                },
                {
                    path: '/dashboard/alertes',
                    element: <Alertes />
                },
                {
                    path: '/dashboard/creatadmins',
                    element: <CreatAdmins/>
                },
                {
                    path: '/dashboard/calendrier',
                    element: <Calendrier />
                },
                {
                    path: '/dashboard/faqpage',
                    element: <FAQPage/>
                }
            ]
        }
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}