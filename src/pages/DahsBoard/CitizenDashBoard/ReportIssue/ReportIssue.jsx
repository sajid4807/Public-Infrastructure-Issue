import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import { FaExclamationTriangle, FaHeading, FaTag, FaImage, FaMapMarkerAlt, FaAlignLeft, FaPaperPlane, FaCrown, FaBan } from "react-icons/fa";

const ReportIssue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userStatus = {}, isLoading } = useQuery({
    queryKey: ['user-status'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user/status');
      return res.data;
    }
  });

  const { data: issueCountData = { count: 0 } } = useQuery({
    queryKey: ['my-issue-count'],
    queryFn: async () => {
      if (userStatus.isPremium) return { count: 0 };
      const res = await axiosSecure.get('/my-reports/count');
      return res.data;
    },
  });

  const isBlocked = userStatus?.isBlocked;
  const isLimitReached = !userStatus?.isPremium && issueCountData.count >= 3;

  const handleIssueSubmit = (data) => {
    if (isLimitReached) return;
    const reportImg = data.image[0];
    const formData = new FormData();
    formData.append("image", reportImg);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      )
      .then((res) => {
        const imageURL = res.data.data.url;
        delete data.image;
        delete data.imageURL;
        const reportInfo = {
          ...data,
          email: user.email,
          imageURL: imageURL,
          status: "pending",
          priority: "normal",
          createdAt: new Date(),
        };

        axiosSecure
          .post("/reports", reportInfo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Report Has Been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/citizen-report");
            reset();
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
      });
  };

  if (isLoading) return <Loading />;

  const categories = [
    { value: "Road", icon: "🛣️", color: "from-blue-500 to-cyan-500" },
    { value: "Drainage", icon: "💧", color: "from-cyan-500 to-teal-500" },
    { value: "Streetlights", icon: "💡", color: "from-yellow-500 to-orange-500" },
    { value: "Water", icon: "🚰", color: "from-blue-400 to-blue-600" },
    { value: "Garbage", icon: "🗑️", color: "from-green-500 to-emerald-500" },
    { value: "Footpaths", icon: "🚶", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <section className="relative py-5 md:py-14 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full  md:mb-4">
            <FaExclamationTriangle className="text-red-600 animate-pulse" />
            <span className="text-red-700 font-semibold text-xs uppercase tracking-wide">
              New Report
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 md:mb-4">
            Report Public Issue
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Help improve your community by reporting infrastructure problems
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-full mx-auto mt-2 md:mt-4"></div>
        </div>

        {/* Blocked Warning */}
        {isBlocked && (
          <div 
            className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-3
             md:p-6 mb-8 shadow-xl border-2 border-red-300"
            style={{ animation: 'shake 0.5s ease-out' }}
          >
            <div className="flex items-start gap-2 md:gap-4 text-white">
              <div className="flex-shrink-0 w-8 md:w-12 h-8 md:h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <FaBan className="text-xl md:text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-medium md:font-bold md:mb-2">Account Blocked</h3>
                <p className="text-white/90">
                  ⚠️ You are blocked by admin. Please contact authorities for more information.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Usage Stats Card - For Free Users */}
        {!userStatus.isPremium && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-3 md:p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Free Plan Limit</h3>
                  <p className="text-slate-600 text-sm">
                    {issueCountData.count} of 3 reports used this month
                  </p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="flex-1 min-w-[200px]">
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
                    style={{ width: `${(issueCountData.count / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div 
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border-2 border-white/50 overflow-hidden"
          style={{ animation: 'fadeInUp 0.6s ease-out' }}
        >
          {/* Form Header Accent */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(handleIssueSubmit)} className="p-4 md:p-10 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <FaHeading className="text-red-600" />
                Issue Title
              </label>
              <input
                type="text"
                name="title"
                {...register("title", { required: true })}
                placeholder="Enter a clear, descriptive title"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
              />
              {errors.title?.type === "required" && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  Title is required
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <FaTag className="text-orange-600" />
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
                {...register("category", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.value}
                  </option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  Category is required
                </p>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <FaImage className="text-purple-600" />
                Upload Image
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-red-600 file:to-orange-600 file:text-white hover:file:scale-105 file:transition-transform file:cursor-pointer"
                placeholder="Photo"
              />
              {errors.image?.type === "required" && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  Image is required
                </p>
              )}
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <FaMapMarkerAlt className="text-green-600" />
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Area, Street, Landmark"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                {...register("location", { required: true })}
              />
              {errors.location?.type === "required" && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  Location is required
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <FaAlignLeft className="text-blue-600" />
                Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none"
                placeholder="Provide detailed information about the issue..."
                rows="5"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  Description is required
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            {!userStatus.isPremium && isLimitReached ? (
              <div className="space-y-1 md:space-y-3">
                <button 
                  disabled 
                  className="w-full bg-slate-300 text-slate-500 font-medium md:font-bold py-2 md:py-4 rounded-xl cursor-not-allowed opacity-80"
                >
                  Issue Limit Reached
                </button>
                <button 
                  type="button"
                  onClick={() => navigate("/dashboard/citizen-profile")} 
                  className="group w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold cursor-pointer py-2 md:py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaCrown className="transform group-hover:rotate-12 transition-transform duration-300" />
                  <span>Upgrade to Premium</span>
                </button>
              </div>
            ) : (
              <button 
                type="submit"
                className="group w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white font-bold py-2 md:py-4 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <span>Submit Issue Report</span>
              </button>
            )}
          </form>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
        </div>

        {/* Info Card */}
        <div className="mt-4 md:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-2 md:p-6 text-center">
          <p className="text-slate-600 text-sm">
            💡 <strong>Tip:</strong> Add clear photos and detailed descriptions to help authorities address the issue faster.
          </p>
        </div>

        {/* Bottom decorative dots */}
        <div className="flex justify-center mt-4 md:mt-8 gap-2">
          <div className="h-2 w-2 rounded-full bg-red-400 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </section>
  );
};

export default ReportIssue;