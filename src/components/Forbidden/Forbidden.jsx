import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = ({ title = "Access Denied", message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <FaLock className="text-red-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {message ||
            "You do not have permission to access this page. Please contact support if you believe this is an error."}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
