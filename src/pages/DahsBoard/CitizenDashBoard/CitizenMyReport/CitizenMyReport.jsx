import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { FaClipboardList, FaFilter, FaStar, FaExclamationTriangle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/Loading/Loading";

const CitizenMyReport = () => {
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({
    status: "",
    category: "",
  });

  const [selectedIssue, setSelectedIssue] = useState(null);

  const editModalOpen = useRef();

  const {
    register,
    reset,
    handleSubmit,
  } = useForm();

  /* ---------------- USER STATUS ---------------- */
  const { data: userStatus = {} } = useQuery({
    queryKey: ["userStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/status");
      return res.data;
    },
  });

  const isBlocked = userStatus?.isBlocked;
  const isPremium = userStatus?.isPremium;

  /* ---------------- MY ISSUES ---------------- */
  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["report", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.category) params.append("category", filters.category);
      const res = await axiosSecure.get(`/my-report?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleIssueDelete = (issueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reports/${issueId}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "The issue has been removed.",
            icon: "success",
          });
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  const handleEditModalOpen = (issue) => {
    setSelectedIssue(issue);
    reset({
      title: issue.title,
      category: issue.category,
      priority: issue.priority,
      location: issue.location,
      description: issue.description,
    });
    editModalOpen.current.showModal();
  };

  const handleReportEdit = (data) => {
    axiosSecure
      .patch(`/reports/${selectedIssue._id}`, data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Edit successful 🎉",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        editModalOpen.current.close();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Something went wrong!",
        });
      });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-300",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-300",
      resolved: "bg-emerald-100 text-emerald-700 border-emerald-300",
      rejected: "bg-rose-100 text-rose-700 border-rose-300",
      closed: "bg-slate-100 text-slate-700 border-slate-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-7xl space-y-3 md:space-y-6">
        {/* ---------------- BLOCKED WARNING ---------------- */}
        {isBlocked && (
          <div className="animate-pulse overflow-hidden rounded-xl border-l-8 border-red-500 bg-gradient-to-r from-red-50 to-rose-50 p-3 md:p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex w-12 h-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-red-500 shadow-lg">
                <FaExclamationTriangle className="text-xl md:text-2xl text-white" />
              </div>
              <div>
                <p className="text-lg font-black text-red-700">Account Blocked</p>
                <p className="text-sm text-red-600">You are blocked by admin. Contact authorities.</p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- HEADER ---------------- */}
        <div className="group relative overflow-hidden rounded-xl bg-white p-3 md:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-3xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="flex w-12 h-12 md:h-16 md:w-16 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
              <FaClipboardList className="text-xl md:text-3xl text-white" />
            </div>
            <div className="flex-1 rounded-sm">
              <div className="flex flex-wrap items-center md:gap-2">
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl md:text-3xl font-black text-transparent">
                  My Issues
                </h1>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-amber-500/30">
                    <FaStar /> Premium
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Total Reported Issues: <span className="font-black text-indigo-600">{issues.length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- FILTERS ---------------- */}
        <div className="overflow-hidden rounded-xl bg-white/80 p-3 md:p-5 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col gap-2 md:gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                <FaFilter className="text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-700">Filters:</span>
            </div>

            <div className="flex flex-1 flex-wrap gap-3">
              <select
                className="min-h-[44px] flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:min-w-[180px]"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">📋 All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="resolved">✅ Resolved</option>
              </select>

              <select
                className="min-h-[44px] flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:min-w-[180px]"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">🎯 All Category</option>
                <option value="Road">🛣️ Road</option>
                <option value="Drainage">💧 Drainage</option>
                <option value="Streetlights">💡 Streetlights</option>
                <option value="Water">🚰 Water</option>
                <option value="Garbage">🗑️ Garbage</option>
                <option value="Footpaths">🚶 Footpaths</option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------------- DESKTOP TABLE VIEW ---------------- */}
        <div className="hidden overflow-hidden rounded-3xl bg-white shadow-2xl lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    SL NO
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    Title
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    Category
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    Status
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    Date
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-black uppercase tracking-wider text-white">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                          <FaClipboardList className="text-4xl text-slate-400" />
                        </div>
                        <p className="text-lg font-bold text-slate-600">No issues found</p>
                        <p className="text-sm text-slate-400">Your reported issues will appear here</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  issues.map((issue, index) => (
                    <tr key={issue._id} className="transition-all duration-200 hover:bg-indigo-50">
                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 font-black text-indigo-700">
                          {index + 1}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <p className="font-bold capitalize text-slate-900">{issue.title}</p>
                      </td>

                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <p className="font-medium capitalize text-slate-700">{issue.category}</p>
                      </td>

                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-xl border px-4 py-2 text-xs font-bold capitalize ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <p className="font-medium text-slate-600">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/view-details/${issue._id}`}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-110"
                          >
                            <FiEye />
                          </Link>
                          <button
                            disabled={isBlocked || issue.status !== "pending"}
                            onClick={() => handleEditModalOpen(issue)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <FiEdit />
                          </button>
                          <button
                            disabled={isBlocked || issue.status !== "pending"}
                            onClick={() => handleIssueDelete(issue._id)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------- MOBILE CARD VIEW ---------------- */}
        <div className="grid gap-4 lg:hidden">
          {issues.length === 0 ? (
            <div className="rounded-xl bg-white p-4 md:p-12 text-center shadow-xl">
              <div className="mx-auto mb-2 md:mb-4 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                <FaClipboardList className="text-2xl md:text-4xl text-slate-400" />
              </div>
              <p className="font-bold text-slate-600">No issues found</p>
              <p className="mt-1 text-sm text-slate-400">Your reported issues will appear here</p>
            </div>
          ) : (
            issues.map((issue, index) => (
              <div
                key={issue._id}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 md:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm font-black text-white">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold capitalize text-white">{issue.title}</p>
                        <p className="text-xs capitalize text-white/80">{issue.category}</p>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold capitalize ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4 p-3 md:p-5">
                  <div className="rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-3">
                    <p className="text-xs font-bold text-slate-500">Reported Date</p>
                    <p className="font-bold text-slate-700">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/view-details/${issue._id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 md:py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
                    >
                      <FiEye /> View
                    </Link>
                    <button
                      disabled={isBlocked || issue.status !== "pending"}
                      onClick={() => handleEditModalOpen(issue)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2 md:py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      disabled={isBlocked || issue.status !== "pending"}
                      onClick={() => handleIssueDelete(issue._id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 md:py-3 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <dialog ref={editModalOpen} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl rounded-3xl">
            <h3 className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-black text-transparent">
              Edit Issue
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Issue Title"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Category</label>
                <select
                  {...register("category")}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Road">Road</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Streetlights">Streetlights</option>
                  <option value="Water">Water</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Footpaths">Footpaths</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Image</label>
                <input
                  type="file"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Location</label>
                <input
                  type="text"
                  {...register("location")}
                  placeholder="Location (Area, Street)"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  {...register("description")}
                  className="h-32 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Describe the issue"
                ></textarea>
              </div>

              <button 
                onClick={handleSubmit(handleReportEdit)}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
              >
                Update Issue
              </button>
            </div>
            <div className="modal-action">
              <button 
                onClick={() => editModalOpen.current.close()}
                className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-2.5 font-bold text-slate-700 transition-all hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CitizenMyReport;