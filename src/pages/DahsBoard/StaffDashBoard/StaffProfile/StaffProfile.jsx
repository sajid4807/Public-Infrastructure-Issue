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
  FaCamera,
} from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import axios from "axios";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    data: staff,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["staff-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizen/profile");
      return res.data;
    },
  });

  const openUpdateModal = (staffData) => {
    setSelectedStaff(staffData);
    reset({
      name: staffData.displayName || "",
      email: staffData.email || "",
      phone: staffData.phone || "",
    });
    if (modalRef.current && modalRef.current.showModal) {
      modalRef.current.showModal();
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = selectedStaff?.photoURL || "";
      if (data.photo?.length) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host
          }`,
          formData
        );
        photoURL = imgRes.data.data.url;
      }

      const updateInfo = {
        displayName: data.name,
        photoURL,
      };
      const res = await axiosSecure.patch("/staff/update/profile", updateInfo);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Banner with Dark Theme */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-yellow-400/30">
                <FaCrown className="text-yellow-300 text-lg" />
                <span className="text-white font-bold text-sm">Staff Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                Welcome Back,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                  {staff?.displayName || "Staff"}
                </span>
              </h1>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <img
                src={staff?.photoURL || "https://via.placeholder.com/150"}
                alt="Staff"
                className="relative h-36 w-36 md:h-48 md:w-48 rounded-full border-4 border-white object-cover shadow-2xl"
              />
              <div className="absolute bottom-3 right-3 bg-green-500 h-8 w-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <FaCheckCircle className="text-white text-sm" />
              </div>
            </div>
          </div>
        </div>


        {/* Staff Profile Card */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-800 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                <img
                  src={staff?.photoURL || "https://via.placeholder.com/150"}
                  alt="Staff"
                  className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-2xl"
                />
              </div>

              <div className="flex-1 text-center lg:text-left space-y-3">
                
                <h2 className="text-3xl md:text-5xl font-black text-white">
                  {staff?.displayName || "-"}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
                    <FaEnvelope className="text-purple-200" />
                    <span className="text-white text-sm font-medium">{staff?.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
                    <FaPhone className="text-purple-200" />
                    <span className="text-white text-sm font-medium">{staff?.phone || "-"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openUpdateModal(staff)}
                className="bg-white text-purple-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 min-h-[48px]"
              >
                <FaEdit className="text-lg" />
                <span>{isMobile ? "Update" : "Update Profile"}</span>
              </button>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="relative p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FaEnvelope,
                title: "Email Address",
                value: staff?.email || "-",
                description: "Primary communication channel",
                gradient: "from-purple-500 to-pink-500",
                bgColor: "purple"
              },
              {
                icon: FaPhone,
                title: "Contact Number",
                value: staff?.phone || "-",
                description: "Secondary contact method",
                gradient: "from-pink-500 to-red-500",
                bgColor: "pink"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 p-6 hover:bg-slate-700/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`p-3 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-300 text-sm font-medium break-all">{item.value}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs">{item.description}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-md p-0 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaEdit className="text-yellow-300" />
                Update Staff Profile
              </h3>
              <p className="text-purple-100 text-sm mt-2">
                Modify your administrator information and profile photo
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-slate-200 font-semibold text-sm flex items-center gap-2">
                  <FaUserShield className="text-indigo-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Name is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-slate-200 font-semibold text-sm flex items-center gap-2">
                  <FaCamera className="text-purple-400" />
                  Profile Photo
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full bg-slate-700/50 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl"
                  {...register("photo")}
                />
                <p className="text-xs text-slate-400">
                  Upload a new profile picture (JPG, PNG - Max 5MB)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 btn bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 rounded-xl min-h-[48px]"
                  onClick={() => modalRef.current?.close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(handleUpdateProfile)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-h-[48px]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StaffProfile;