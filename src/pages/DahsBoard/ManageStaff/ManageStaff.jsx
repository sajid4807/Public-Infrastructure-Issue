import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaUserEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const ManageStaff = () => {
  const createStaffModalRef = useRef();
  const updateStaffModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [selectedStaff, setSelectedStaff] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: staffs = [], refetch,isLoading } = useQuery({
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

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="">
      {/* ================= HEADER ================= */}
      <div className="my-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Staff
          </h2>
          <p className="text-sm font-bold text-gray-500">
            Total Staff: {staffs.length}
          </p>
        </div>

        <button
          onClick={openStaffCreateModal}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-white font-semibold shadow-md hover:opacity-90"
        >
          <FaPlus /> Add Staff
        </button>
      </div>

      {/* ================= DESKTOP / TABLET TABLE ================= */}
      <div className="hidden md:block rounded-2xl bg-white shadow-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">SL NO.</th>
                <th className="px-6 py-4 text-left">Staff</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 hidden lg:table-cell">Phone</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {staffs.map((staff, index) => (
                <tr key={staff._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={staff.photoURL}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{staff.displayName}</p>
                      <p className="text-xs text-gray-400">Staff</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">{staff.email}</td>

                  <td className="px-6 py-4 hidden lg:table-cell">
                    {staff.phone}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => openStaffUpdateModal(staff)}
                        className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-indigo-600 hover:bg-indigo-100"
                      >
                        <FaUserEdit /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteUser(staff._id)}
                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-red-600 hover:bg-red-100"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {staffs.map((staff) => (
          <div
            key={staff._id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={staff.photoURL}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{staff.displayName}</p>
                <p className="text-xs text-gray-500">{staff.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">📞 {staff.phone}</p>

            <div className="flex gap-2">
              <button
                onClick={() => openStaffUpdateModal(staff)}
                className="flex-1 rounded-xl bg-indigo-50 py-2 text-indigo-600 font-medium"
              >
                Update
              </button>

              <button
                onClick={() => handleDeleteUser(staff._id)}
                className="flex-1 rounded-xl bg-red-50 py-2 text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CREATE STAFF MODAL ================= */}
      <dialog ref={createStaffModalRef} className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Add New Staff</h3>

          <form className="space-y-3">
            <input className="input input-bordered w-full" placeholder="Name" />
            <input type="file" className="file-input w-full" />
            <input
              className="input input-bordered w-full"
              placeholder="Phone"
            />
            <input
              className="input input-bordered w-full"
              placeholder="Email"
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
            />

            <button className="w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold">
              Register Staff
            </button>
          </form>

          <form method="dialog" className="mt-3 text-right">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </dialog>

      {/* ================= UPDATE STAFF MODAL ================= */}
      <dialog ref={updateStaffModalRef} className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Update Staff</h3>
          <form
            onSubmit={handleSubmit(handleUpdateStaff)}
            className="space-y-3"
          >
            <input
              {...register("name")}
              className="input input-bordered w-full"
            />
            <input
              type="file"
              {...register("photo")}
              className="file-input w-full"
            />
            <input
              {...register("phone")}
              className="input input-bordered w-full"
            />

            <button className="w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold">
              Update Staff
            </button>
          </form>

          <form method="dialog" className="mt-3 text-right">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStaff;