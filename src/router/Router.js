// // ** Router imports
// import { lazy } from "react";

// // ** Router imports
// import { useRoutes, Navigate } from "react-router-dom";

// // ** Layouts
// import BlankLayout from "@layouts/BlankLayout";

// // ** Hooks Imports
// import { useLayout } from "@hooks/useLayout";

// // ** Utils
// import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils";

// // ** GetRoutes
// import { getRoutes } from "./routes";

// // ** Components
// const Error = lazy(() => import("../views/pages/misc/Error"));
// const Login = lazy(() => import("../views/pages/authentication/Login"));
// const RegisterMultiSteps = lazy(() =>
//   import("../views/pages/authentication/register-multi-steps")
// );
// const NotAuthorized = lazy(() => import("../views/pages/misc/NotAuthorized"));

// const Router = () => {
//   // ** Hooks
//   const { layout } = useLayout();

//   const allRoutes = getRoutes(layout);
//   const getHomeRoute = () => {
//     const user = getUserData();
//     if (user) {
//       return getHomeRouteForLoggedInUser(user.role);
//     } else {
//       return "/login";
//     }
//   };

//   const routes = useRoutes([
//     {
//       path: "/",
//       index: true,
//       element: <Navigate replace to={getHomeRoute()} />,
//     },
//     {
//       path: "/login",
//       element: <BlankLayout />,
//       children: [{ path: "/login", element: <Login /> }],
//     },
//     {
//       path: "/auth/not-auth",
//       element: <BlankLayout />,
//       children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
//     },
//     {
//       path: "*",
//       element: <BlankLayout />,
//       children: [{ path: "*", element: <Error /> }],
//     },
//     {
//       path: "/register",
//       element: <BlankLayout />,
//       children: [{ path: "/register", element: <RegisterMultiSteps /> }],
//     },
//     ...allRoutes,
//   ]);

//   return routes;
// };

// export default Router;

// ** Router imports
import { lazy } from "react";

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils";

// ** GetRoutes
import { getRoutes } from "./routes";

// ** Components
// const navigate = useNavigate();

const Error = lazy(() => import("../views/pages/misc/Error"));
const Login = lazy(() => import("../views/pages/authentication/Login"));
// const Register = lazy(() => import("../views/pages/authentication/Register"));
const RegisterMultiSteps = lazy(() =>
  import("../views/pages/authentication/register-multi-steps")
);
const EmailVerified = lazy(() =>
  import("../views/pages/authentication/VerifyEmailBasic")
);
const ForgotPassword = lazy(() =>
  import("../views/pages/authentication/ForgotPasswordBasic")
);

const ForgotPass = lazy(() =>
  import("../views/pages/authentication/ForgotPassword")
);

const NotAuthorized = lazy(() => import("../views/pages/misc/NotAuthorized"));
const ResetPasswordCover = lazy(() =>
  import("../views/pages/authentication/ResetPasswordCover")
);
const ResetPasswordBasic = lazy(() =>
  import("../views/pages/authentication/ResetPasswordBasic")
);
// const Inquiry = lazy(() => import("../../views/pages/Lead/inquiry"));
// const Inquiry = lazy(() => import("../views/pages/Lead/inquiry"));

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);

  const getHomeRoute = () => {
    // const user = getUserData();
    const user = JSON.parse(secureLocalStorage.getItem("userData"));

    if (user != null) {
      // let userrole = "";
      // if (user.type == 1) {
      //   userrole = "admin";
      // } else if (user.type == 2) {
      //   userrole = "admin";
      // } else {
      //   userrole = "SuperAdmin";
      // }

      let userrole = "";
      if (user.type == 0) {
        userrole = "admin";
      } else {
        userrole = "client";
      }
      // console.log("userrole", userrole);

      return getHomeRouteForLoggedInUser(userrole);
    } else {
      // navigate("/login", { replace: true });
      return "/login";
    }
  };

  let routes;
  if (getHomeRoute() == "/login") {
    routes = useRoutes([
      {
        path: "/",
        index: true,
        element: <Navigate replace to={getHomeRoute()} />,
      },
      // {
      //   path: "/packages",
      //   element: <BlankLayout />,
      //   children: [{ path: "/packages", element: <Packages /> }],
      // },
      // {
      //   path: "/inquiry/:number",
      //   element: <BlankLayout />,
      //   children: [{ path: "/inquiry/:number", element: <Inquiry /> }],
      // },
      {
        path: "/login",
        element: <BlankLayout />,
        children: [{ path: "/login", element: <Login /> }],
      },
      {
        path: "/register",
        element: <BlankLayout />,
        children: [{ path: "/register", element: <RegisterMultiSteps /> }],
      },
      {
        path: "/email-verified/:token",
        element: <BlankLayout />,
        children: [
          { path: "/email-verified/:token", element: <EmailVerified /> },
        ],
      },

      {
        path: "/forgot-password",
        element: <BlankLayout />,
        children: [{ path: "/forgot-password", element: <ForgotPassword /> }],
      },
      {
        path: "/reset-password-cover/:code",
        element: <BlankLayout />,
        children: [
          {
            path: "/reset-password-cover/:code",
            element: <ResetPasswordCover />,
          },
        ],
      },
      {
        path: "/reset-password/:code",
        element: <BlankLayout />,
        children: [
          {
            path: "/reset-password/:code",
            element: <ResetPasswordBasic />,
          },
        ],
      },
      {
        path: "/auth/not-auth",
        element: <BlankLayout />,
        children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
      },
      {
        path: "/*",
        element: <BlankLayout />,
        // children: [{ path: "/*", element: <Login /> }],
        children: [{ path: "*", element: <Error /> }],
        element: <Navigate replace to={"login"} />,
      },
    ]);
  } else {
    routes = useRoutes([
      {
        path: "/",
        index: true,
        element: <Navigate replace to={getHomeRoute()} />,
      },
      {
        path: "/email-verified/:token",
        element: <BlankLayout />,
        children: [
          { path: "/email-verified/:token", element: <EmailVerified /> },
        ],
      },
      {
        path: "/login",
        element: <BlankLayout />,
        children: [{ path: "/login", element: <Login /> }],
      },
      {
        path: "/auth/not-auth",
        element: <BlankLayout />,
        children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
      },
      {
        path: "/*",
        element: <BlankLayout />,
        // children: [{ path: "/*", element: <Login /> }],
        children: [{ path: "*", element: <Error /> }],
        // element: <Navigate replace to={"dashboard"} />,
      },
      ...allRoutes,
    ]);
  }

  return routes;
};

export default Router;
