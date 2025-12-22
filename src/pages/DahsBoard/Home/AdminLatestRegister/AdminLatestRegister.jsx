import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const AdminLatestRegister = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.slice(0, 6);
    },
  });

  if (isLoading) return <Loading />;

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30",
      user: "bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30",
      moderator: "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30",
    };
    return colors[role?.toLowerCase()] || "bg-gradient-to-r from-gray-500 to-slate-600";
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 pb-10 md:pb-14">
       <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
              Latest Registered Users
            </h2>
            <div className="mt-1 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Decorative Background Elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 opacity-50 blur-2xl transition-all duration-500 group-hover:scale-150"></div>

            {/* Content Container */}
            <div className="relative flex items-start gap-4">
              {/* Profile Image with Ring */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md"></div>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="relative h-16 w-16 rounded-full object-cover ring-4 ring-white transition-transform duration-500 group-hover:scale-110"
                />
                {/* Online Indicator */}
                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-white bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                {/* Name and Role */}
                <div className="space-y-1">
                  <h3 className="line-clamp-1 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-indigo-600">
                    {user.displayName}
                  </h3>
                  <span
                    className={`inline-block rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-wide text-white transition-transform duration-300 group-hover:scale-105 ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5">
                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100">
                      <svg
                        className="h-3.5 w-3.5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-600">{user.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
                      <svg
                        className="h-3.5 w-3.5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>
                </div>

                {/* Date Badge */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100">
                    <svg
                      className="h-3.5 w-3.5 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      
    </div>
    </div>

  );
};

export default AdminLatestRegister;