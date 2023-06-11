import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddClasses from "../Pages/Dashboard/AddClasses/AddClasses";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import Instructors from "../Pages/Instructors/Instructors";
import InstructorDetails from "../Pages/Instructors/InstructorDetails";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import AllClasses from "../Pages/AllClasses/AllClasses";

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
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/instructors/:id",
        element: (
          <PrivateRoute>
            <InstructorDetails></InstructorDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //admin routes
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            {" "}
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            {" "}
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },

      //instructor routes
      {
        path: "addClasses",
        element: (
          <InstructorRoute>
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },

      //student routes
    ],
  },
]);
