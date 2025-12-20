// import { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import { FiEdit, FiTrash2, FiEye, FiFileText } from "react-icons/fi";
// import Swal from "sweetalert2";
// import axiosSecure from "../../hooks/useAxiosSecure";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiEdit, FiEye, FiFileText, FiTrash2 } from "react-icons/fi";
import { useForm } from "react-hook-form";

const CitizenMyReport = () => {
//   const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure =useAxiosSecure()

  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const editModalOpen =useRef()

  const {register,reset,formState:{errors},handleSubmit}=useForm()

  /* ---------------- USER STATUS ---------------- */
//   const { data: userStatus = {} } = useQuery({
//     queryKey: ["userStatus"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/user/status");
//       return res.data;
//     },
//   });

//   const isBlocked = userStatus?.isBlocked;
//   const isPremium = userStatus?.isPremium;

  /* ---------------- MY ISSUES ---------------- */
  const { data: issues = [], isLoading,refetch } = useQuery({
    queryKey: ["report", filterStatus, filterCategory],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-report", {
        params: {
          status: filterStatus,
          category: filterCategory,
        },
      });
      return res.data;
    },
  });

  /* ---------------- DELETE ISSUE ---------------- */
//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This issue will be deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete",
//     });

//     if (!confirm.isConfirmed) return;

//     await axiosSecure.delete(`/report/${id}`);
//     queryClient.invalidateQueries(["report"]);
//     Swal.fire("Deleted!", "Issue removed successfully", "success");
//   };

  /* ---------------- UPDATE ISSUE ---------------- */
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const updatedData = {
//       title: form.title.value,
//       category: form.category.value,
//       description: form.description.value,
//     };

//     await axiosSecure.patch(
//       `/report/${selectedIssue._id}`,
//       updatedData
//     );

//     setSelectedIssue(null);
//     queryClient.invalidateQueries(["report"]);
//     Swal.fire("Updated!", "Issue updated successfully", "success");
//   };

  if (isLoading) return <p className="text-center">Loading...</p>;

  const handleEditModalOpen =(issue)=>{
    setSelectedIssue(issue)
    reset({
      title: issue.title,
      category: issue.category,
      priority: issue.priority,
      location: issue.location,
      description: issue.description,
    });
    editModalOpen.current.showModal()
  }

  const handleReportEdit =data=>{
          axiosSecure.patch(`/reports/${selectedIssue._id}`,data)
          .then(() => {
              Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Edit successful 🎉",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
          editModalOpen.current.close()
        //   navigate(
        //     location.state ? location.state : location.pathname
        //   );
          })
          .catch((err) => {
                      // const message = err.message;
                      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message || 'Something went wrong!',
      });
                    });
      }

  return (
    <div className="p-6">
      {/* ---------------- HEADER ---------------- */}
      {/* <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <FiFileText />
        My Issues
        {isPremium && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            🌟 Premium
          </span>
        )}
      </h1> */}

      {/* ---------------- BLOCKED WARNING ---------------- */}
      {/* {isBlocked && (
        <div className="alert alert-error mb-4">
          ⚠️ You are blocked by admin. Contact authorities.
        </div>
      )} */}

      {/* ---------------- FILTERS ---------------- */}
      {/* <div className="flex gap-4 mb-4">
        <select
          className="select select-bordered"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Category</option>
          <option value="road">Road</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
        </select>
      </div> */}

      {/* ---------------- ISSUE LIST ---------------- */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>
                  <span className="badge">{issue.status}</span>
                </td>
                <td>
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>

                <td className="flex gap-2">
                  {/* VIEW */}
                  <button
                    onClick={() => navigate(`/issue/${issue._id}`)}
                    className="btn btn-sm"
                  >
                    <FiEye />
                  </button>

                  {/* EDIT */}
                  <button
                    // disabled={
                    //   isBlocked || issue.status !== "pending"
                    // }
                    onClick={() => handleEditModalOpen(issue)}
                    className="btn btn-sm btn-info"
                  >
                    <FiEdit />
                  </button>

                  {/* DELETE */}
                  {/* <button
                    disabled={isBlocked}
                    onClick={() => handleDelete(issue._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FiTrash2 />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog ref={editModalOpen} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-center text-lg">Edit Issue</h3>
    <form onSubmit={handleSubmit(handleReportEdit)} className="space-y-4">
        {/* Title */}
        <label className="">Title</label>
        <input
          type="text"
          name="title"
          {...register("title", { required: true })}
          placeholder="Issue Title"
          className="input input-bordered w-full"
        />
        {errors.title?.type === "required" && (
          <p className="text-red-500"> Title is required</p>
        )}

        {/* Category */}
        <label className="">Category</label>
        <select
          name="category"
          className="select select-bordered w-full"
          {...register("category", { required: true })}
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
        {errors.category?.type === "required" && (
          <p className="text-red-500"> Category is required</p>
        )}
        {/* Image Upload */}
        <label className="">Image</label>
        <input
          type="file"
          className="file-input w-full"
          placeholder="Photo"
        />
        {errors.image?.type === "required" && (
          <p className="text-red-500"> Image is required</p>
        )}

        {/* Location */}
        <label className="">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Location (Area, Street)"
          className="input input-bordered w-full"
          {...register("location", { required: true })}
        />
        {errors.location?.type === "required" && (
          <p className="text-red-500"> Location is required</p>
        )}

        {/* Description */}
        <label className="">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full h-28"
          placeholder="Describe the issue"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description?.type === "required" && (
          <p className="text-red-500"> Description is required</p>
        )}
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


// export default CitizenMyReport;