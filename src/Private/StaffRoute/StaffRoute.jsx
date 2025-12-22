import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const StaffRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading || loading) {
    return <Loading />;
  }
  if (role !== "staff") {
    return (
      <div className="flex justify-center items-center">
        <p>Forbidden access</p>
      </div>
    );
  }
  return children;
};

export default StaffRoute;