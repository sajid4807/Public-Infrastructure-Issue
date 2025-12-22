import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { useState } from "react";

const AdminLatestIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [hoveredCard, setHoveredCard] = useState(null);

  const { data: latest = [], isLoading } = useQuery({
    queryKey: ["latest-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/latest-issues");
      return res.data
    }
  });


  if (isLoading) return <Loading />;

  const getStatusColor = (status) => {
    const colors = {
      pending: "from-amber-400 to-orange-500",
      resolved: "from-emerald-400 to-green-500",
      rejected: "from-rose-400 to-red-500",
    };
    return colors[status?.toLowerCase()] || "from-gray-400 to-gray-500";
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      high: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30",
      medium: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30",
      low: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/30",
    };
    return styles[priority?.toLowerCase()] || "bg-gradient-to-r from-gray-500 to-slate-600 text-white";
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 pb-10 md:pb-14">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute -left-2 top-0 h-12 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
          Latest Issues
        </h2>
        <div className="mt-2 flex mb-6 items-center gap-2">
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <p className="text-sm text-slate-500">Recently reported incidents</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((issue, index) => (
          <div
            key={issue._id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            onMouseEnter={() => setHoveredCard(issue._id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Decorative Corner Accent */}
            <div className="absolute right-0 top-0 opacity-20">
              <div className="absolute right-0 top-0 h-full w-full rounded-bl-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            </div>

            {/* Image Container */}
            {issue.imageURL && (
              <div className="relative h-40 overflow-hidden md:h-60">
                <img
                  src={issue.imageURL}
                  alt={issue.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Priority Badge on Image */}
                <div className="absolute right-4 top-4">
                  <div
                    className={`rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${getPriorityStyle(
                      issue.priority
                    )}`}
                  >
                    {issue.priority}
                  </div>
                </div>

                {/* Status Badge on Image */}
                <div className="absolute left-4 top-4">
                  <div
                    className={`flex items-center gap-2 rounded-2xl bg-gradient-to-r ${getStatusColor(
                      issue.status
                    )} px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm`}
                  >
                    <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                    {issue.status}
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="relative space-y-4 px-6 py-3">
              {/* Title */}
              <h3 className="line-clamp-2 text-xl font-bold capitalize text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                {issue.title}
              </h3>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              {/* Info Grid */}
              <div className="space-y-2">
                {/* Category */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
                    <svg
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500">Category</p>
                    <p className="font-semibold capitalize text-slate-700">
                      {issue.category}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500">Location</p>
                    <p className="font-semibold text-slate-700">{issue.location}</p>
                  </div>
                </div>
              </div>

              {/* Hover Indicator */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ${
                  hoveredCard === issue._id ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
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

export default AdminLatestIssues;