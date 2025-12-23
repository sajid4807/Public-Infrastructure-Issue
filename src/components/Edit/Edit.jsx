import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Edit = () => {

    const {register,handleSubmit,reset, formState:{errors}}=useForm()
    const axiosInstance =useAxios()
    const axiosSecure =useAxiosSecure()
    const {id} =useParams()
    const location =useLocation()
    const navigate = useNavigate()

    const {data: issue}=useQuery({
        queryKey:['report',id],
        queryFn:async()=>{
            const res =await axiosInstance.get(`/reports/${id}`)
            return res.data
        }
    })
    useEffect(() => {
  if (issue) {
    reset({
      title: issue.title,
      category: issue.category,
      priority: issue.priority,
      location: issue.location,
      description: issue.description,
    });
  }
}, [issue, reset]);




    const handleReportEdit =data=>{
        axiosSecure.patch(`/reports/${issue._id}`,data)
        .then(() => {
            Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Edit successful 🎉",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(
          location.state ? location.state : location.pathname
        );
        })
        .catch((err) => {
                    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || err.message || 'Something went wrong!',
    });
                  });
    }


    return (
         <div className="max-w-2xl mx-auto my-10 md:my-16 p-6 bg-base-100 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Edit Issue
      </h1>

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
          Edit submit
        </button>
      </form>
    </div>
    );
};

export default Edit;