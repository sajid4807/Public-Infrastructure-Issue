import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {

    // const {register,handleSubmit,formState:{errors}} =useForm()

    const location =useLocation()
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIN } = useAuth();
  const handleLogin = (data) => {
    signIN(data.email, data.password)
      .then((res) => {
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Successfully Login Public Infrastructure Issue",
  showConfirmButton: false,
  timer: 1500
});

        navigate(location?.state || '/')
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
        const error =err.message
        Swal.fire({
  position: "top-end",
  icon: "error",
  title: error,
  showConfirmButton: false,
  timer: 1500
});
      });
  };
    // const handleLogin =(data)=>{

    // }

    return (
        <div className="flex justify-between my-10 md:my-20">
            <div className="bg-base-100 rounded-2xl shadow-2xl w-1/3">
      <h3 className="text-black text-3xl mb-1 font-bold text-center mt-3">
        Welcome Back
      </h3>
      <p className="text-center">Login with Public Infrastructure Issue</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input bg-transparent w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input bg-transparent w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              password must be 6 Characters or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-glow mt-4">Login</button>
        </fieldset>
        <p>
          New to Public Infrastructure Issue?{" "}
          <Link state={location?.state} className="text-blue-500 underline" to="/register">
            Register
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
            <div className="w-2/3"></div>
        </div>
    );
};

export default Login;