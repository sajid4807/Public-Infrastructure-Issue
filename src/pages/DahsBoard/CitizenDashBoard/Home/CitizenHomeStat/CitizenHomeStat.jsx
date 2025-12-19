import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useAuth from "../../../../../hooks/useAuth";

/* ---------------- Animated Number Hook ---------------- */
const useCountUp = (end, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end == null) return;

    // let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

/* ---------------- Stat Card ---------------- */
const StatCard = ({ title, value, icon, gradient }) => {
  const animatedValue = useCountUp(value);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 ${gradient}`}
    >
      {/* Text */}
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90">
          {title}
        </p>
        <h2 className="mt-2 text-4xl font-extrabold">
          {animatedValue}
        </h2>
      </div>

      {/* Background Icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-7xl">
        {icon}
      </div>
    </div>
  );
};

/* ---------------- Main Component ---------------- */
const CitizenHomeStat = () => {
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth()

  const { data: citizen = {}, isLoading } = useQuery({
    queryKey: ["citizen-stats",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizen/stats");
      return res.data;
    },
  });

  const stats = [
    {
      title: "Total Issues",
      value: citizen.totalIssues || 0,
      icon: <FaClipboardList />,
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "Pending Issues",
      value: citizen.pending || 0,
      icon: <FaHourglassHalf />,
      gradient: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
    {
      title: "Resolved Issues",
      value: citizen.resolved || 0,
      icon: <FaCheckCircle />,
      gradient: "bg-gradient-to-r from-green-400 to-emerald-600",
    },
    {
      title: "Rejected Issues",
      value: citizen.rejected || 0,
      icon: <FaTimesCircle />,
      gradient: "bg-gradient-to-r from-pink-500 to-red-600",
    },
  ];

  /* ---------- Loading Skeleton ---------- */
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Citizen Overview
        </h1>
        <p className="text-sm text-gray-500">
          Summary of your reported issues
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CitizenHomeStat;
