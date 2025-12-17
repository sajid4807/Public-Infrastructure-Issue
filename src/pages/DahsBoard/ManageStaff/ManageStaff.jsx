import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageStaff = () => {
  const createStaffModalRef = useRef();
  const updateStaffModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [selectedStaff, setSelectedStaff] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: staffs = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const openStaffUpdateModal = (staff) => {
    setSelectedStaff(staff);

    reset({
      name: staff.displayName,
      phone: staff.phone,
    });

    updateStaffModalRef.current.showModal();
  };

  const openStaffCreateModal = () => {
    createStaffModalRef.current.showModal();
  };

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
      const message = error.message;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDeleteUser = (staffId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/staff/${staffId}`)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Staff has been deleted.",
              icon: "success",
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete staff.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="">
      <div className="flex my-5 justify-between">
        <h2 className="text-2xl  font-bold">Manage Staff {staffs.length}</h2>

        <button className="btn btn-glow" onClick={openStaffCreateModal}>
          + Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Role</th> */}
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={staff._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={staff.photoURL} alt="staff image" />
                    </div>
                  </div>
                </td>
                <td>{staff.displayName}</td>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                {/* <td>{staff.status}</td> */}
                <th>
                  <button
                    autoFocus
                    onClick={() => openStaffUpdateModal(staff)}
                    className="btn btn-glow"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(staff._id)}
                    className="btn btn-outline ms-2.5 rounded-lg"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Staff Modal */}
      <dialog
        ref={createStaffModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form className="">
            <fieldset className="">
              {/* name */}
              <label className="label text-black font-medium">Name</label>
              <input type="text" className="input w-full" placeholder="Name" />
              {/* image filed */}
              <label className="label text-black font-medium">Photo</label>
              <input
                type="file"
                className="file-input w-full"
                placeholder="Photo"
              />
              {/* phone no */}
              <label className="label mt-4 text-black font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                className="input w-full"
                placeholder="Phone Number"
              />
              {/* email */}
              <label className="label text-black font-medium">Email</label>
              <input className="input w-full" placeholder="Email" />
              {/* password filed */}
              <label className="label text-black font-medium">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
              />
              <button className="btn w-full btn-glow mt-4">
                Register Staff
              </button>
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* update staff user */}

      <dialog
        ref={updateStaffModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleUpdateStaff)} className="">
            <fieldset className="">
              {/* name */}
              <label className="label text-black font-medium">Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                placeholder="Name"
              />
              {/* image filed */}
              <label className="label text-black font-medium">Photo</label>
              <input
                type="file"
                {...register("photo")}
                className="file-input w-full"
                placeholder="Photo"
              />
              {/* phone no */}
              <label className="label mt-4 text-black font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                {...register("phone")}
                defaultValue=""
                className="input w-full"
                placeholder="Phone Number"
              />

              <button className="btn w-full btn-glow mt-4">Update</button>
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStaff;
