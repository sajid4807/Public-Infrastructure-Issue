import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const AdminLatestIssues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latest = [], isLoading } = useQuery({
    queryKey: ["latest-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports/admin");
      return res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="">
      {/* Header */}
        <h2 className="text-2xl mb-4 md:text-3xl font-bold text-gray-800">
          Latest Issues
        </h2>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Image */}
            {issue.imageURL && (
              <img
                src={issue.imageURL}
                alt={issue.title}
                className="w-full h-40 md:h-60"
              />
            )}
            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              {/* Title */}
              <h2 className="card-title capitalize">
                {issue.title}
                <div className="badge-dot capitalize">{issue.status}</div>
                <div className={`badge badge-outline capitalize ${issue.priority === 'high'?"bg-red-500": "bg-green-600" } text-white capitalize p-4`}>{issue.priority}</div>
              </h2>
              <div className="">
                <span className="text-sm font-semibold text-gray-500">
                  Category: {issue.category}
                </span>
              </div>
              <p className="text-sm text-gray-500">Location: {issue.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLatestIssues;
