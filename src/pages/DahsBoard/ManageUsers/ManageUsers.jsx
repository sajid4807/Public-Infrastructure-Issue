import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import { FaUsers, FaShieldAlt, FaCheckCircle, FaBan, FaEnvelope, FaPhone, FaCrown } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  const handleBlockUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This citizen will be blocked and cannot access the system!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, block citizen",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/block/${userId}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Blocked!",
                text: "citizen has been blocked successfully.",
                timer: 1500,
                showConfirmButton: false,
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text:
                error.response?.data?.message ||
                "Failed to block the citizen. Try again.",
            });
          });
      }
    });
  };

  const handleUnBlockUser = (userId) => {
    Swal.fire({
      title: "Unblock citizen?",
      text: "This citizen will regain access.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, unblock",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/unblock/${userId}`).then(() => {
          Swal.fire("Unblocked!", "citizen access restored.", "success");
          refetch();
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  const filteredUsers = users.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  const activeUsers = users.filter(u => !u.isBlocked).length;
  const blockedUsers = users.filter(u => u.isBlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600">
          <div className="flex items-center gap-3 mb-2">
            <FaUsers className="text-3xl text-indigo-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Manage Citizens
            </h2>
          </div>
          <p className="text-sm text-gray-600 ml-11">
            Monitor and manage all registered citizens
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-5 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Citizens</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <FaUsers className="text-4xl opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-5 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Active Users</p>
                <p className="text-3xl font-bold">{activeUsers}</p>
              </div>
              <FaCheckCircle className="text-4xl opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-5 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Blocked Users</p>
                <p className="text-3xl font-bold">{blockedUsers}</p>
              </div>
              <FaBan className="text-4xl opacity-30" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Desktop Table View */}
        {!isMobile && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      SL
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Citizen
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No citizens found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr key={user._id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-200"
                            />
                            <span className="text-sm font-semibold text-gray-900">
                              {user.displayName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaEnvelope className="text-indigo-500" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaPhone className="text-green-500" />
                              {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            <FaCrown className="text-yellow-600" />
                            Subscription Info
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                              <FaBan />
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              <FaCheckCircle />
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {user.isBlocked ? (
                            <button
                              onClick={() => handleUnBlockUser(user._id)}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlockUser(user._id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        {isMobile && (
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                No citizens found.
              </div>
            ) : (
              filteredUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-indigo-500"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="h-14 w-14 rounded-full object-cover ring-4 ring-white"
                        />
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {user.displayName}
                          </h3>
                          <span className="text-xs text-indigo-100 font-medium">
                            Citizen #{index + 1}
                          </span>
                        </div>
                      </div>
                      {user.isBlocked ? (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <FaBan /> Blocked
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <FaCheckCircle /> Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <FaEnvelope className="text-indigo-500 mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm text-gray-800 break-all">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FaPhone className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                        <p className="text-sm text-gray-800">{user.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FaCrown className="text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Subscription</p>
                        <p className="text-sm text-gray-800">Subscription Info</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 p-4">
                    {user.isBlocked ? (
                      <button
                        onClick={() => handleUnBlockUser(user._id)}
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <FaShieldAlt />
                        Unblock Citizen
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <FaBan />
                        Block Citizen
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;