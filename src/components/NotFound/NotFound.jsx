import { Link, useNavigate } from "react-router";
import { FaHome, FaArrowLeft, FaSearchLocation } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-64 w-64 animate-pulse rounded-full bg-purple-200 opacity-30 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-200 opacity-20 blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="group overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl md:p-12">
            {/* Decorative Top Border */}
            <div className="mb-8 h-2 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50">
                  <FaSearchLocation className="text-4xl text-white" />
                </div>
              </div>
            </div>

            {/* 404 Text with Animation */}
            <div className="mb-6 text-center">
              <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-8xl font-black text-transparent md:text-9xl">
                404
              </h1>
              <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            </div>

            {/* Title */}
            <h2 className="mb-4 text-center text-3xl font-black text-slate-800 md:text-4xl">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="mb-8 text-center text-lg text-slate-600 md:text-xl">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>

            {/* Decorative Dots */}
            <div className="mb-8 flex justify-center gap-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <FaHome className="transition-transform duration-300 group-hover/btn:rotate-12" />
                  Go to Home
                </div>
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="group/btn relative overflow-hidden rounded-2xl border-2 border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 shadow-md transition-all duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <FaArrowLeft className="transition-transform duration-300 group-hover/btn:-translate-x-1" />
                  Go Back
                </div>
              </button>
            </div>

            {/* Bottom Decoration */}
            <div className="mt-8 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 w-8 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 transition-all duration-500 group-hover:from-indigo-500 group-hover:to-purple-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Error Code: <span className="font-bold text-slate-700">404</span> | 
              Lost in cyberspace 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;