import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const IdNotFound = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">Not Found</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h2>
        <p className="text-gray-600 mb-6">{message || "The requested item does not exist."}</p>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <FaHome /> Go to Home
        </Link>
      </div>
    </div>
  );
};

export default IdNotFound;
