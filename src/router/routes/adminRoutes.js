import { lazy } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// const Dashboard = lazy(() => import("../../views/pages/Dashboard/dashboard"));
const Dashboard = lazy(() => import("../../views/dashboard/analytics"));
const Video = lazy(() => import("../../views/pages/video/Video"));
let user = JSON.parse(secureLocalStorage.getItem("userData"));
let AdminRoutes = [];

AdminRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/video",
    element: <Video />,
  },
];
export default AdminRoutes;
