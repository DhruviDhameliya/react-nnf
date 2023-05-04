import { lazy } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const Video = lazy(() => import("../../views/pages/video/Video"));
const QuizApp = lazy(() => import("../../views/pages/quiz"));
const Certificate = lazy(() =>
  import("../../views/pages/certificate/Certificate")
);
let user = JSON.parse(secureLocalStorage.getItem("userData"));
let UserRoutes = [];

UserRoutes = [
  {
    path: "/quiz",
    element: <QuizApp />,
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    path: "/certificate",
    element: <Certificate />,
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
];
export default UserRoutes;
