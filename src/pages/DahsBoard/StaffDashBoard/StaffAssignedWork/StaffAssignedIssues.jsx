import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import { FaMapMarkerAlt, FaClipboardList, FaFilter, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const StaffAssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusChanging, setStatusChanging] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["staffIssues", user?.email, statusFilter, priorityFilter],
    enabled: !!user?.email,
    queryFn: async () => {
      let url = `/staff/issues?staffEmail=${user.email}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (priorityFilter) url += `&priority=${priorityFilter}`;
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
    try {
      await axiosSecure.patch(`/staff/issues/status/${issueId}`, {
        newStatus,
        staffEmail: user.email,
        staffName: user.displayName,
      });

      queryClient.setQueryData(["staffIssues", user.email, statusFilter, priorityFilter], (oldData) => {
        if (!oldData) return [];
        return oldData.map((issue) =>
          issue._id === issueId
            ? {
                ...issue,
                status: newStatus,
                timeline: [
                  ...(issue.timeline || []),
                  {
                    action: "Status Changed",
                    to: newStatus,
                    changedBy: user.email,
                    staffName: user.displayName,
                    date: new Date().toISOString(),
                  },
                ],
              }
            : issue
        );
      });

      Swal.fire("Success!", "Status updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update status", error);
    } finally {
      setStatusChanging(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-300",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-300",
      working: "bg-purple-100 text-purple-700 border-purple-300",
      resolved: "bg-emerald-100 text-emerald-700 border-emerald-300",
      closed: "bg-slate-100 text-slate-700 border-slate-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30",
      normal: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30",
      low: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30",
    };
    return colors[priority] || "bg-gray-500 text-white";
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-3xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
              <FaClipboardList className="text-3xl text-white" />
            </div>
            <div className="flex-1">
              <h2 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-black text-transparent">
                Assigned Issues
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Manage and track your assigned tasks
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="overflow-hidden rounded-3xl bg-white/80 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
                <FaFilter className="text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-700">Filters:</span>
            </div>

            <div className="flex flex-1 flex-wrap gap-3">
              <select
                className="min-h-[44px] flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:min-w-[180px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">📋 All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🔄 In-Progress</option>
                <option value="working">⚙️ Working</option>
                <option value="resolved">✅ Resolved</option>
                <option value="closed">🔒 Closed</option>
              </select>

              <select
                className="min-h-[44px] flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:min-w-[180px]"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">🎯 All Priority</option>
                <option value="high">🔴 High</option>
                <option value="normal">🔵 Normal</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-3">
              <span className="text-sm text-slate-600">Total:</span>
              <span className="font-black text-indigo-600">{issues.length}</span>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-hidden rounded-3xl bg-white shadow-2xl lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    #
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Title
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Priority
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Category
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Location
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-white">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                          <FaClipboardList className="text-4xl text-slate-400" />
                        </div>
                        <p className="text-lg font-bold text-slate-600">No assigned issues found</p>
                        <p className="text-sm text-slate-400">Issues will appear here when assigned</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  issues.map((issue, index) => (
                    <tr key={issue._id} className="transition-all duration-200 hover:bg-indigo-50">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 font-black text-indigo-700">
                          {index + 1}
                        </div>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="font-bold capitalize text-slate-900">{issue.title}</p>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold capitalize ${getStatusColor(issue.status)}`}>
                          {issue.status === "resolved" && <FaCheckCircle />}
                          {issue.status === "pending" && <FaExclamationCircle />}
                          {issue.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold capitalize ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="font-medium text-slate-700">{issue.category}</p>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-rose-100">
                            <FaMapMarkerAlt className="text-red-600" />
                          </div>
                          <span className="font-medium">{issue.location}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        {statusOptions[issue.status]?.length > 0 ? (
                          <select
                            className="min-h-[40px] rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-all hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={statusChanging === issue._id}
                            defaultValue=""
                            onChange={(e) => handleChangeStatus(issue._id, e.target.value)}
                          >
                            <option value="" disabled>
                              Change Status
                            </option>
                            {statusOptions[issue.status].map((s) => (
                              <option key={s} value={s} className="capitalize">
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm font-medium text-slate-400">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 lg:hidden">
          {issues.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                <FaClipboardList className="text-4xl text-slate-400" />
              </div>
              <p className="font-bold text-slate-600">No assigned issues found</p>
              <p className="mt-1 text-sm text-slate-400">Issues will appear here when assigned</p>
            </div>
          ) : (
            issues.map((issue, index) => (
              <div
                key={issue._id}
                className="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-black text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold capitalize text-white">{issue.title}</p>
                        <p className="text-xs text-white/80">{issue.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-4 p-5">
                  {/* Status and Priority */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold capitalize ${getStatusColor(issue.status)}`}>
                      {issue.status === "resolved" && <FaCheckCircle />}
                      {issue.status === "pending" && <FaExclamationCircle />}
                      {issue.status}
                    </span>
                    <span className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold capitalize ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
                      <FaMapMarkerAlt className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Location</p>
                      <p className="font-bold text-slate-700">{issue.location}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {statusOptions[issue.status]?.length > 0 && (
                    <select
                      className="min-h-[44px] w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={statusChanging === issue._id}
                      defaultValue=""
                      onChange={(e) => handleChangeStatus(issue._id, e.target.value)}
                    >
                      <option value="" disabled>
                        Change Status
                      </option>
                      {statusOptions[issue.status].map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffAssignedIssues;