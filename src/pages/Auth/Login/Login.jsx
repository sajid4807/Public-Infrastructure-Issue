import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import loginAnimation from '../../../../src/assets/lottie/login.json';
import Lottie from "lottie-react";
import { useState } from "react";
import useRole from "../../../hooks/useRole";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {role}=useRole()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signIN } = useAuth();

const handleLogin = (data) => {
  setLoading(true);

  signIN(data.email, data.password)
    .then(() => {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Logged in!",
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Redirect based on role
      if (role === "staff") {
        navigate("/dashboard/staff-home");
      } else {
        navigate(location?.state || "/");  
      }
    })
    .catch((err) => {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};


  return (
    <div className=" py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Side - Login Form */}
          <div 
            className="w-full lg:w-1/2 "
            style={{ animation: 'slideInLeft 0.8s ease-out' }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-white/30 p-6 md:p-10">
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-2 md:mb-4 border border-indigo-200">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
                    </span>
                    <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">Secure Login</span>
                  </div>
                  <h3 className="text-xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 md:mb-3">
                    Welcome Back
                  </h3>
                  <p className="text-slate-600 text-base">
                    Login to Public Infrastructure System
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 md:mt-4">
                    <div className="h-1 w-8 bg-indigo-500/50 rounded-full"></div>
                    <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                    <div className="h-1 w-8 bg-pink-500/50 rounded-full"></div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="space-y-3 md:space-y-5">
                    {/* Email Field */}
                    <div className="relative group">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-3 bg-white/50 group-hover:bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 placeholder-slate-400 text-slate-700 transition-all"
                        placeholder="Enter your email"
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 animate-shake">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Email is required
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password", { required: true, minLength: 8 })}
                        className="w-full px-4 py-3 bg-white/50 group-hover:bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 placeholder-slate-400 text-slate-700 transition-all"
                        placeholder="Enter your password"
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 animate-shake">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Password is required
                        </p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 animate-shake">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Password must be 8+ characters
                        </p>
                      )}
                    </div>

                    {/* Login Button */}
                    <button 
                      className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login to Account
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Demo Credentials */}
                    {/* Demo Credentials */}
<div className="space-y-2 pt-3">
  <p className="text-xs text-center text-slate-500 font-semibold uppercase tracking-wide">Quick Demo Credentials</p>
  <div className="grid grid-cols-3 gap-2">
    <button
      type="button"
      onClick={() => {
        const demoData = { email: "sajid@gmail.com", password: "$#@Jid4807" };
        reset(demoData);
        handleSubmit(handleLogin)(demoData); // auto-submit after filling
      }}
      className="px-3 py-2 md:py-4 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-800 font-bold text-xs rounded-lg transition-all hover:scale-105 shadow-sm"
    >
      👨‍💼 Admin
    </button>

    <button
      type="button"
      onClick={() => {
        const demoData = { email: "nurahmad@gmail.com", password: "$#@Jid4807" };
        reset(demoData);
        handleSubmit(handleLogin)(demoData);
      }}
      className="px-3 py-2 md:py-4 bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-800 font-bold text-xs rounded-lg transition-all hover:scale-105 shadow-sm"
    >
      👤 Citizen
    </button>

    <button
      type="button"
      onClick={() => {
        const demoData = { email: "shole@gmail.com", password: "$#@Jid4807" };
        reset(demoData);
        handleSubmit(handleLogin)(demoData);
      }}
      className="px-3 py-2 md:py-4 bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-800 font-bold text-xs rounded-lg transition-all hover:scale-105 shadow-sm"
    >
      👷 Staff
    </button>
  </div>
</div>

                  </div>

                  {/* Register Link */}
                  <p className="text-center mt-4 md:mt-6 text-sm text-slate-600">
                    New to the platform?{" "}
                    <Link
                      state={location?.state}
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all"
                      to="/register"
                    >
                      Create Account →
                    </Link>
                  </p>
                </form>

                {/* Social Login */}
                <div className="mt-2 md:mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-slate-500 font-bold text-sm">Or continue with</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-4">
                    <SocialLogin />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Animation */}
          <div 
            className="w-full hidden lg:flex lg:w-7/12 xl:w-6/12 items-center justify-center"
            style={{ animation: 'slideInRight 0.8s ease-out' }}
          >
            <div className="relative w-full max-w-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-75"></div>
              
              <div className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/30 shadow-sm p-8">
                <Lottie
                  animationData={loginAnimation}
                  loop={true}
                  className="w-full h-auto max-h-[500px]"
                />
              </div>

              {/* Feature badges */}
              <div className="absolute -left-4 top-1/4 transform -translate-y-1/2 hidden xl:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-green-100 hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Secure Login</p>
                      <p className="text-xs text-slate-600">256-bit encryption</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 transform translate-y-1/2 hidden xl:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-blue-100 hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Fast Access</p>
                      <p className="text-xs text-slate-600">Instant login</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;