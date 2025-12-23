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
      className={`group relative overflow-hidden rounded-3xl p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${gradient}`}
    >
      {/* Animated background blob */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-2xl">{icon}</div>
          </div>
          <div className="text-5xl opacity-20 transition-opacity duration-300 group-hover:opacity-30">
            {icon}
          </div>
        </div>
        
        <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
        <h2 className="text-5xl font-black tracking-tight">
          {animatedValue}
        </h2>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
    </div>
  );
};

/* ---------------- Chart Card ---------------- */
const ChartCard = ({ title, children }) => (
  <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:border-indigo-200">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {title}
        </h2>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse delay-75"></span>
          <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse delay-150"></span>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 p-4">
        {children}
      </div>
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

  /* ----------- Stats ----------- */
  const stats = [
    {
      title: "Total Issues",
      value: citizen.totalIssues,
      icon: <FaClipboardList />,
      gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600",
    },
    {
      title: "Pending Issues",
      value: citizen.pending,
      icon: <FaHourglassHalf />,
      gradient: "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600",
    },
    {
      title: "In Progress",
      value: citizen.inProgress,
      icon: <FaSyncAlt />,
      gradient: "bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600",
    },
    {
      title: "Resolved Issues",
      value: citizen.resolved,
      icon: <FaCheckCircle />,
      gradient: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
    },
    {
      title: "Rejected Issues",
      value: citizen.rejected,
      icon: <FaTimesCircle />,
      gradient: "bg-gradient-to-br from-pink-500 via-pink-600 to-red-600",
    },
    {
      title: "Total Payments",
      value: 0,
      icon: <FaCheckCircle />,
      gradient: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
    },
  ];

  /* ----------- Chart Data ----------- */
  const statusData = [
    { name: "Pending", value: citizen.pending || 0 },
    { name: "In Progress", value: citizen.inProgress || 0 },
    { name: "Resolved", value: citizen.closed || 0 },
    { name: "Rejected", value: citizen.rejected || 0 },
  ];

  const COLORS = ["#fb923c", "#38bdf8", "#22c55e", "#ef4444"];

  /* ----------- Loading ----------- */
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Blocked Warning */}
        {isBlocked && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 shadow-xl animate-pulse">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-red-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Account Blocked</h3>
                <p className="text-red-700">You are blocked by admin. Please contact authorities for assistance.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Dashboard
            </h1>
            {isPremium && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full shadow-lg animate-bounce">
                <span className="text-xl">🌟</span>
                <span className="text-sm font-bold text-white">Premium</span>
              </div>
            )}
          </div>
          <p className="text-lg text-slate-600">
            Overview of your reported issues and activity
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-indigo-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 px-6 text-lg font-semibold text-indigo-600">
              Analytics
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Pie Chart */}
          <div style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
            <ChartCard title="Issue Status Overview">
              {statusData.some((d) => d.value > 0) ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                      animationDuration={800}
                    >
                      {statusData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[320px] flex-col items-center justify-center text-slate-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-lg font-medium">No data available</p>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Monthly Bar Chart */}
          <div style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
            <ChartCard title="Monthly Issue Submission">
              {citizen.monthlyChart?.length ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={citizen.monthlyChart}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                      cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#colorGradient)"
                      radius={[12, 12, 0, 0]}
                      animationDuration={800}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[320px] flex-col items-center justify-center text-slate-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">No monthly data</p>
                </div>
              )}
            </ChartCard>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CitizenHomeStat;