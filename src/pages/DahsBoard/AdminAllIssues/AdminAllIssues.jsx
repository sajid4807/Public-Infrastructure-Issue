import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaUserTie, 
  FaTasks,
  FaFire,
  FaInfoCircle,
  FaBan,
  FaUserPlus,
  FaClipboardList
} from "react-icons/fa";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const assignModalRef = useRef();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch issues with pagination
  const { data: issuesData = {}, refetch } = useQuery({
    queryKey: ["issues", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/admin?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { issues = [], total = 0 } = issuesData;
  const totalPages = Math.ceil(total / limit);

  // Fetch staff when modal opens
  const { data: staffs = [] } = useQuery({
    queryKey: ["staff"],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get("/staff");
      return res.data;
    },
  });

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    assignModalRef.current.showModal();
  };

  const handleAssignStaff = async (e) => {
    e.preventDefault();
    if (!selectedStaff)
      return Swal.fire("Error", "Select a staff", "error");

    const staffInfo = staffs.find((s) => s._id === selectedStaff);

    try {
      await axiosSecure.patch(`/reports/${selectedIssue._id}/staff`, {
        staffId: staffInfo._id,
        name: staffInfo.displayName,
        email: staffInfo.email,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Staff assigned successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      setSelectedStaff("");
      setSelectedIssue(null);
      assignModalRef.current.close();
      refetch();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to assign staff",
        "error"
      );
    }
  };

  const rejectIssue = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Issue?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/reports/${id}/reject`);
    refetch();
  };

  // Stats
  const pendingCount = issues.filter(i => i.status === "pending").length;
  const assignedCount = issues.filter(i => i.staffId).length;
  const highPriorityCount = issues.filter(i => i.priority === "high").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <FaClipboardList className="text-3xl text-orange-600" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Issues Management</h2>
                <p className="text-sm text-gray-600">
                  Monitor and assign all reported issues to staff members
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2.5 rounded-xl">
              <span className="text-gray-600 text-sm">Showing</span>
              <span className="font-bold text-orange-600">{issues.length}</span>
              <span className="text-gray-600 text-sm">of</span>
              <span className="font-bold text-orange-600">{total}</span>
              <span className="text-gray-600 text-sm">issues</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Issues */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-block mb-3">
                <FaTasks className="text-2xl" />
              </div>
              <p className="text-orange-100 text-sm font-medium mb-1">Total Issues</p>
              <p className="text-3xl font-bold">{issues.length}</p>
            </div>
          </div>

          {/* Pending */}
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-block mb-3">
                <FaExclamationTriangle className="text-2xl" />
              </div>
              <p className="text-yellow-100 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </div>
          </div>

          {/* Assigned */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-block mb-3">
                <FaUserTie className="text-2xl" />
              </div>
              <p className="text-green-100 text-sm font-medium mb-1">Assigned</p>
              <p className="text-3xl font-bold">{assignedCount}</p>
            </div>
          </div>

          {/* High Priority */}
          <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-block mb-3">
                <FaFire className="text-2xl" />
              </div>
              <p className="text-red-100 text-sm font-medium mb-1">High Priority</p>
              <p className="text-3xl font-bold">{highPriorityCount}</p>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        {!isMobile && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-orange-600 to-red-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Issue Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Assigned Staff
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {issues.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-3" />
                        <p className="text-lg font-semibold">No issues found</p>
                      </td>
                    </tr>
                  ) : (
                    issues.map((issue) => (
                      <tr key={issue._id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              issue.priority === "high" 
                                ? "bg-red-100" 
                                : "bg-blue-100"
                            }`}>
                              {issue.priority === "high" ? (
                                <FaFire className="text-red-600 text-lg" />
                              ) : (
                                <FaInfoCircle className="text-blue-600 text-lg" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm capitalize font-bold text-gray-900">{issue.title}</p>
                              <p className="text-xs text-gray-500">Issue Report</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex capitalize items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                            {issue.category}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs capitalize font-bold ${
                            issue.status === "pending" 
                              ? "bg-yellow-100 text-yellow-700" 
                              : issue.status === "in-progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}>
                            {issue.status === "pending" && <FaExclamationTriangle />}
                            {issue.status === "completed" && <FaCheckCircle />}
                            {issue.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {issue.priority === "high" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                              <FaFire /> HIGH
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                              <FaInfoCircle /> {issue.priority.toUpperCase()}
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {issue.staffName ? (
                              <>
                                <div className="bg-green-100 p-2 rounded-full">
                                  <FaUserTie className="text-green-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{issue.staffName}</span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-500 italic">Not Assigned</span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {!issue.staffId && (
                              <button
                                onClick={() => openAssignModal(issue)}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-1"
                              >
                                <FaUserPlus /> Assign
                              </button>
                            )}
                            {issue.status === "pending" && (
                              <button
                                onClick={() => rejectIssue(issue._id)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-1"
                              >
                                <FaBan /> Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        {isMobile && (
          <div className="space-y-4">
            {issues.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold">No issues found</p>
              </div>
            ) : (
              issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Card Header */}
                  <div className={`p-5 ${
                    issue.priority === "high"
                      ? "bg-gradient-to-r from-red-500 to-pink-600"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                          {issue.priority === "high" ? (
                            <FaFire className="text-white text-xl" />
                          ) : (
                            <FaInfoCircle className="text-white text-xl" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold capitalize text-white text-lg">{issue.title}</h3>
                          <p className="text-xs text-white/80">Issue Report</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-orange-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Category</p>
                        <p className="text-sm font-bold text-gray-900">{issue.category}</p>
                      </div>

                      <div className="bg-yellow-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Status</p>
                        <p className="text-sm font-bold text-gray-900 capitalize">{issue.status}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold mb-1">Priority Level</p>
                          <p className="text-lg font-bold text-gray-900 uppercase">{issue.priority}</p>
                        </div>
                        {issue.priority === "high" ? (
                          <div className="bg-red-500 p-3 rounded-xl">
                            <FaFire className="text-white text-2xl" />
                          </div>
                        ) : (
                          <div className="bg-blue-500 p-3 rounded-xl">
                            <FaInfoCircle className="text-white text-2xl" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                          <FaUserTie className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">Assigned Staff</p>
                          <p className="text-sm font-bold text-gray-900">
                            {issue.staffName || "Not Assigned Yet"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 p-4 flex gap-2">
                    {!issue.staffId && (
                      <button
                        onClick={() => openAssignModal(issue)}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <FaUserPlus />
                        Assign Staff
                      </button>
                    )}
                    {issue.status === "pending" && (
                      <button
                        onClick={() => rejectIssue(issue._id)}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <FaBan />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Assign Staff Modal */}
        <dialog ref={assignModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-md p-0 rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaUserPlus className="text-white" />
                Assign Staff Member
              </h3>
              <p className="text-green-100 text-sm mt-1">Select a staff member to handle this issue</p>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleAssignStaff}>
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaUserTie className="text-green-600" />
                  Select Staff Member
                </label>
                <select
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                >
                  <option value="" disabled>Choose a staff member...</option>
                  {staffs.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 btn btn-outline text-gray-700 hover:bg-gray-100 rounded-xl min-h-[44px]"
                  onClick={() => {
                    setSelectedStaff("");
                    assignModalRef.current.close();
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-h-[44px]"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 py-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] transition-all shadow-sm"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all shadow-sm ${
                    page === pageNum
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-110"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-500"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminAllIssues;