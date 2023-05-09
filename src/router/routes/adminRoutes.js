import { lazy } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// const Dashboard = lazy(() => import("../../views/pages/Dashboard/dashboard"));
const Dashboard = lazy(() => import("../../views/dashboard/analytics"));
// const Course = lazy(() => import("../../views/pages/course/Course"));
const Video = lazy(() => import("../../views/pages/video/Video"));
const Question = lazy(() => import("../../views/pages/question/Question"));
const Users = lazy(() => import("../../views/pages/users/Users"));

let user = JSON.parse(secureLocalStorage.getItem("userData"));
let AdminRoutes = [];

AdminRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  // {
  //   path: "/course",
  //   element: <Course />,
  // },
  {
    path: "/video",
    element: <Video />,
  },
  {
    path: "/questions",
    element: <Question />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];
export default AdminRoutes;
