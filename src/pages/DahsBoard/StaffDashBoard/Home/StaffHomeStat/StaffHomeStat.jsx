import { FaTasks, FaClock, FaCheckCircle, FaTimesCircle, FaCog } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Loading from "../../../../../components/Loading/Loading";

const StaffHomeStat = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusChanging, setStatusChanging] = useState(null);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["staffStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/stats");
      return res.data;
    }
  });

  const { data: issues = [],refetch } = useQuery({
    queryKey: ["staffIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      let url = `/staff/issues?staffEmail=${user.email}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  const statusOptions = {
      pending: ["in-progress"],
      "in-progress": ["working"],
      working: ["resolved"],
      resolved: ["closed"],
    };
  
    const handleChangeStatus = async (issueId, newStatus) => {

  setStatusChanging(issueId);

  const previousIssues = queryClient.getQueryData([
    "staffIssues",
    user.email,
  ]);

  queryClient.setQueryData(
    ["staffIssues", user.email],
    (oldData = []) =>
      oldData.map((issue) =>
        issue._id === issueId
          ? {
              ...issue,
              status: newStatus, 
            }
          : issue
      )
  );

  try {
    await axiosSecure.patch(`/staff/issues/status/${issueId}`, {
      newStatus,
      staffEmail: user.email,
      staffName: user.displayName,
    });
              refetch()

    Swal.fire("Success!", "Status updated successfully", "success");

  } catch (error) {

    queryClient.setQueryData(
      ["staffIssues", user.email],
      previousIssues
    );

    Swal.fire("Error", "Failed to update status", "error");

  } finally {
    setStatusChanging(null);
  }
};


  if (isLoading) return <Loading />;

  const chartData = stats.monthlyChart?.map(item => ({
    month: item.month,
    count: item.count
  })) || [];

  const statCards = [
    {
      icon: FaTasks,
      label: "Total Assigned",
      value: stats.totalIssues || 0,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "blue"
    },
    {
      icon: FaClock,
      label: "Pending",
      value: stats.pending || 0,
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "yellow"
    },
    {
      icon: FaClock,
      label: "In Progress",
      value: stats.inProgress || 0,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "indigo"
    },
    {
      icon: FaCog,
      label: "Working",
      value: stats.working || 0,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "green"
    },
      {
      icon: FaCheckCircle,
      label: "Resolved",
      value: stats.resolved || 0,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "green"
    },
    {
      icon: FaTimesCircle,
      label: "Closed",
      value: stats.closed || 0,
      gradient: "from-gray-500 to-slate-500",
      bgColor: "gray"
    },
  ];

  const statusColors = {
    pending: "bg-orange-100 text-orange-700",
    "in-progress": "bg-blue-100 text-blue-700",
    working: "bg-indigo-100 text-indigo-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-700",
    rejected: "bg-red-100 text-red-700"
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    normal: "bg-green-100 text-green-700",
    low: "bg-blue-100 text-blue-700"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Staff Dashboard
            </h1>
            <p className="text-slate-300 mt-2">Manage your assigned issues and track progress</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700 px-4 py-2 rounded-xl">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-medium">Active</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-3xl text-white" />
                </div>
                <p className="text-slate-300 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Monthly Assigned Issues</h2>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse delay-75"></span>
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse delay-150"></span>
              </div>
            </div>
            
            {chartData.length > 0 ? (
              <div className="bg-slate-900/30 rounded-2xl p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(30, 41, 59, 0.95)",
                        border: "1px solid #475569",
                        borderRadius: "12px",
                        color: "#e2e8f0"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="url(#colorGradient)" name="Assigned Issues" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg font-medium">No data available for chart</p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Tasks */}
{stats.todaysTasks && stats.todaysTasks.length > 0 && (
  <div className="overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl mt-8">
    <div className="p-6 border-b border-slate-700">
      <h2 className="text-2xl font-bold text-white">Today's Tasks</h2>
      <p className="text-slate-400 text-sm mt-1">Focus on today's priorities</p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">SL</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Title</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {stats.todaysTasks.map((issue, idx) => (
            <tr key={issue._id} className="hover:bg-slate-700/30 transition-colors">
              <td className="px-6 py-4 text-slate-300">{idx + 1}</td>
              <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{issue.title}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[issue.status] || statusColors.pending}`}>
                  {issue.status.replace("-", " ")}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors[issue.priority] || priorityColors.normal}`}>
                  {issue.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-300">{issue.category}</td>
              <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{issue.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}



        {/* Issues Table */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Assigned Issues</h2>
            <p className="text-slate-400 text-sm mt-1">Manage and update issue statuses</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">SL</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium">No assigned issues</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  issues.map((issue, idx) => (
                    <tr key={issue._id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-slate-300">{idx + 1}</td>
                      <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{issue.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[issue.status] || statusColors.pending}`}>
                          {issue.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors[issue.priority] || priorityColors.normal}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{issue.category}</td>
                      <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{issue.location}</td>
                      <td className="px-6 py-4">
                        {statusOptions[issue.status]?.length > 0 ? (
                          <select
                            className="select bg-slate-700 border-slate-600 text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            disabled={statusChanging === issue._id}
                            defaultValue=""
                            onChange={(e) => handleChangeStatus(issue._id, e.target.value)}
                          >
                            <option value="" disabled>
                              Select new status
                            </option>
                            {statusOptions[issue.status].map((s) => (
                              <option key={s} value={s}>
                                {s.replace("-", " ").toUpperCase()}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-slate-500 text-sm italic">No further action</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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

export default StaffHomeStat;