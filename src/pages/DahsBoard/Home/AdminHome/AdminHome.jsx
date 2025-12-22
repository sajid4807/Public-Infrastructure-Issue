import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

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

/* ================= Animated Number Hook ================= */
const useCountUp = (end, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end == null) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon: Icon, gradient, delay = 0 }) => {
  const animatedValue = useCountUp(value);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white blur-2xl"></div>
      </div>

      {/* Large Background Icon */}
      <div className="absolute -right-6 -top-6 opacity-10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
        <Icon size={120} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/35">
            <Icon className="text-white" size={28} />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium uppercase tracking-wider text-white/90">
            {title}
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">
            {title.includes("Payment") ? `$${animatedValue.toLocaleString()}` : animatedValue}
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white/60 transition-all duration-1000 ease-out"
            style={{ width: isVisible ? "100%" : "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

/* ================= ADMIN HOME ================= */
const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const { data: paymentData = {} } = useQuery({
    queryKey: ["total-payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/total-payment");
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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-10 md:pb-14">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="pt-8">
          <div className="relative">
            <div className="absolute -left-4 top-0 h-16 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Real-time insights & system analytics
            </p>
          </div>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatCard
            title="Total Issues"
            value={stats.totalIssues}
            icon={FaClipboardList}
            gradient="from-indigo-500 via-purple-500 to-pink-500"
            delay={0}
          />

          <StatCard
            title="Pending Issues"
            value={stats.pending}
            icon={FaClock}
            gradient="from-amber-500 via-orange-500 to-red-500"
            delay={100}
          />

          <StatCard
            title="Resolved Issues"
            value={stats.resolved}
            icon={FaCheckCircle}
            gradient="from-emerald-500 via-teal-500 to-cyan-500"
            delay={200}
          />

          <StatCard
            title="Rejected Issues"
            value={stats.rejected}
            icon={FaTimesCircle}
            gradient="from-rose-500 via-pink-500 to-fuchsia-500"
            delay={300}
          />

          <StatCard
            title="Total Payment"
            value={paymentData.totalPaymentAmount || 0}
            icon={FaMoneyBillWave}
            gradient="from-cyan-500 via-blue-500 to-indigo-500"
            delay={400}
          />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* BAR CHART */}
          <div className="group overflow-hidden rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <h3 className="text-xl font-bold text-slate-800">
                Issue Overview
              </h3>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="group overflow-hidden rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
              <h3 className="text-xl font-bold text-slate-800">
                Issue Distribution
              </h3>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                    }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#334155"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          className="text-sm font-semibold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;