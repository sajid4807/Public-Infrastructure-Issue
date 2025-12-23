const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-64 w-64 animate-pulse rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-200 opacity-30 blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Loading Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Spinner Container */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-4 animate-spin rounded-full border-4 border-transparent border-t-indigo-400 border-r-blue-400" style={{ animationDuration: '2s' }}></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <svg className="h-4 w-4 animate-pulse text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bouncing Dots */}
        <div className="flex space-x-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/50"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/50" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="mb-2 animate-pulse bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-2xl font-black text-transparent">
            Loading...
          </p>
          <p className="text-sm text-slate-500">Please wait while we prepare your content</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 overflow-hidden rounded-full bg-slate-200">
          <div className="h-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{
            animation: 'loadingBar 2s ease-in-out infinite'
          }}></div>
        </div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0%, 100% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 100%;
            margin-left: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;