import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleIssueSubmit = (data) => {
    const reportImg = data.image[0];
    const formData = new FormData();
    formData.append("image", reportImg);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      )
      .then((res) => {
        const imageURL = res.data.data.url;
        delete data.image;
        delete data.imageURL;
        const reportInfo = {
          ...data,
          email:user.email,
          imageURL: imageURL,
          status: "pending",
          createdAt: new Date(),
        };

        axiosSecure
          .post("/reports", reportInfo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
          })
          .catch((err) => {
            const message = err.message;
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: message,
              showConfirmButton: false,
              timer: 1500,
            });
          });

        console.log("after saving data", data, imageURL);
      });
  };

  return (
    <div className="max-w-2xl mx-auto my-10 md:my-16 p-6 bg-base-100 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Report Public Issue
      </h1>

      <form onSubmit={handleSubmit(handleIssueSubmit)} className="space-y-4">
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
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Road">Road</option>
          <option value="Drainage">Drainage</option>
          <option value="Streetlights">Streetlights</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage Overflow">Garbage Overflow</option>
          <option value="Footpaths">Footpaths</option>
        </select>
        {errors.category?.type === "required" && (
          <p className="text-red-500"> Category is required</p>
        )}

        {/* Priority */}
        <label className="">Priority</label>
        <select
          name="priority"
          className="select select-bordered w-full"
          {...register("priority", { required: true })}
          defaultValue=""
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
        </select>
        {errors.priority?.type === "required" && (
          <p className="text-red-500"> Priority is required</p>
        )}

        {/* Image Upload */}
        <label className="">Image</label>
        <input
          type="file"
          {...register("image", { required: true })}
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
    </div>
  );
};

export default Report;
