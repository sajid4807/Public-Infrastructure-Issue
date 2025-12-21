import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../../../../../components/Loading/Loading";

/* ---------------- Animated Count Hook ---------------- */
const useCountUp = (end, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end == null) return;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

/* ---------------- Stat Card ---------------- */
const StatCard = ({ title, value, icon, gradient }) => {
  const animatedValue = useCountUp(value || 0);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition hover:-translate-y-1 ${gradient}`}
    >
      <div className="relative z-10">
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="mt-2 text-4xl font-extrabold">
          {animatedValue}
        </h2>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl text-white/20">
        {icon}
      </div>
    </div>
  );
};

/* ---------------- Chart Card (Improved UI) ---------------- */
const ChartCard = ({ title, children }) => (
  <div
    className="
      rounded-2xl
      bg-white
      p-6
      border border-black
      shadow-sm
      transition
      hover:shadow-lg
      hover:border-indigo-300
    "
  >
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-700">
        {title}
      </h2>
      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
    </div>

    <div className="rounded-xl bg-gray-50 p-2">
      {children}
    </div>
  </div>
);

/* ---------------- Main Component ---------------- */
const CitizenHomeStat = () => {
  const axiosSecure = useAxiosSecure();

  const { data: citizen = {}, isLoading } = useQuery({
    queryKey: ["citizen-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizen/stats");
      return res.data;
    },
  });

  const { data: userStatus = {} } = useQuery({
    queryKey: ["userStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/status");
      return res.data;
    },
  });

  const isBlocked = userStatus?.isBlocked;
  const isPremium = userStatus?.isPremium;


//   const { data: paymentsData = {}, } = useQuery({
//   queryKey: ["citizen-payments", citizen._id],
//   queryFn: async () => {
//     if (!citizen._id) return { payments: [], totalAmount: 0 };
//     const res = await axiosSecure.get(`/payments/citizen/${citizen._id}`);
//     return res.data;
//   },
//   enabled: !!citizen._id,
// });


  /* ----------- Stats ----------- */
  const stats = [
    {
      title: "Total Issues",
      value: citizen.totalIssues,
      icon: <FaClipboardList />,
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "Pending Issues",
      value: citizen.pending,
      icon: <FaHourglassHalf />,
      gradient: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
    {
      title: "In Progress",
      value: citizen.inProgress,
      icon: <FaSyncAlt />,
      gradient: "bg-gradient-to-r from-sky-400 to-sky-600",
    },
    {
      title: "Resolved Issues",
      value: citizen.resolved,
      icon: <FaCheckCircle />,
      gradient: "bg-gradient-to-r from-green-400 to-emerald-600",
    },
    {
      title: "Rejected Issues",
      value: citizen.rejected,
      icon: <FaTimesCircle />,
      gradient: "bg-gradient-to-r from-pink-500 to-red-600",
    },
     {
    title: "Total Payments",
    // value: paymentsData.totalAmount || 0,
    icon: <FaCheckCircle />,
    gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  ];

  /* ----------- Chart Data ----------- */
  const statusData = [
    { name: "Pending", value: citizen.pending || 0 },
    { name: "In Progress", value: citizen.inProgress || 0 },
    { name: "Resolved", value: citizen.resolved || 0 },
    { name: "Rejected", value: citizen.rejected || 0 },
  ];

  const COLORS = ["#fb923c", "#38bdf8", "#22c55e", "#ef4444"];

  /* ----------- Loading ----------- */
  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="space-y-10 my-8 md:my-10">
      {isBlocked && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-6 shadow-sm">
          ⚠️ You are blocked by admin. Contact authorities.
        </div>
      )}
      {/* Header */}
      <div>
        <h1 className="text-2xl flex items-center font-bold text-gray-800">
          Dashboard
           {isPremium && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold ml-2">
              🌟 Premium
            </span>)}
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your reported issues
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <hr className="border-dashed border-gray-200" />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <ChartCard title="Issue Status Overview">
          {statusData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </ChartCard>

        {/* Monthly Bar Chart */}
        <ChartCard title="Monthly Issue Submission">
          {citizen.monthlyChart?.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={citizen.monthlyChart}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-gray-400">
              No monthly data
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
};

export default CitizenHomeStat;
