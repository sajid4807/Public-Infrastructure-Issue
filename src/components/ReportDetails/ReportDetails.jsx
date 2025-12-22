import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import IdNotFound from "../IdNotFound/IdNotFound";

const ReportDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: issue = {}, refetch,isError,isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reports/${id}`);
      return res.data;
    },
    refetchOnMount: true,
  });

  const formattedDate = new Date(issue.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch("/confirm-boost", { sessionId });
    }
  }, [sessionId, axiosSecure]);

  const handleReportDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This public issue report will be permanently deleted and cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reports/${issue._id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your report has been deleted.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            }).then(() => {
              navigate("/all-issue");
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:
                err.response?.data?.message ||
                err.message ||
                "Something went wrong!",
            });
          });
      }
    });
  };

  const handleBoost = async () => {
    try {
      const paymentInfo = {
        reportId: issue._id,
        email: issue.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Failed to create checkout session. Please try again.",
        });
      }

      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      });
    }
  };

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
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Something went wrong!",
        });
      });
  };

  const statusColors = {
    pending: "from-orange-500 to-red-500",
    "in-progress": "from-blue-500 to-cyan-500",
    working: "from-indigo-500 to-purple-500",
    resolved: "from-green-500 to-emerald-500",
    closed: "from-gray-500 to-slate-500",
    rejected: "from-red-500 to-pink-500",
  };

  if(isError) return <IdNotFound/>
if(isLoading) return <Loading/>
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/70 backdrop-blur-xl border border-white/20 hover:bg-white transition-all"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 capitalize">
              {issue.title}
            </h1>
          </div>
          <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
        </div>

        {/* Image Card */}
        <div className="relative group mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={issue.imageURL}
            alt="Issue"
            className="w-full h-[150px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Upvote Button on Image */}
          <button
            onClick={() => handleUpVote(issue._id)}
            className="absolute top-2 md:top-6 right-2 md:right-6 flex items-center gap-1 md:gap-3 bg-white/90 backdrop-blur-sm hover:bg-white px-2 md:px-6 py-0.5 md:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group/vote"
          >
            <span className="text-lg md:text-2xl group-hover/vote:scale-125 transition-transform">👍</span>
            <span className="font-black text-lg md:text-2xl text-indigo-600">{issue.upVotes || 0}</span>
          </button>

          {/* Date Badge */}
          <div className="absolute hidden  bottom-6 left-6 md:flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-slate-800">{formattedDate}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            {
              label: "Category",
              value: issue.category,
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              ),
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              label: "Status",
              value: issue.status,
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ),
              gradient: statusColors[issue.status] || "from-indigo-500 to-purple-500",
              badge: true
            },
            {
              label: "Priority",
              value: issue.priority,
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              ),
              gradient: issue.priority === "high" ? "from-red-500 to-pink-500" : "from-green-500 to-emerald-500",
              badge: true
            },
            {
              label: "Location",
              value: issue.location,
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              ),
              gradient: "from-purple-500 to-pink-500"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative z-10 space-y-3">
                <div className={`inline-flex p-3 bg-gradient-to-br ${item.gradient} rounded-2xl text-white shadow-lg`}>
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">{item.label}</p>
                {item.badge ? (
                  <span className={`inline-block px-4 py-2 bg-gradient-to-r ${item.gradient} text-white font-bold text-sm rounded-xl shadow-lg capitalize`}>
                    {item.value}
                  </span>
                ) : (
                  <h3 className="font-bold text-lg text-slate-800">{item.value}</h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {user &&
              issue.email === user.email &&
              issue.status?.toLowerCase() === "pending" && (
                <Link
                  to={`/edit/${issue._id}`}
                  state={location.pathname}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Issue
                </Link>
              )}

            {user && issue.email === user.email && (
              <button
                onClick={handleReportDelete}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Issue
              </button>
            )}

            {user &&
              issue.email === user.email &&
              issue.status === "pending" &&
              issue.priority === "normal" && (
                <button
                  onClick={handleBoost}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Boost Issue — 100
                </button>
              )}
          </div>
        </div>

        {/* Description Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Description</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>
          </div>
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

export default ReportDetails;