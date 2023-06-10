import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
]);
