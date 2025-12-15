import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const AllIssues = () => {
  const axiosInstance = useAxios();
  const {user}=useAuth()
  const axiosSecure= useAxiosSecure()
  const [searchText,setSearchText] =useState('')
  const [inputValue, setInputValue] = useState("");
   const [page, setPage] = useState(1); // current page
  const limit = 9; // items per page

  const navigate = useNavigate()

  const { data,isLoading,refetch } = useQuery({
    queryKey: ["reports",page,searchText],
    queryFn: async () => {
      // const res = await axiosInstance.get("/reports");
      const res = await axiosInstance.get(`/reports?page=${page}&limit=${limit}&searchText=${searchText}`);
      return res.data;
    },
    keepPreviousData: true,
  });
  if(isLoading){
    return <Loading></Loading>
  }

const reports = data?.result || [];
const totalPages = Math.ceil(data?.totalReports / limit || 1);

  const handleUpVote = (reportId)=>{
    if(!user){
      return navigate('/login')
    }
    axiosSecure.post(`/reports/${reportId}/upVote`)
    .then(() =>{
      refetch()
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your upvote successfully",
  showConfirmButton: false,
  timer: 1500
});
    })
     .catch ((err)=> {
      const message = err.message
      Swal.fire({
  position: "top-end",
  icon: "error",
  title: message,
  showConfirmButton: false,
  timer: 1500
});
  })
  }

  const handleSearch = ()=>{
    setSearchText(inputValue);
  setPage(1); 
  }

  return (
    <div className="my-10 md:my-10">
      <h2 className="text-5xl font-bold  text-center mb-10">All Issues</h2>

<div className="join mb-4 w-full">
  {/* Input field */}
  <input
    type="search"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="Search Issue"
    className="input input-bordered input-md join-item bg-gray-100 border-none focus:outline-none placeholder-gray-500"
  />
  {/* Search button */}
  <button
    onClick={handleSearch}
    className="btn join-item bg-gradient-to-br from-[#6a00f4] to-[#00c6ff] text-white font-semibold hover:opacity-90"
  >
    Search
  </button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div key={report._id} className="card bg-base-100 shadow-sm">
            <figure>
              <img
                src={report.imageURL}
                className="w-full h-40 md:h-60"
                alt="issue"
              />
              <p onClick={()=>handleUpVote(report._id)} className="py-1 pr-3 text-white cursor-pointer bg-gradient-to-br from-[#6a00f4] to-[#00c6ff]  rounded-bl-box text-xl font-medium absolute top-0 right-0">
                👍{report.upVotes || 0}
              </p>
            </figure>
            <div className="p-3">
              <h2 className="card-title capitalize">
                {report.title}
                <div className="badge-dot capitalize">{report.status}</div>
                <div className={`badge badge-outline capitalize ${report.priority === 'high'?"bg-red-500": "bg-green-600" } text-white capitalize p-4`}>{report.priority}</div>
              </h2>
              <p className="pt-2 font-medium">
                <span className="text-xl font-semibold">Category:</span> {report.category}
              </p>
              <p className="font-medium"><span className="text-xl font-semibold">Location: </span>{report.location}</p>
              <div className="card-actions justify-end">
                <Link to={`/view-details/${report._id}`} className="btn btn-glow">View Details</Link>
              </div>
            </div>
      
          </div>
        ))}
      </div>
            {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              page === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
