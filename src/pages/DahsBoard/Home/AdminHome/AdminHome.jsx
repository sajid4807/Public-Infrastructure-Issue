import { useQuery } from "@tanstack/react-query";
import { FaBug, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon: Icon, gradient }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform hover:-translate-y-1 ${gradient}`}
    >
      <div className="absolute right-4 top-4 opacity-20">
        <Icon size={60} />
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-white/20 p-3">
          <Icon size={28} />
        </div>
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-3xl font-bold">{value ?? 0}</h3>
        </div>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  /* ================= CHART DATA ================= */
  const chartData = [
    { name: "Pending", value: stats.pending || 0 },
    { name: "Resolved", value: stats.resolved || 0 },
    { name: "Rejected", value: stats.rejected || 0 },
  ];

  const COLORS = ["#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="space-y-10 mb-10 md:mb-14">

      {/* ================= HEADER ================= */}
      <div className="mt-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-1">
          Overview of system activity & issue status
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={stats.totalIssues}
          icon={FaBug}
          gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
        />

        <StatCard
          title="Pending Issues"
          value={stats.pending}
          icon={FaClock}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
        />

        <StatCard
          title="Resolved Issues"
          value={stats.resolved}
          icon={FaCheckCircle}
          gradient="bg-gradient-to-br from-emerald-500 to-green-600"
        />

        <StatCard
          title="Rejected Issues"
          value={stats.rejected}
          icon={FaTimesCircle}
          gradient="bg-gradient-to-br from-rose-500 to-red-600"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="rounded-2xl bg-white p-5 shadow-md border">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Issue Overview (Bar Chart)
          </h3>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            {/* <ResponsiveContainer width="100%" aspect={2}> */}
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="rounded-2xl bg-white p-5 shadow-md border">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Issue Distribution (Pie Chart)
          </h3>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
