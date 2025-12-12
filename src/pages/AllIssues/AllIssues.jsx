import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const AllIssues = () => {
  const axiosInstance = useAxios();

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reports");
      return res.data;
    },
  });
  // console.log(reports);

  return (
    <div className="my-10 md:my-10">
      <h2 className="text-5xl font-bold text-center mb-10">All Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div key={report._id} className="card bg-base-100 shadow-sm">
            <figure>
              <img
                src={report.imageURL}
                className="w-full h-40 md:h-60"
                alt="issue"
              />
            </figure>
            <div className="p-3">
              <h2 className="card-title">
                {report.title}
                <div className="badge-dot capitalize">{report.status}</div>
                <div className="badge badge-outline p-4">{report.priority}</div>
              </h2>
              <p className="pt-2">
                {report.category}
              </p>
              <p>{report.location}</p>
              <div className="card-actions justify-end">
                <Link to={`/view-details/${report._id}`} className="btn btn-glow">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
