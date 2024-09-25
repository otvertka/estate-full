import React from "react";
// import "./layout.scss"
// import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/listPage";
import { Layout, RequireAuth } from "./pages/layout/layout";
import SinglePage from "./pages/singlePage/singlePage";
import 'leaflet/dist/leaflet.css'
import ProfilePage from "./pages/profilePage/profilePage";
import Register from "./pages/registerPage/register";
import Login from "./pages/loginPage/login";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />
        }
      ]
    }
  ]);

  return (



    <RouterProvider router={router} />
  )
}

export default App