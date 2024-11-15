import React from "react";
import HomePage from "./pages/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/listPage";
import { Layout, RequireAuth } from "./pages/layout/layout";
import SinglePage from "./pages/singlePage/singlePage";
import 'leaflet/dist/leaflet.css'
import ProfilePage from "./pages/profilePage/profilePage";
import Register from "./pages/registerPage/register";
import Login from "./pages/loginPage/login";
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import PostFormPage from "./pages/PostFormPage/PostFormPage";

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
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />
        },
        {
          path: "/add",
          element: <PostFormPage isEditing={false} />
        },
        {
          path: "/edit/:postId",
          element: <PostFormPage isEditing={true} />
        },
      ]
    }
  ]);

  return (



    <RouterProvider router={router} />
  )
}

export default App