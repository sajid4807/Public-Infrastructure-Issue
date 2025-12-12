// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useParams } from "react-router";

// const ReportDetails = () => {
//   const { id } = useParams();
//   const axiosInstance = useAxiosSecure();
//   const { data: issue = {} } = useQuery({
//     queryKey: ["issues", id],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/reports/${id}`);
//       return res.data;
//     },
//   });

//   const date = new Date(issue.createdAt);
// const formattedDate = date.toLocaleDateString("en-GB", {
//   day: "2-digit",
//   month: "short",
//   year: "numeric"
// });

//   // console.log(issues)

//   return (
//     <div className="my-10 md:my-20">
//       <div>
//         <div>
//           <img src={issue.imageURL} className="mx-auto w-1/2 mb-5" alt="" />
//         </div>
//         <div>
//           <h1 className="text-4xl font-bold capitalize">{issue.title}
//                 <p className="badge bg-[#e0fce4] border-[#97e3a4] text-[#158431] py-4 px-3 ml-3">{issue.status}</p>
//           </h1>
//           <div className="my-2">
//             <p className="text-xl mt-1 font-bold">Category: {issue.category}</p>
//             <p className="text-xl mt-1 font-bold">Location: {issue.location}</p>
//           </div>
//             <p className="text-xl">{issue.description}</p>
//             <div className="mt-5">
//                 {
//                   issue.status === 'pending' && (<button className="btn btn-glow me-5">Edit</button>) 
//                 }
//                 <button className="btn btn-glow ">Delete</button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportDetails;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const ReportDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()

  const { data: issue = {} } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reports/${id}`);
      return res.data;
    },
  });
  const formattedDate = new Date(issue.createdAt)
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const handleEditReport =()=>{
    axiosSecure.patch
    // console.log('clicked')
  }

  // if (isLoading) return <p className="text-center py-20 text-xl">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto my-10">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-5 tracking-tight">
        {issue.title}
      </h1>

      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-8">
        <img
          src={issue.imageURL}
          alt="Issue"
          className="w-full mx-auto h-[280px] md:h-[420px] "
        />
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
        <div className="p-5 rounded-xl bg-base-200 shadow-sm">
          <p className="text-xl font-bold">Category</p>
          <h3 className="font-semibold text-lg">{issue.category}</h3>
        </div>

        <div className="p-5 rounded-xl bg-base-200 shadow-sm">
          <p className="text-xl mb-1 font-bold">Status</p>
          <span className="px-4 py-1 capitalize rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 inline-block">
            {issue.status}
          </span>
        </div>

        <div className="p-5 rounded-xl bg-base-200 shadow-sm">
          <p className="text-xl mb-1 font-bold">Priority</p>
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold inline-block ${
              issue.priority === "High"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {issue.priority}
          </span>
        </div>

        <div className="p-5 rounded-xl bg-base-200 shadow-sm">
          <p className="text-xl font-bold">Location</p>
          <h3 className="font-semibold text-lg">{issue.location}</h3>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
  {
    issue.status === 'pending' && (<button onClick={handleEditReport} className="btn btn-glow">
    Edit
  </button>)
  }

  <button className="btn btn-glow">
    Delete
  </button>

 {/* BOOST (priority normal + same user) */}
        {issue.priority === "Normal" && (
          <button
            // onClick={handleBoost}
            className="btn bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg"
          >
            Boost Issue — 100
          </button>
        )}

  <p className="text-xl font-bold flex-end">Report-Date: {formattedDate}</p>

</div>

      {/* DESCRIPTION */}
      <div className="p-6 bg-base-100 border rounded-xl shadow-md leading-relaxed">
        <h2 className="text-2xl font-bold mb-3">Description</h2>
        <p className="text-base opacity-90">{issue.description}</p>
      </div>




    </div>
  );
};

export default ReportDetails;

