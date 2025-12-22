import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/Loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const CitizenProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const openCitizenProfileUpdate = useRef();

  const [citizenInfo, setCitizenInfo] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const {
    data: citizen = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["citizen-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/citizen/profile`);
      return res.data;
    },
  });

  const { data: userStatus = {} } = useQuery({
    queryKey: ["userStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/status");
      return res.data;
    },
  });

  const isBlocked = userStatus?.isBlocked;
  const isPremium = userStatus?.isPremium;

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch("/confirm-subscribe", { sessionId }).then(() => {
        refetch();
      });
    }
  }, [sessionId, axiosSecure, refetch]);

  const openUpdateModal = (citizenData) => {
    setCitizenInfo(citizenData);
    reset({
      name: citizenData.displayName,
      email: citizenData.email,
      phone: citizenData.phone,
    });
    openCitizenProfileUpdate.current.showModal();
  };

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = citizenInfo.photoURL;
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

      const res = await axiosSecure.patch("/citizen/update", updateInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
        openCitizenProfileUpdate.current.close();
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

 const handleSubscribe = async () => {
  try {
    // Backend expects citizenId, not reportId
    const subscribeInfo = {
      citizenId: citizen._id,  
      email: citizen.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const res = await axiosSecure.post(
      "/create-checkout-subscribe",
      subscribeInfo
    );

    if (res?.data?.url) {
      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Failed to create checkout session. Please try again.",
      });
    }
    refetch();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!",
    });
  }
};


  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Blocked Warning */}
        {isBlocked && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 shadow-xl animate-pulse">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-red-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Account Blocked</h3>
                <p className="text-red-700">Your account has been temporarily blocked by the admin. Please contact the authorities for assistance.</p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Welcome Back,{" "}
                <span className="text-yellow-300">{citizen.displayName}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Manage your submitted issues, track progress, and stay updated with your subscription status all in one place.
              </p>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-white/90 text-sm md:text-base">
                  <strong className="text-white">Free users</strong> can report up to 3 issues. Premium users enjoy unlimited submissions and priority support.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={citizen.photoURL || "https://via.placeholder.com/150"}
                alt="Citizen"
                className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Report Public Issues",
              description: "Easily report problems like road damage, drainage issues, streetlight failures, or garbage concerns in your area. Your report helps authorities take action faster.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Track Issue Progress",
              description: "Monitor the status of your submitted issues in real-time. See whether your report is pending, in progress, or successfully resolved.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Citizen Responsibility",
              description: "As a responsible citizen, your participation improves transparency and helps build a safer, cleaner, and more sustainable community for everyone.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <img
                src={citizen.photoURL}
                alt="Citizen"
                className="relative h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase">
                  {citizen.displayName}
                </h2>
                {isPremium && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                    <span>🌟</span>
                    <span>Premium</span>
                  </span>
                )}
              </div>
              <div className="space-y-2 text-white/90">
                <p className="flex items-center justify-center lg:justify-start gap-2 text-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {citizen.email}
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-2 text-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {citizen.phone}
                </p>
              </div>
              <p className="text-white/80 text-sm md:text-base bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                Track your submitted issues, see progress updates, and view your payments.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => openUpdateModal(citizen)}
                className="btn bg-white text-indigo-600 hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Info
              </button>
              <button
                onClick={handleSubscribe}
                disabled={isBlocked || isPremium}
                className={`btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-none shadow-xl px-8 ${
                  isPremium || isBlocked
                    ? "cursor-not-allowed opacity-50"
                    : "hover:shadow-2xl hover:scale-105 transition-all duration-300"
                }`}
              >
                {isPremium ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Already Subscribed
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Subscribe (1000)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        <dialog
          ref={openCitizenProfileUpdate}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box p-8 rounded-3xl bg-white shadow-2xl max-w-md">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Update Profile
              </h3>
              <p className="text-sm text-slate-600">
                Keep your profile information up-to-date to ensure smooth management of your submissions.
              </p>
            </div>

            <div className="space-y-5" onSubmit={handleSubmit(handleUpdateProfile)}>
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Name is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-slate-700 font-semibold text-sm">
                  Profile Photo
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full rounded-xl"
                  {...register("photo")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700 font-semibold text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Email is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-slate-700 font-semibold text-sm">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone"
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  {...register("phone")}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Phone is required
                  </span>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="btn flex-1 btn-outline rounded-xl hover:bg-slate-100"
                  onClick={() => openCitizenProfileUpdate.current.close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(handleUpdateProfile)}
                  className="btn flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none rounded-xl hover:shadow-lg"
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

export default CitizenProfile;