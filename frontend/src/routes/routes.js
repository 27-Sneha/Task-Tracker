import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    loader: requireAuth,
    element: <Home />,
  },
]);

export default router;
