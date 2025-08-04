import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import { Text } from "@chakra-ui/react";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Dashboard from "../dashboard/dashboard";
import RoleBasedProtectedRoute from "./../components/auth/RoleBasedProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import Home from "./../pages/Home";
import CreatePost from "./../pages/CreatePost";
import BlogListPage from "../pages/Posts";
import PostDetailPage from "../pages/PostDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts",
        element: <BlogListPage />,
      },
      {
        path: "/posts/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/create-post",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-post/:id",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
