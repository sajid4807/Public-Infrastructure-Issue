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

    const axiosSecure =useAxiosSecure()
    const{user}=useAuth()
    const openCitizenProfileUpdate = useRef()

    const [citizenInfo,setCitizenInfo]=useState(null)

    const {register,formState:{errors},handleSubmit,reset}=useForm()
    const [searchParams] = useSearchParams();
   const sessionId = searchParams.get("session_id");

  //   const [searchParams] =useSearchParams()
  //  const sessionId = searchParams.get("session_id")

    const {data: citizen={},refetch,isLoading} =useQuery({
        queryKey:['citizen-profile'],
        queryFn: async ()=>{
            const res =await axiosSecure.get(`/citizen/profile`)
            return res.data
        }
    })

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
      axiosSecure.patch("/confirm-subscribe", { sessionId })
      .then(()=>{
        refetch()
      })
    }
  }, [sessionId,axiosSecure,refetch]);


    const openUpdateModal= (citizenData)=>{
        setCitizenInfo(citizenData)
        reset({
      name: citizenData.displayName,
      email: citizenData.email,
      phone: citizenData.phone,
    });
        openCitizenProfileUpdate.current.showModal()
    }

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


  const handleSubscribe = async()=>{

      try {

        const subscribeInfo = {
  citizenId: citizen._id, 
  email: citizen.email,
  displayName:user.displayName,
  photoURL:user.photoURL
};
        const res = await axiosSecure.post('/create-checkout-subscribe', subscribeInfo);
    
        if (res?.data?.url) {
          // Redirect to checkout page
          window.location.href = res.data.url;
          // refetch()
        } else {
          // Handle unexpected response
          Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: 'Failed to create checkout session. Please try again.',
          });
        }
        refetch();
      } catch (error) {
        // Handle network/server errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.message || 'Something went wrong!',
        });
      }
  }

  if(isLoading) return<Loading/>;

    return (
       <div className="max-w-6xl mx-auto my-8 md:my-12 space-y-8">

  {/* ===== Blocked Warning ===== */}
  {isBlocked && (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 shadow-sm">
      ⚠️ Your account has been temporarily blocked by the admin. Please contact the authorities for assistance.
    </div>
  )}

  {/* ===== Welcome Banner ===== */}

  <div className="bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
    <div className="flex-1 space-y-2 md:space-y-0 md:mr-6 text-center md:text-left">
      <h1 className="text-3xl md:text-4xl  font-bold">Welcome Back <span className="">{citizen.displayName}</span> </h1>
      <p className="text-md md:text-lg opacity-90">
        Manage your submitted issues, track progress, and stay updated with your subscription status all in one place.
      </p>
      <p className="text-sm md:text-md opacity-80 mt-2">
        ⭐ <strong>Free users</strong> can report up to 3 issues. Premium users enjoy unlimited submissions.
      </p>
    </div>
    <img
      src={citizen.photoURL || "https://via.placeholder.com/150"}
      alt="Citizen"
      className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white object-cover shadow-md"
    />
  </div>

<div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* ===== Report Issues ===== */}
  <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Report Public Issues
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Easily report problems like road damage, drainage issues, streetlight failures,
      or garbage concerns in your area. Your report helps authorities take action faster.
    </p>
  </div>

  {/* ===== Track Progress ===== */}
  <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Track Issue Progress
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Monitor the status of your submitted issues in real-time. See whether your report
      is pending, in progress, or successfully resolved.
    </p>
  </div>

  {/* ===== Citizen Responsibility ===== */}
  <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Citizen Responsibility
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      As a responsible citizen, your participation improves transparency and helps build
      a safer, cleaner, and more sustainable community for everyone.
    </p>
  </div>

  {/* ===== Premium Benefits ===== */}
  {/* <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Premium Access
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Premium users can submit unlimited reports and boost important issues to get faster
      attention from authorities.
    </p>
  </div> */}

  {/* ===== Secure & Transparent ===== */}
  {/* <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Secure & Transparent System
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      All reports, updates, and actions are securely managed to ensure fairness,
      accountability, and transparency across the platform.
    </p>
  </div> */}

  {/* ===== Community Impact ===== */}
  {/* <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Community Impact
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Every valid report contributes to real-world improvements. Together, citizens
      and authorities can create better public infrastructure.
    </p>
  </div> */}

</div>



  {/* ===== Profile Card ===== */}
  <div className="flex flex-col md:flex-row items-center gap-6 
      bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 
      p-6 rounded-3xl text-white shadow-xl">
    <img
      src={citizen.photoURL}
      alt="Citizen"
      className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white object-cover shadow-md"
    />
    <div className="flex-1 text-center md:text-left space-y-1">
      <h2 className="text-2xl uppercase flex items-center md:text-3xl font-bold">
        {citizen.displayName}
        {isPremium && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold ml-2">
            🌟 Premium
          </span>
        )}
      </h2>
      <p className="text-md md:text-lg">{citizen.email}</p>
      <p className="text-sm md:text-md">{citizen.phone}</p>
      <p className="text-sm opacity-80 mt-1">
        Track your submitted issues, see progress updates, and view your payments.
      </p>
    </div>

    <div className="flex items-center md:flex-col gap-3">
      <button
        onClick={() => openUpdateModal(citizen)}
        className="btn bg-white text-indigo-600 hover:bg-gray-100 md:mt-0 shadow-lg"
      >
        Update Info
      </button>
      <div >
  <div >
  <button
    onClick={handleSubscribe}
    disabled={isBlocked || isPremium}
    className={`btn w-full md:w-auto bg-white text-indigo-600 shadow-lg
      ${isPremium || isBlocked
        ? "cursor-not-allowed opacity-50"
        : "hover:bg-gray-100"}
    `}
  >
    {isPremium ? "Already Subscribed" : "Subscribe (1000)"}
  </button>
</div>
</div>


    </div>
  </div>


  {/* ===== Update Modal ===== */}
  <dialog ref={openCitizenProfileUpdate} className="modal modal-bottom sm:modal-middle">
    <div className="modal-box p-6 rounded-2xl bg-white shadow-xl">
      <h3 className="text-xl text-center font-bold text-gray-800 mb-2">Update Profile</h3>
      <p className="text-sm text-gray-500 text-center mb-4">
        Keep your profile information up-to-date to ensure smooth management of your submissions and notifications.
      </p>
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
            onClick={() => openCitizenProfileUpdate.current.close()}
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

export default CitizenProfile;