import { Outlet, redirect } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PrivateRoute = ({ requiredRole }) => {
  const { currentUser } = useCurrentUser();
  const userRole = currentUser.user_metadata.role;

  if (userRole === requiredRole) {
    return <Outlet />;
  }
  return redirect("/");
};

export default PrivateRoute;
