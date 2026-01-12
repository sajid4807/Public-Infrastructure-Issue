import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import Home from "../../pages/Home/Home/Home";

const HomeWrapper = () => {
  const { role } = useRole();

  // If staff, redirect to staff dashboard
  if (role === "staff") {
    return <Navigate to="/dashboard/staff-home" replace />;
  }

  return <Home />;
};

export default HomeWrapper;
