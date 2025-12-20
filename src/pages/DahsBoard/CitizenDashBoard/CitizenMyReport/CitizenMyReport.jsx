import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiFileText, FiTrash2 } from "react-icons/fi";
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
    formState: { errors },
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

  return (
    <div className="my-8">
      {/* ---------------- BLOCKED WARNING ---------------- */}
      {isBlocked && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 shadow-sm">
          ⚠️ You are blocked by admin. Contact authorities.
        </div>
      )}
      {/* ---------------- HEADER ---------------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          My Issues
          {isPremium && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold ml-2">
              🌟 Premium
            </span>
          )}
        </h1>
        <p className="text-sm font-bold text-gray-500">
          Total Report Issue: {issues.length}
        </p>

        {/* ---------------- FILTERS ---------------- */}
        <div className="flex flex-wrap gap-4 mt-4">
          <select
            className="select select-bordered border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            className="select select-bordered border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Category</option>
            <option value="Road">Road</option>
            <option value="Drainage">Drainage</option>
            <option value="Streetlights">Streetlights</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Footpaths">Footpaths</option>
          </select>
        </div>
      </div>

      {/* ---------------- ISSUE LIST ---------------- */}
      <div className="hidden lg:block border rounded-2xl overflow-x-auto">
        {/* Table view for large screens */}
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-center">SL no.</th>
              <th className="text-center">Title</th>
              <th className="text-center">Category</th>
              <th className="text-center">Status</th>
              <th className="text-center">Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={issue._id} className="hover:bg-gray-50">
                <td className="text-center">{index + 1}</td>
                <td className="text-center font-bold capitalize">
                  {issue.title}
                </td>
                <td className="text-center font-medium capitalize">
                  {issue.category}
                </td>
                <td className="text-center">
                  <span
                    className={`px-4 py-2 capitalize rounded-lg text-xs font-semibold ${
                      issue.status === "pending"
                        ? "bg-yellow-600 text-gray-200"
                        : issue.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : issue.status === "rejected"
                        ? "bg-red-500 text-white"
                        : issue.status === "closed"
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td className="text-center">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-2">
                  <Link
                    to={`/view-details/${issue._id}`}
                    className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <FiEye />
                  </Link>
                  <button
                    disabled={isBlocked || issue.status !== "pending"}
                    onClick={() => handleEditModalOpen(issue)}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                  >
                    <FiEdit />
                  </button>
                  <button
                    disabled={isBlocked}
                    onClick={() => handleIssueDelete(issue._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARD VIEW ---------------- */}
      <div className="lg:hidden grid gap-4">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white border shadow-md rounded-lg p-5 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-gray-800">
                {issue.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  issue.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : issue.status === "in-progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {issue.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{issue.category}</p>
            <p className="text-sm text-gray-400">
              {new Date(issue.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/view-details/${issue._id}`}
                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
              >
                <FiEye />
              </Link>
              <button
                disabled={isBlocked || issue.status !== "pending"}
                onClick={() => handleEditModalOpen(issue)}
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-1 disabled:opacity-50"
              >
                <FiEdit />
              </button>
              <button
                disabled={isBlocked}
                onClick={() => handleIssueDelete(issue._id)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex-1 disabled:opacity-50"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button>
      <dialog
        ref={editModalOpen}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Issue Edit</h3>
          <form onSubmit={handleSubmit(handleReportEdit)} className="space-y-4">
            {/* Title */}
            <label className="">Title</label>
            <input
              type="text"
              name="title"
              {...register("title")}
              placeholder="Issue Title"
              className="input input-bordered w-full"
            />

            {/* Category */}
            <label className="">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              {...register("category")}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Road">Road</option>
              <option value="Drainage">Drainage</option>
              <option value="Streetlights">Streetlights</option>
              <option value="Water">Water</option>
              <option value="Garbage">Garbage</option>
              <option value="Footpaths">Footpaths</option>
            </select>
            
            {/* Image Upload */}
            <label className="">Image</label>
            <input
              type="file"
              className="file-input w-full"
              placeholder="Photo"
            />
           

            {/* Location */}
            <label className="">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location (Area, Street)"
              className="input input-bordered w-full"
              {...register("location")}
            />
            

            {/* Description */}
            <label className="">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full h-28"
              placeholder="Describe the issue"
              {...register("description")}
            ></textarea>
           
            <button className="btn w-full text-2xl btn-glow text-white">
              Report submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CitizenMyReport;
