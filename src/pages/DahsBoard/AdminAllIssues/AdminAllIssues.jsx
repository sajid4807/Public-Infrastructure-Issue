import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const assignModalRef = useRef();

  // Fetch issues
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports/admin");
      return res.data;
    },
  });

  console.log(issues)
  // Fetch staff
  const { data: staffs = [] } = useQuery({
    queryKey: ["staff"],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    assignModalRef.current.showModal();
  };

  const handleAssignStaff = (e) => {
    e.preventDefault();
    if (!selectedStaff)
      return Swal.fire("Error", "Select a staff", "error");

    // Find staff info
    const staffInfo = staffs.find((s) => s._id === selectedStaff);

    const staffAssignInfo = {
      staffId: staffInfo._id,
      name: staffInfo.displayName,
      email: staffInfo.email,
    };

    try {
      axiosSecure.patch(
        `/reports/${selectedIssue._id}/staff`,
        staffAssignInfo
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Staff assigned successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset selection & close modal
      setSelectedStaff("");
      setSelectedIssue(null);
      assignModalRef.current.close();

      // Refresh issues table
      queryClient.invalidateQueries(["issues"]);
    } catch (err) {
      // console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to assign staff",
        "error"
      );
    }
  };

  // Reject issue
  const rejectIssue = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Issue?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/reports/${id}/reject`);
    queryClient.invalidateQueries(["issues"]);
  };

  return (
    <div className="">
      <h2 className="text-2xl my-5 font-bold">All Issues: {issues.length}</h2>

      {/* ===== Desktop Table ===== */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assign Staff</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.status}</td>
                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>{issue.staffName || "Not Assigned"}</td>
                <td className="space-x-2">
                  {!issue.staffId && (
                    <button
                      onClick={() => openAssignModal(issue)}
                      className="btn btn-xs btn-primary"
                    >
                      Assign
                    </button>
                  )}

                  {issue.status === "pending" && (
                    <button
                      onClick={() => rejectIssue(issue._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile & Tablet Cards ===== */}
      <div className="grid gap-4 lg:hidden">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="card bg-base-100 shadow-md p-4 border"
          >
            <h3 className="font-bold text-lg">{issue.title}</h3>

            <p className="text-sm">
              <span className="font-semibold">Category:</span> {issue.category}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Status:</span> {issue.status}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Priority:</span>{" "}
              <span
                className={`badge ${
                  issue.priority === "high"
                    ? "badge-error"
                    : "badge-info"
                }`}
              >
                {issue.priority}
              </span>
            </p>

            <p className="text-sm">
              <span className="font-semibold">Staff:</span>{" "}
              {issue.staffName || "Not Assigned"}
            </p>

            <div className="flex gap-2 mt-3">
              {!issue.staffId && (
                <button
                  onClick={() => openAssignModal(issue)}
                  className="btn btn-sm btn-primary flex-1"
                >
                  Assign
                </button>
              )}

              {issue.status === "pending" && (
                <button
                  onClick={() => rejectIssue(issue._id)}
                  className="btn btn-sm btn-error flex-1"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== Assign Modal ===== */}
      <dialog ref={assignModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Assign Staff</h3>
          <form className="mt-4 space-y-4" onSubmit={handleAssignStaff}>
            <select
              className="select select-bordered w-full"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="" disabled>
                Select Staff
              </option>
              {staffs.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.displayName}
                </option>
              ))}
            </select>

            <div className="modal-action justify-between">
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => assignModalRef.current.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminAllIssues;
