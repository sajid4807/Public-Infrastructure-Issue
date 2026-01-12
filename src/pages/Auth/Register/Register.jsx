import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import registerAnimation from '../../../assets/lottie/register.json';
import Lottie from "lottie-react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, profileUpdate } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation()

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_host
            }`,
            formData
          )
          .then((res) => {
            const photoURL = res.data.data.url;

            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
              phone: data.phone
            };
            axiosSecure.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  // console.log('create user in the database',res.data)
                }
              });

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            profileUpdate(userProfile)
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Successfully Register",
                  showConfirmButton: false,
                  timer: 2000,
                });
                navigate(location.state || '/');
                window.location.reload();
              })
              .catch((error) => {
                const message = error.message;
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: message,
                  showConfirmButton: false,
                  timer: 2000,
                });
              });
          });
      })
      .catch((error) => {
        const message = error.message;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Side - Animation */}
          <div 
            className="w-full hidden lg:block lg:w-1/2 order-2 lg:order-1"
            style={{ animation: 'slideInLeft 0.8s ease-out' }}
          >
            <div className="relative">
              {/* Main animation container */}
              <div className="relative rounded-3xl border border-white/30 shadow-sm p-8">
                <Lottie
                  animationData={registerAnimation}
                  className="w-full h-[350px] md:h-[500px]"
                  loop={true}
                />
              </div>

              {/* Floating feature cards */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-indigo-100 transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">100% Secure</p>
                      <p className="text-xs text-slate-600">Data encrypted</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 hidden lg:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-purple-100 transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Quick Setup</p>
                      <p className="text-xs text-slate-600">2 min process</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-1/4 hidden lg:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-pink-100 transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Join 10K+</p>
                      <p className="text-xs text-slate-600">Active users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div 
            className="w-full lg:w-1/2 order-1 lg:order-2"
            style={{ animation: 'slideInRight 0.8s ease-out' }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-white/30">
              {/* Decorative gradient header */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 md:p-8 text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm  px-5 py-2 rounded-full md:mb-4 border border-white/30">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <span className="text-white font-bold text-xs uppercase tracking-wider">
                      Start Your Journey
                    </span>
                  </div>
                  
                  <h2 className="text-white text-xl md:text-5xl font-black my-2 md:mb-3 tracking-tight">
                    Join Us Today
                  </h2>
                  <p className="text-white/90 text-base max-w-md mx-auto">
                    Create your account and start reporting infrastructure issues
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mt-2 md:mt-4">
                    <div className="h-1 w-8 bg-white/50 rounded-full"></div>
                    <div className="h-1 w-16 bg-white rounded-full"></div>
                    <div className="h-1 w-8 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="p-4 md:p-8">
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                  {/* Name Field */}
                  <div className="relative group">
                    <label className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                      <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                        <FaUser className="text-white text-xs" />
                      </div>
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="w-full px-3 md:px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/50 group-hover:bg-white"
                      placeholder="John Doe"
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Name is required
                      </p>
                    )}
                  </div>

                  {/* Photo Field */}
                  <div className="relative group">
                    <label className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                      <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                        <FaImage className="text-white text-xs" />
                      </div>
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      {...register("photo", { required: true })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/50 group-hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white hover:file:scale-105 file:transition-transform file:cursor-pointer file:shadow-lg"
                    />
                    {errors.photo?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Photo is required
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                      <div className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                        <FaEnvelope className="text-white text-xs" />
                      </div>
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full px-3 md:px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/50 group-hover:bg-white"
                      placeholder="john@example.com"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Email is required
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="relative group">
                    <label className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                      <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                        <FaPhone className="text-white text-xs" />
                      </div>
                      Phone Number
                    </label>
                    <input
                      type="number"
                      {...register("phone", { required: true })}
                      className="w-full px-3 md:px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/50 group-hover:bg-white"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                    {errors.phone?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Phone is required
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <label className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                      <div className="p-1.5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
                        <FaLock className="text-white text-xs" />
                      </div>
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                      })}
                      className="w-full px-3 md:px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white/50 group-hover:bg-white"
                      placeholder="••••••••"
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Password is required
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Password must be 8+ characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Must include uppercase, lowercase, number & special char
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                  type="submit"
                    className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black py-3 md:py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-1 md:mt-4 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create My Account
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-slate-600 text-sm mt-1 md:mt-2">
                    Already have an account?{" "}
                    <Link
                      state={location.state}
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all"
                      to="/login"
                    >
                      Sign In →
                    </Link>
                  </p>
                </form>

                {/* Social Login */}
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-slate-500 font-bold text-sm">
                        Or sign up with
                      </span>
                    </div>
                  </div>
                <div className="mt-2 md:mt-4">
                    <SocialLogin />
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

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Register;