import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AuthRoute = ({ children, redirectTo }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to={redirectTo} /> : children;
};

export default AuthRoute;
