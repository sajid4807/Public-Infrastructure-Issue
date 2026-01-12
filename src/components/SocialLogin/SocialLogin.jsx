import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { singInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () => {
        singInGoogle()
            .then((res) => {
                const userInfo = {
                    email: res.user.email,
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL,
                };
                axiosSecure.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully Google Login Public Infrastructure Issue",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(location.state || '/');
                    });
            })
            .catch((err) => {
                const error = err.message;
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className='relative'>
           

            {/* Google Sign In Button */}
            <button
                onClick={handleGoogleSignIn}
                className="group relative w-full overflow-hidden rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 px-3 md:px-6 py-3 md:py-4 font-semibold text-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-1 md:gap-3">
                    {/* Google Icon with hover effect */}
                    <div className="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <svg 
                            aria-label="Google logo" 
                            width="20" 
                            height="20" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                    </div>

                    {/* Text */}
                    <span className="text-base font-medium md:font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        Continue with Google
                    </span>

                    {/* Arrow icon that slides in on hover */}
                    <svg 
                        className="w-5 h-5 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>

                {/* Bottom gradient accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Secured by Google OAuth 2.0</span>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </div>
    );
};

export default SocialLogin;