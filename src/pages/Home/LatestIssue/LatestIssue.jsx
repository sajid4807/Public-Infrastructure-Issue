import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const LatestIssue = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["LatestIssue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/report/latest-resolved");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading/>
  }

  return (
    <section className="mt-10 md:mt-20 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-black text-transparent md:text-4xl">
          Latest Resolved Issues
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Successfully completed community reports
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue, index) => (
          <div
            key={issue._id}
            className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={issue.imageURL}
                alt={issue.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Resolved Badge on Image */}
              <div className="absolute right-4 top-4">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  <FaCheckCircle className="animate-pulse" />
                  Resolved
                </div>
              </div>

              {/* Number Badge */}
              <div className="absolute bottom-4 left-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 font-black text-white backdrop-blur-md">
                  {index + 1}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              {/* Title */}
              <h3 className="line-clamp-1 text-xl font-bold capitalize text-slate-900 transition-colors duration-300 group-hover:text-emerald-600">
                {issue.title}
              </h3>

              {/* Category */}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
                  <svg
                    className="h-4 w-4 text-emerald-600"
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
                <p className="line-clamp-2 flex-1 text-sm text-slate-600">
                  {issue.category}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              {/* View Details Button */}
              <Link
                to={`/view-details/${issue._id}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40"
              >
                View Details
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {issues.length === 0 && (
        <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
            <FaCheckCircle className="text-4xl text-slate-400" />
          </div>
          <p className="text-lg font-bold text-slate-600">No resolved issues yet</p>
          <p className="mt-2 text-sm text-slate-400">Resolved issues will appear here</p>
        </div>
      )}

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
    </section>
  );
};

export default LatestIssue;