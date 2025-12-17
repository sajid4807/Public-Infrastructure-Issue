import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, profileUpdate } = useAuth();
  const axiosSecure =useAxiosSecure()
    const navigate = useNavigate()


  const handleRegister = (data) => {
    // console.log(data.photo[0])
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user)
        const formData = new FormData();
        formData.append("image", profileImg);
        //  "https://api.imgbb.com/1/upload?key=YOUR_CLIENT_API_KEY"
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_host
            }`,
            formData
          )
          .then((res) => {
              const photoURL = res.data.data.url

              const userInfo ={
            email:data.email,
            displayName:data.name,
            photoURL:photoURL,
            role:data.role
          }
          // create user in the database
          axiosSecure.post('/users',userInfo)
          .then(res => {
            if(res.data.insertedId){
              console.log('create user in the database',res.data)
             }
          })

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            profileUpdate(userProfile)
              .then(() => {
                console.log("user profile updata done");
                Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Successfully Register",
                      showConfirmButton: false,
                      timer: 2000,
                    });
            navigate(location.state || '/')
              })
              .then((error) => {
                console.log(error.message);
              });

            // console.log('after saving data',res.data)
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex justify-between my-10 md:my-20">
      <div className="bg-base-100 rounded-2xl shadow-2xl w-1/3">
        <h3 className="text-black text-3xl mb-1 font-bold text-center mt-3">
          Create An Account
        </h3>
        <p className="text-center">Public Infrastructure Issue</p>
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            {/* name */}
            <label className="label text-black font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500"> Name is required</p>
            )}
            {/* image filed */}

            <label className="label text-black font-medium">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
              placeholder="Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500"> Photo is required</p>
            )}
            {/* email */}
            <label className="label text-black font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500"> Email is required</p>
            )}
            {/* Role selection */}
            {/* <label className="label text-black font-medium">Role</label>
            <select
              {...register("role", { required: true })}
                defaultValue=""
              className="select select-border w-full mb-3"
              
            >
              <option value="" disabled>Select role</option>
              <option value="Citizen">Citizen</option>
              <option value="Staff">Staff</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>} */}

            {/* password filed */}
            <label className="label text-black font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 Characters or longer{" "}
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                "Password must contain uppercase, lowercase, number, special
                character, and be at least 8 characters long."
              </p>
            )}
            <button className="btn w-full btn-glow mt-4">Register</button>
          </fieldset>
          <p>
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-blue-500 underline"
              to="/login"
            >
              Login
            </Link>{" "}
          </p>
        </form>
        <SocialLogin />
      </div>
      <div className="w-2/3"></div>
    </div>
  );
};

export default Register;
