import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  let auth = localStorage.getItem("Token");
  const userValidator = localStorage.getItem("roles") === "ADMIN";
  return (
    <Route {...rest}>
      {auth && userValidator ? <Navigate to="/login" /> : children}
    </Route>
  );
};

export default ProtectedRoute;
