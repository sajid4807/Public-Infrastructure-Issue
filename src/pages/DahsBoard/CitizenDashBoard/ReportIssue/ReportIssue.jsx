import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";

const ReportIssue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
//   const [userStatus, setUserStatus] = useState({
//     isBlocked: false,
//     isPremium: false,
//   });
//   const [isLimitReached, setIsLimitReached] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {data: userStatus ={}, isLoading}=useQuery({
    queryKey:['user-status'],
    queryFn:async ()=>{
        const res = await axiosSecure.get('/user/status')
        return res.data;
    }
  })

  const {data:issueCountData ={count:0}} =useQuery({
    queryKey:['my-issue-count'],
    queryFn:async ()=>{
      if (userStatus.isPremium) return { count: 0 }
        const res = await axiosSecure.get('/my-reports/count')
        return res.data;
    },
    // {enabled: !!userStatus}
  })

//   const { data: issueCountData = { count: 0 } } = useQuery({
//     queryKey:['my-issue-count'],
//     queryFn:async ()=>{
//       if (userStatus.isPremium) return { count: 0 }
//         const res = await axiosSecure.get('/my-report')
//         return res.data;
//     },
//     // {enabled: !!userStatus}

//   )}

    const isLimitReached = !userStatus?.isPremium && issueCountData.count >= 3;

  const handleIssueSubmit = (data) => {
      if (isLimitReached) return;
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
          email: user.email,
          imageURL: imageURL,
          status: "pending",
          priority: "normal",
          createdAt: new Date(),
        };

        axiosSecure
          .post("/reports", reportInfo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Report Has Been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/citizen-report");
            reset();
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
      });
  };

  if(isLoading) return <Loading/>;

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
        {/* 🚫 Free user limit reached */}
       {!userStatus.isPremium && isLimitReached ? (
          <div className="space-y-2">
            <button disabled className="btn w-full opacity-80 cursor-not-allowed">
              Issue Limit Reached
            </button>
            <button onClick={() => navigate("/profile")} className="btn btn-warning text-black w-full">
              Upgrade to Premium
            </button>
          </div>
        ) : (
          <button className="btn btn-glow w-full">Issue Submit</button>
        )}
      </form>
    </div>
  );
};

export default ReportIssue;
