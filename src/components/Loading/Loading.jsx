
const Loading = () => {
    return (
         <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>

      <p className="text-lg font-semibold text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;



//  <div className="flex flex-col items-center justify-center h-screen gap-4">
//       {/* Spinner */}
//       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

//       {/* Text */}
//       <p className="text-lg font-semibold text-gray-600 animate-pulse">
//         Loading...
//       </p>
//     </div>