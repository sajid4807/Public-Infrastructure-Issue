import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const AllIssues = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reports", page, searchText, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        searchText,
      });

      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.category) params.append("category", filters.category);

      const res = await axiosInstance.get(`/reports?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const reports = data?.result || [];
  const totalPages = Math.ceil(data?.totalReports / limit || 1);

  const handleUpVote = (reportId) => {
    if (!user) {
      return navigate("/login");
    }
    axiosSecure
      .post(`/reports/${reportId}/upVote`)
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your upvote successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        const message = err.message;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleSearch = () => {
    setSearchText(inputValue);
    setPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  const statusColors = {
    pending: "bg-orange-100 text-orange-700 border-orange-300",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-300",
    resolved: "bg-green-100 text-green-700 border-green-300",
    closed: "bg-gray-100 text-gray-700 border-gray-300",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            All Issues
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse and track public infrastructure issues reported by citizens
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search by title, location, or description..."
                className="w-full px-6 py-4 bg-white border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 text-slate-700 shadow-sm transition-all"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Status
              </label>
              <select
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 cursor-pointer transition-all"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Priority
              </label>
              <select
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 cursor-pointer transition-all"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Category
              </label>
              <select
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-slate-700 cursor-pointer transition-all"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Category</option>
                <option value="Road">Road</option>
                <option value="Drainage">Drainage</option>
                <option value="Streetlights">Streetlights</option>
                <option value="Water">Water</option>
                <option value="Garbage">Garbage</option>
                <option value="Footpaths">Footpaths</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reports.map((report, idx) => (
            <div
              key={report._id}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={report.imageURL}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="issue"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Upvote Button */}
                <button
                  onClick={() => handleUpVote(report._id)}
                  className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group/vote"
                >
                  <span className="text-xl group-hover/vote:scale-125 transition-transform">👍</span>
                  <span className="font-bold text-indigo-600">{report.upVotes || 0}</span>
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-700 shadow-lg">
                    {report.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title and Badges */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {report.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[report.status] || statusColors.pending}`}>
                      {report.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.priority === "high"
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}>
                      {report.priority} priority
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-slate-600">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium line-clamp-2">{report.location}</span>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/view-details/${report._id}`}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-xl border border-white/20 text-slate-700 font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  page === idx + 1
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110"
                    : "bg-white/70 backdrop-blur-xl border border-white/20 text-slate-700 hover:bg-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-xl border border-white/20 text-slate-700 font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllIssues;