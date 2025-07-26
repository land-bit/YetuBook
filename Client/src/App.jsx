import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Login from "./pages/login/Login";
import ChatBox from "./pages/chatbox/ChatBox";
import Box from "./pages/chatbox/Box";
import Init from "./pages/chatbox/Init";
import ChatGPT from "./pages/chatGPT/ChatGPT";
import Boutique from "./pages/boutique/Boutique";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardchildren/DashboardHome";
import Historique from "./pages/dashboard/dashboardchildren/Historique";
import Mantenant from "./pages/dashboard/dashboardchildren/Mantenant";
import Previsions from "./pages/dashboard/dashboardchildren/Previsions";
import Statistiques from "./pages/dashboard/dashboardchildren/Statistiques";
import Cartes from "./pages/dashboard/dashboardchildren/Cartes";
import Alertes from "./pages/dashboard/dashboardchildren/Alertes";
import CreatAdmins from "./pages/dashboard/dashboardchildren/CreatAdmins";
import Calendrier from "./pages/dashboard/dashboardchildren/Calendrier";
import FAQPage from "./pages/dashboard/dashboardchildren/FAQPage";
import { AuthProvider } from "./lib/contexts/AuthProvider";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/chatbox",
      element: <ChatBox />,
      children: [
        {
          path: "chatbox/:chatboxId",
          element: <Box />,
        },
        {
          path: "/chatbox",
          element: <Init />,
        },
      ],
    },

    {
      path: "/chatgpt",
      element: <ChatGPT />,
    },
    {
      path: "/boutique",
      element: <Boutique />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardHome />,
        },
        {
          path: "/dashboard/historique",
          element: <Historique />,
        },
        {
          path: "/dashboard/maintenant",
          element: <Mantenant />,
        },
        {
          path: "/dashboard/previsions",
          element: <Previsions />,
        },
        {
          path: "/dashboard/statistiques",
          element: <Statistiques />,
        },
        {
          path: "/dashboard/cartes",
          element: <Cartes />,
        },
        {
          path: "/dashboard/alertes",
          element: <Alertes />,
        },
        {
          path: "/dashboard/creatadmins",
          element: <CreatAdmins />,
        },
        {
          path: "/dashboard/calendrier",
          element: <Calendrier />,
        },
        {
          path: "/dashboard/faqpage",
          element: <FAQPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
