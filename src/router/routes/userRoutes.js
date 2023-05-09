import { lazy } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
// import ProfileUpdate from "../../views/pages/profileUpdate";
// import ProfileUpdate from "../../views/pages/profileUpdate/personalUpdate";
const QuizApp = lazy(() => import("../../views/pages/quiz"));
const Certificate = lazy(() =>
  import("../../views/pages/certificate/Certificate")
);
const ProfileUpdate = lazy(() => import("../../views/pages/profileUpdate"));
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
    // meta: {
    //   appLayout: true,
    //   className: "email-application",
    // },
  },
  {
    path: "/profile",
    element: <ProfileUpdate />,
    // meta: {
    //   appLayout: true,
    //   className: "email-application",
    // },
  },
];
export default UserRoutes;
