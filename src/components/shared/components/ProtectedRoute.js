import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  let auth =
    (localStorage.getItem("Token")?.length > 0) &
    (localStorage.getItem("roles") === "USER");
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
