import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaMoneyBillWave, FaRocket, FaStar, FaUser, FaFilter, FaCalendar, FaEnvelope } from "react-icons/fa";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const limit = 10;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch paginated payments from backend with category filter
  const { data: paymentsData = {}, isLoading } = useQuery({
    queryKey: ["allPayments", page, filterCategory],
    queryFn: async () => {
      const categoryQuery =
        filterCategory !== "all" ? `&category=${filterCategory}` : "";
      const res = await axiosSecure.get(
        `/admin/payment?page=${page}&limit=${limit}${categoryQuery}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;

  const { payments = [], total = 0, totalPages = 1 } = paymentsData;

  // Summary stats
  const boostCount = payments.filter((p) => p.Category === "boost").length;
  const subCount = payments.filter((p) => p.Category === "subscription").length;
  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-600">
          <div className="flex items-center gap-3 mb-2">
            <FaMoneyBillWave className="text-3xl text-emerald-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Payment Analytics</h2>
          </div>
          <p className="text-sm text-gray-600 ml-11">
            Track and monitor all payment transactions in real-time
          </p>
        </div>

        {/* Summary Cards with Unique Design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Amount Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <FaMoneyBillWave className="text-2xl" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                  BDT
                </div>
              </div>
              <p className="text-emerald-100 text-sm font-medium mb-1">Total Revenue</p>
              <p className="text-3xl font-bold mb-1">৳{totalAmount.toLocaleString()}</p>
              <p className="text-emerald-100 text-xs">From all transactions</p>
            </div>
          </div>

          {/* Boost Payments Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <FaRocket className="text-2xl" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                  BOOST
                </div>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Boost Payments</p>
              <p className="text-3xl font-bold mb-1">{boostCount}</p>
              <p className="text-blue-100 text-xs">Active boost services</p>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <FaStar className="text-2xl" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                  PREMIUM
                </div>
              </div>
              <p className="text-purple-100 text-sm font-medium mb-1">Subscriptions</p>
              <p className="text-3xl font-bold mb-1">{subCount}</p>
              <p className="text-purple-100 text-xs">Active subscribers</p>
            </div>
          </div>
        </div>

        {/* Filter and Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <FaFilter className="text-emerald-600" />
                <span className="text-sm sm:text-base">Filter Category:</span>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setPage(1);
                }}
                className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-h-[44px] font-medium"
              >
                <option value="all">🎯 All Categories</option>
                <option value="boost">🚀 Boost Only</option>
                <option value="subscription">🌟 Subscription Only</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 rounded-xl">
              <span className="text-gray-600 text-sm">Showing</span>
              <span className="font-bold text-emerald-600">{payments.length}</span>
              <span className="text-gray-600 text-sm">of</span>
              <span className="font-bold text-emerald-600">{total}</span>
              <span className="text-gray-600 text-sm">payments</span>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        {!isMobile && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                          <FaMoneyBillWave className="text-5xl text-gray-300" />
                          <p className="text-lg font-semibold">No payments found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment, index) => (
                      <tr key={payment._id} className="hover:bg-emerald-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                            {(page - 1) * limit + index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {payment.photoURL ? (
                              <img
                                src={payment.photoURL}
                                alt="user"
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-200"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                <FaUser className="text-white" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-bold text-gray-900">
                                {payment.displayName || "Anonymous"}
                              </p>
                              <p className="text-xs text-gray-500">Customer</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaEnvelope className="text-emerald-500" />
                            <span>{payment.email || "-"}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-900">
                              ৳{payment.amount?.toLocaleString() || 0}
                            </span>
                            <span className="text-xs text-gray-500 uppercase">{payment.currency}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.Category === "boost" ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                              <FaRocket /> Boost
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md">
                              <FaStar /> Premium
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCalendar className="text-emerald-500" />
                            <span>{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "-"}</span>
                          </div>
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
            {payments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <FaMoneyBillWave className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold">No payments found</p>
              </div>
            ) : (
              payments.map((payment, index) => (
                <div
                  key={payment._id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Card Header with Gradient */}
                  <div className={`p-5 ${payment.Category === "boost" 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600" 
                    : "bg-gradient-to-r from-purple-500 to-pink-600"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {payment.photoURL ? (
                          <img
                            src={payment.photoURL}
                            alt="user"
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-white flex-shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                            <FaUser className="text-white text-xl" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">
                            {payment.displayName || "Anonymous"}
                          </p>
                          <p className="text-xs text-white/80 truncate flex items-center gap-1">
                            <FaEnvelope className="flex-shrink-0" />
                            {payment.email || "-"}
                          </p>
                        </div>
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2">
                        #{(page - 1) * limit + index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* Amount Display */}
                    <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Payment Amount</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ৳{payment.amount?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow">
                        <FaMoneyBillWave className="text-2xl text-emerald-600" />
                      </div>
                    </div>

                    {/* Details Row */}
                    <div className="flex items-center justify-between">
                      {payment.Category === "boost" ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                          <FaRocket /> Boost Service
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md">
                          <FaStar /> Premium Plan
                        </span>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <FaCalendar className="text-emerald-600" />
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 py-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] transition-all shadow-sm"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all shadow-sm ${
                    page === pageNum
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-110"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-500"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;