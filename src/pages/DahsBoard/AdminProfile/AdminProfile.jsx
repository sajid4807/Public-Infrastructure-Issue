import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { 
  FaUserShield, 
  FaEdit, 
  FaEnvelope, 
  FaPhone, 
  FaChartLine, 
  FaUsers, 
  FaMoneyBillWave,
  FaCrown,
  FaCheckCircle,
  FaCamera
} from "react-icons/fa";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      name: adminData.displayName || "",
      email: adminData.email || "",
      phone: adminData.phone || "",
    });
    if (modalRef.current && modalRef.current.showModal) {
      modalRef.current.showModal();
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = selectedAdmin?.photoURL || "";
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
        modalRef.current?.close();
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Update failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ===== Hero Banner ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                <FaCrown className="text-yellow-300" />
                Administrator Dashboard
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Welcome Back, {admin?.displayName || "Admin"}!
              </h1>
              <p className="text-base md:text-lg text-blue-100 max-w-2xl">
                You have full control over the system. Manage issues, staff, users, and payments efficiently from your dashboard.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <img
                src={admin?.photoURL || "https://via.placeholder.com/150"}
                alt="Admin"
                className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-2xl ring-4 ring-white/50"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>

        {/* ===== Quick Access Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Analytics Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-blue-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-2xl text-blue-600" />
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Analytics</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">System Overview</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track all issues, payments, and user activity in one place. Make informed decisions quickly with real-time data.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 group-hover:h-2 transition-all"></div>
          </div>

          {/* User Management Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-purple-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaUsers className="text-2xl text-purple-600" />
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Management</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Manage Users & Staff</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add, update, or remove staff members. Block or unblock users. Keep your system organized and secure.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 group-hover:h-2 transition-all"></div>
          </div>

          {/* Payments Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-green-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaMoneyBillWave className="text-2xl text-green-600" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Financial</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Monitor Payments</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                View payment history, boost requests, and subscription details. Ensure smooth financial management.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-1 group-hover:h-2 transition-all"></div>
          </div>
        </div>

        {/* ===== Admin Profile Card ===== */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={admin?.photoURL || "https://via.placeholder.com/150"}
                alt="Admin"
                className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-xl ring-4 ring-white/50"
              />
              <div className="absolute bottom-3 right-3 bg-green-500 h-7 w-7 rounded-full border-4 border-white flex items-center justify-center">
                <FaCheckCircle className="text-white text-xs" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-semibold mb-2">
                <FaUserShield />
                System Administrator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {admin?.displayName || "-"}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-white/90 text-sm md:text-base mt-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FaEnvelope className="text-white/80" />
                  <span>{admin?.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FaPhone className="text-white/80" />
                  <span>{admin?.phone || "-"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openUpdateModal(admin)}
              className="bg-white text-indigo-600 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"
            >
              <FaEdit />
              {isMobile ? "Update" : "Update Profile"}
            </button>
          </div>

          {/* Profile Details */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-indigo-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FaUserShield className="text-indigo-600 text-xl" />
                </div>
                <h4 className="font-bold text-gray-700">Role</h4>
              </div>
              <p className="text-gray-600 text-sm">System Administrator</p>
              <p className="text-xs text-gray-500 mt-1">Full access to all features</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaEnvelope className="text-purple-600 text-xl" />
                </div>
                <h4 className="font-bold text-gray-700">Email</h4>
              </div>
              <p className="text-gray-600 text-sm break-all">{admin?.email || "-"}</p>
              <p className="text-xs text-gray-500 mt-1">Primary contact method</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-pink-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <FaPhone className="text-pink-600 text-xl" />
                </div>
                <h4 className="font-bold text-gray-700">Phone</h4>
              </div>
              <p className="text-gray-600 text-sm">{admin?.phone || "-"}</p>
              <p className="text-xs text-gray-500 mt-1">Secondary contact</p>
            </div>
          </div>
        </div>

        {/* ===== Update Modal ===== */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-md p-0 rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaEdit className="text-white" />
                Update Profile
              </h3>
              <p className="text-indigo-100 text-sm mt-1">Modify your administrator information</p>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleSubmit(handleUpdateProfile)}>
              {/* Name */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaUserShield className="text-indigo-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("name")}
                />
                {errors.name && <span className="text-red-500 text-xs flex items-center gap-1">Name is required</span>}
              </div>

              {/* Photo */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaCamera className="text-purple-600" />
                  Profile Photo
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("photo")}
                />
                <p className="text-xs text-gray-500">Upload a new profile picture (optional)</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaEnvelope className="text-pink-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-xs flex items-center gap-1">Email is required</span>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaPhone className="text-green-600" />
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("phone")}
                />
                {errors.phone && <span className="text-red-500 text-xs flex items-center gap-1">Phone is required</span>}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 btn btn-outline text-gray-700 hover:bg-gray-100 rounded-xl min-h-[44px]"
                  onClick={() => modalRef.current?.close()}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-h-[44px]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>

      </div>
    </div>
  );
};

export default AdminProfile;
