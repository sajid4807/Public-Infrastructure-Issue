import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [staffEmail, setStaffEmail] = useState("");

  const { data: issues = [] } = useQuery({
    queryKey: ["admin-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data.result;
    },
  });

  const handleAssignStaff =(reportId)=>{

  }


//   const assignMutation = useMutation({
//     mutationFn: () =>
//       axiosSecure.patch(`/reports/${selectedIssue}/assign-staff`, {
//         staffEmail,
//       }),
//     onSuccess: () => {
//       Swal.fire("Assigned!", "Staff assigned successfully", "success");
//       queryClient.invalidateQueries(["admin-issues"]);
//       setSelectedIssue(null);
//     },
//   });

  const rejectIssue = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Issue?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/reports/${id}/reject`);
    queryClient.invalidateQueries(["admin-issues"]);
  };

  return (
  <div className="">
    <h2 className="text-2xl my-5 font-bold">All Issues</h2>

    {/* ===== DESKTOP TABLE ===== */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Staff</th>
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
              <td>{issue.assignedStaff || "Not Assigned"}</td>
              <td className="space-x-2">
                {!issue.assignedStaff && (
                  <button
                    // onClick={() => setSelectedIssue(issue._id)}
                    onClick={()=> handleAssignStaff(issue._id)}
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

    {/* ===== MOBILE & TABLET CARDS ===== */}
    <div className="grid gap-4 lg:hidden">
      {issues.map((issue) => (
        <div
          key={issue._id}
          className="card bg-base-100 shadow-md p-4 border"
        >
          <h3 className="font-bold text-lg">{issue.title}</h3>

          <p className="text-sm">
            <span className="font-semibold">Category:</span>{" "}
            {issue.category}
          </p>

          <p className="text-sm">
            <span className="font-semibold">Status:</span>{" "}
            {issue.status}
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
            {issue.assignedStaff || "Not Assigned"}
          </p>

          <div className="flex gap-2 mt-3">
            {!issue.assignedStaff && (
              <button
                onClick={() => setSelectedIssue(issue._id)}
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

    {/* ===== ASSIGN MODAL ===== */}
    {selectedIssue && (
      <dialog open className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold mb-3">Assign Staff</h3>

          <input
            type="email"
            placeholder="Staff Email"
            className="input input-bordered w-full"
            onChange={(e) => setStaffEmail(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => setSelectedIssue(null)}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={() => assignMutation.mutate()}
            >
              Assign
            </button>
          </div>
        </div>
      </dialog>
    )}
  </div>
);

};

export default AdminAllIssues;
