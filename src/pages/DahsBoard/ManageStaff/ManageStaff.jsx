import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaUserEdit, FaTrash, FaUsers, FaEnvelope, FaPhone, FaIdBadge, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const ManageStaff = () => {
  const createStaffModalRef = useRef();
  const updateStaffModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: staffs = [], refetch, isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff");
      return res.data;
    },
  });

  /* ================= MODAL HANDLERS ================= */

  const openStaffCreateModal = () => {
    createStaffModalRef.current.showModal();
  };

  const openStaffUpdateModal = (staff) => {
    setSelectedStaff(staff);
    reset({
      name: staff.displayName,
      phone: staff.phone,
    });
    updateStaffModalRef.current.showModal();
  };

  /* ================= UPDATE STAFF ================= */

  const handleUpdateStaff = async (data) => {
    try {
      let photoURL = selectedStaff.photoURL;

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
        phone: data.phone,
        photoURL,
      };

      const res = await axiosSecure.patch(
        `/staff/${selectedStaff._id}`,
        updateInfo
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Staff updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        updateStaffModalRef.current.close();
        refetch();
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

  /* ================= DELETE STAFF ================= */

  const handleDeleteUser = (staffId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/staff/${staffId}`)
          .then(() => {
            refetch();
            Swal.fire("Deleted!", "Staff has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete staff.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredStaffs = staffs.filter(staff => 
    staff.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ================= HEADER WITH STATS ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaUsers className="text-3xl text-purple-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Manage Staff
                </h2>
              </div>
              <p className="text-sm text-gray-600 ml-11">
                Manage your team members and their information
              </p>
            </div>

            <button
              onClick={openStaffCreateModal}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all min-h-[44px]"
            >
              <FaPlus /> Add New Staff
            </button>
          </div>
        </div>

        {/* ================= STATS CARD ================= */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Staff Members</p>
              <p className="text-4xl font-bold">{staffs.length}</p>
              <p className="text-purple-100 text-xs mt-1">Active team members</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <FaIdBadge className="text-5xl" />
            </div>
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* ================= DESKTOP TABLE VIEW ================= */}
        {!isMobile && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      SL
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaffs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        No staff members found.
                      </td>
                    </tr>
                  ) : (
                    filteredStaffs.map((staff, index) => (
                      <tr key={staff._id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={staff.photoURL}
                                alt={staff.displayName}
                                className="h-14 w-14 rounded-full object-cover ring-4 ring-purple-200"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{staff.displayName}</p>
                              <p className="text-xs text-purple-600 font-semibold flex items-center gap-1">
                                <FaIdBadge /> Staff Member
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <FaEnvelope className="text-purple-500" />
                              <span className="font-medium">{staff.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <FaPhone className="text-pink-500" />
                              <span className="font-medium">{staff.phone}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => openStaffUpdateModal(staff)}
                              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                            >
                              <FaUserEdit /> Edit
                            </button>

                            <button
                              onClick={() => handleDeleteUser(staff._id)}
                              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= MOBILE CARD VIEW ================= */}
        {isMobile && (
          <div className="space-y-4">
            {filteredStaffs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
                No staff members found.
              </div>
            ) : (
              filteredStaffs.map((staff, index) => (
                <div
                  key={staff._id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 border-purple-500"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={staff.photoURL}
                            alt={staff.displayName}
                            className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {staff.displayName}
                          </h3>
                          <span className="text-xs text-purple-100 font-semibold flex items-center gap-1">
                            <FaIdBadge /> Staff Member
                          </span>
                        </div>
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3">
                      <FaEnvelope className="text-purple-500 mt-1 flex-shrink-0 text-lg" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Email Address</p>
                        <p className="text-sm text-gray-800 font-medium break-all">{staff.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-pink-50 rounded-lg p-3">
                      <FaPhone className="text-pink-500 mt-1 flex-shrink-0 text-lg" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Phone Number</p>
                        <p className="text-sm text-gray-800 font-medium">{staff.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 p-4 flex gap-3">
                    <button
                      onClick={() => openStaffUpdateModal(staff)}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <FaUserEdit />
                      Update
                    </button>

                    <button
                      onClick={() => handleDeleteUser(staff._id)}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= CREATE STAFF MODAL ================= */}
        <dialog ref={createStaffModalRef} className="modal">
          <div className="modal-box rounded-2xl max-w-md">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 -m-6 mb-4 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaPlus /> Add New Staff Member
              </h3>
            </div>

            <form className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                <input className="input input-bordered w-full" placeholder="Enter staff name" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Profile Photo</label>
                <input type="file" className="file-input file-input-bordered w-full" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                <input className="input input-bordered w-full" placeholder="Enter phone number" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Email Address</label>
                <input className="input input-bordered w-full" placeholder="Enter email" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Password</label>
                <input type="password" className="input input-bordered w-full" placeholder="Create password" />
              </div>

              <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Register Staff
              </button>
            </form>

            <form method="dialog" className="mt-4">
              <button className="btn btn-sm btn-ghost w-full">Close</button>
            </form>
          </div>
        </dialog>

        {/* ================= UPDATE STAFF MODAL ================= */}
        <dialog ref={updateStaffModalRef} className="modal">
          <div className="modal-box rounded-2xl max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 -m-6 mb-4 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaUserEdit /> Update Staff Information
              </h3>
            </div>

            <form onSubmit={handleSubmit(handleUpdateStaff)} className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                <input {...register("name")} className="input input-bordered w-full" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Update Photo</label>
                <input type="file" {...register("photo")} className="file-input file-input-bordered w-full" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                <input {...register("phone")} className="input input-bordered w-full" />
              </div>

              <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Update Staff
              </button>
            </form>

            <form method="dialog" className="mt-4">
              <button className="btn btn-sm btn-ghost w-full">Close</button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageStaff;