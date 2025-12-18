import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";


const AdminLatestRegister = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data
        .slice(0, 6);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="my-10 md:my-14">
      {/* Header */}
        <h2 className="text-2xl mb-4 md:text-3xl font-bold text-gray-800">
          Latest Registered Users
        </h2>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-4 flex-1 flex flex-col gap-1">
              <h3 className="text-gray-800 font-semibold text-lg line-clamp-1">
                {user.displayName}
                <span
                  className={`text-xs font-semibold px-2 py-1 ms-3 bg-gray-400 text-white rounded-lg`}
                >
                  {user.role}
                </span>
              </h3>
              <p className="text-gray-500 text-sm line-clamp-1">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.phone}</p>

              <div className="flex items-center justify-between mt-2">
                {/* Role Badge */}
                

                {/* Registration Date */}
                <span className="text-xs text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLatestRegister;
