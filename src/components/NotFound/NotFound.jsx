import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-40 animate-pulse -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-40 animate-pulse-right -bottom-10 -right-10"></div>

      <div className="text-center relative z-10">
        <h1 className="text-8xl font-extrabold animate-bounce mb-4 text-purple-400 drop-shadow-lg">
          404
        </h1>

        <p className="text-xl mb-6 opacity-90">
          Oops! The page you're looking for is missing 😔  
        </p>

        {/* Animation: Floating Icon */}
        <div className="mb-6 animate-floating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.3"
            stroke="currentColor"
            className="w-24 h-24 text-blue-300 drop-shadow-xl"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20m10-10H2"
            />
          </svg>
        </div>

        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-medium shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
