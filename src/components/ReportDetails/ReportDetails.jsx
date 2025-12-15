import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ReportDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  // const[searchParms] =useSearchParams()
  const [searchParams] = useSearchParams();
   const sessionId = searchParams.get("session_id");

   

  const { data: issue = {},refetch } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reports/${id}`);
      return res.data;
    },
    refetchOnMount:true
  });
  const formattedDate = new Date(issue.createdAt)
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post("/confirm-boost", { sessionId })
    }
  }, [sessionId,axiosSecure,refetch]);


  const handleReportDelete =()=>{
    Swal.fire({
  title: "Are you sure?",
  text: "This public issue report will be permanently deleted and cannot be recovered.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
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
    });
}
});
  }

  const handleBoost =async()=>{
    const paymentInfo={
      reportId:issue._id,
      email:issue.email
    }
    const res =await axiosSecure.post('create-checkout-session',paymentInfo)
    window.location.href=res.data.url;
      refetch()
  }


  return (
    <div className="max-w-5xl mx-auto my-10">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-5 capitalize tracking-tight">
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
          <span className="px-4 py-1 capitalize rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 inline-block">
            {issue.status}
          </span>
        </div>

        <div className="p-5 rounded-xl bg-base-200 shadow-sm">
          <p className="text-xl mb-1 font-bold">Priority</p>
          <span
            className={`px-4 py-1 rounded-lg text-sm capitalize font-semibold inline-block ${
              issue.priority === "high"
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
    issue.status === 'pending' && issue.email === user?.email && (<Link to={`/edit/${issue._id}`} state={location.pathname} className="btn btn-glow">
    Edit
  </Link>)
  }
  {
    issue.email === user?.email && (<button onClick={handleReportDelete} className="btn btn-glow">
    Delete
  </button>)
  }

  
         {/* BOOST (priority normal + same user) */}
        {issue.priority === "normal" && issue.email === user?.email && (
          <button
            onClick={handleBoost}
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

