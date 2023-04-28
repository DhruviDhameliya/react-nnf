// ** React Imports
import { Navigate } from "react-router-dom";
import { useContext, Suspense } from "react";
import secureLocalStorage from "react-secure-storage";
// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext);
  const user = JSON.parse(secureLocalStorage.getItem("userData"));

  if (route) {
    let action = null;
    let resource = null;
    let restrictedRoute = false;

    if (route.meta) {
      action = route.meta.action;
      resource = route.meta.resource;
      restrictedRoute = route.meta.restricted;
    }
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user && restrictedRoute) {
      return <Navigate to="/" />;
    }
    if (user && restrictedRoute && user.role === "client") {
      return <Navigate to="/access-control" />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PrivateRoute;
