import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaHeading, FaTag, FaImage, FaMapMarkerAlt, FaAlignLeft, FaSave } from "react-icons/fa";
import Loading from "../Loading/Loading";

const Edit = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: issue,isLoading,error } = useQuery({
        queryKey: ['report', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/reports/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (issue) {
            reset({
                title: issue.title,
                category: issue.category,
                location: issue.location,
                description: issue.description,
            });
        }
    }, [issue, reset]);

    const handleReportEdit = data => {
        axiosSecure.patch(`/reports/${issue._id}`, data)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Edit successful 🎉",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(-1);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response?.data?.message || err.message || 'Something went wrong!',
                });
            });
    };

    const categories = [
        { value: "Road", icon: "🛣️" },
        { value: "Drainage", icon: "💧" },
        { value: "Streetlights", icon: "💡" },
        { value: "Water", icon: "🚰" },
        { value: "Garbage", icon: "🗑️" },
        { value: "Footpaths", icon: "🚶" }
    ];

    if(isLoading)return<Loading/>
    if (error) return <p className="text-center text-red-500">Failed to load report</p>;

    return (
        <section className="relative py-5 md:py-14 overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-4 md:mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-2 md:mb-4">
                        <FaEdit className="text-blue-600 animate-pulse" />
                        <span className="text-blue-700 font-semibold text-xs uppercase tracking-wide">
                            Update Report
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 md:mb-4">
                        Edit Issue
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base">
                        Update the details of your infrastructure issue report
                    </p>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mx-auto mt-1 md:mt-4"></div>
                </div>

                {/* Form Container */}
                <div 
                    className="bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border-2 border-white/50 overflow-hidden"
                    style={{ animation: 'fadeInUp 0.6s ease-out' }}
                >
                    {/* Form Header Accent */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit(handleReportEdit)} className="p-4 md:p-10 space-y-2 md:space-y-6">
                        {/* Title Field */}
                        <div className="space-y-1 md:space-y-2">
                            <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                <FaHeading className="text-blue-600" />
                                Issue Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                {...register("title", { required: true })}
                                placeholder="Enter a clear, descriptive title"
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                            />
                            {errors.title?.type === "required" && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    Title is required
                                </p>
                            )}
                        </div>

                        {/* Category Field */}
                        <div className="space-y-1 md:space-y-2">
                            <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                <FaTag className="text-indigo-600" />
                                Category
                            </label>
                            <select
                                name="category"
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
                                {...register("category", { required: true })}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.icon} {cat.value}
                                    </option>
                                ))}
                            </select>
                            {errors.category?.type === "required" && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    Category is required
                                </p>
                            )}
                        </div>

                        {/* Image Upload Field */}
                         {issue?.imageURL && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                    <FaImage className="text-purple-600" />
                                    Current Image
                                </label>
                                <div className="relative rounded-lg overflow-hidden border-2 border-purple-200 shadow-lg group">
                                    <img 
                                        src={issue.imageURL} 
                                        alt={issue.title || "Issue"} 
                                        className="w-full h-36 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm font-medium">Current issue image</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Location Field */}
                        <div className="space-y-1 md:space-y-2">
                            <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                <FaMapMarkerAlt className="text-pink-600" />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Area, Street, Landmark"
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none"
                                {...register("location", { required: true })}
                            />
                            {errors.location?.type === "required" && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    Location is required
                                </p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-1 md:space-y-2">
                            <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                <FaAlignLeft className="text-green-600" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none resize-none"
                                placeholder="Provide detailed information about the issue..."
                                rows="5"
                                {...register("description", { required: true })}
                            ></textarea>
                            {errors.description?.type === "required" && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    Description is required
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="group w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-2 md:py-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                        >
                            <FaSave className="transform group-hover:rotate-12 transition-transform duration-300" />
                            <span>Save Changes</span>
                        </button>
                    </form>

                    {/* Bottom Accent */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                </div>

                {/* Info Card */}
                <div className="mt-4 md:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 text-center">
                    <p className="text-slate-600 text-sm">
                        💡 <strong>Tip:</strong> Make sure all information is accurate before submitting. You can't update the image.
                    </p>
                </div>

                {/* Bottom decorative dots */}
                <div className="flex justify-center mt-4 md:mt-8 gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
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
        </section>
    );
};

export default Edit;