import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: admin, isLoading, refetch } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/me");
      return res.data;
    },
  });

  const openUpdateModal = (adminData) => {
    setSelectedAdmin(adminData);
    reset({
      name: adminData.displayName,
      email: adminData.email,
      phone: adminData.phone,
    });
    modalRef.current.showModal();
  };

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = selectedAdmin.photoURL;
      if (data.photo?.length) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
          formData
        );
        photoURL = imgRes.data.data.url;
      }

      const updateInfo = {
        displayName: data.name,
        email: data.email,
        phone: data.phone,
        photoURL,
      };

      const res = await axiosSecure.patch("/admin/update", updateInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
        modalRef.current.close();
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto my-8 md:my-12 space-y-8">

      {/* ===== Welcome Section with Improved Gradient ===== */}
<div className="bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
  <div className="flex-1 space-y-2 md:space-y-0 md:mr-6 text-center md:text-left">
    <h1 className="text-3xl md:text-4xl font-bold">Welcome Back, Admin!</h1>
    <p className="text-md md:text-lg opacity-90">
      You have full control over the system. Manage issues, staff, users, and payments efficiently.
    </p>
  </div>
   <img
    src={admin.photoURL || "https://via.placeholder.com/150"}
    alt="Admin"
    className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white object-cover shadow-md"
  />
</div>



      {/* ===== Quick Info Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">System Overview</h3>
          <p className="text-gray-500 mt-2 text-sm">
            Track all issues, payments, and user activity in one place. Make informed decisions quickly.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Manage Users & Staff</h3>
          <p className="text-gray-500 mt-2 text-sm">
            Add, update, or remove staff members. Block or unblock users. Keep your system organized.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Monitor Payments</h3>
          <p className="text-gray-500 mt-2 text-sm">
            View payment history, boost requests, and subscription details. Ensure smooth financial management.
          </p>
        </div>
      </div>

     {/* ===== Admin Info Card Gradient ===== */}
<div className="flex flex-col md:flex-row items-center gap-6 
            bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 
            p-6 rounded-3xl text-white shadow-xl">
  <img
    src={admin.photoURL || "https://via.placeholder.com/150"}
    alt="Admin"
    className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white object-cover shadow-md"
  />
  <div className="flex-1 text-center md:text-left space-y-1">
    <h2 className="text-2xl md:text-3xl font-bold">{admin.displayName}</h2>
    <p className="text-md md:text-lg">{admin.email}</p>
    <p className="text-sm md:text-md">{admin.phone}</p>
  </div>
  <button
    onClick={() => openUpdateModal(admin)}
    className="btn bg-white text-indigo-600 hover:bg-gray-100 mt-4 md:mt-0 shadow-lg"
  >
    Update Info
  </button>
</div>


      {/* ===== Update Modal ===== */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 rounded-2xl bg-white shadow-xl">
          <h3 className="text-xl text-center font-bold text-gray-800 mb-4">Update Profile</h3>
          <form className="space-y-4" onSubmit={handleSubmit(handleUpdateProfile)}>

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name")}
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>

            {/* Photo */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Photo</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("photo")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email")}
              />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full"
                {...register("phone")}
              />
              {errors.phone && <span className="text-red-500 text-sm">Phone is required</span>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline text-gray-700"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminProfile;
