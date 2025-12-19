import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [],refetch,isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

const handleBlockUser = (userId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This citizen will be blocked and cannot access the system!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, block citizen",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .patch(`/users/block/${userId}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Blocked!",
              text: "citizen has been blocked successfully.",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text:
              error.response?.data?.message ||
              "Failed to block the citizen. Try again.",
          });
        });
    }
  });
};


 const handleUnBlockUser = (userId) => {
  Swal.fire({
    title: "Unblock citizen?",
    text: "This citizen will regain access.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, unblock",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.patch(`/users/unblock/${userId}`).then(() => {
        Swal.fire("Unblocked!", "citizen access restored.", "success");
        refetch();
      });
    }
  });
};

if(isLoading)return <Loading/>;


  return (
    <div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Manage Citizen
        </h2>
        <p className="text-sm font-bold text-gray-500">
          Total Citizen: {users.length}
        </p>
      </div>
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
        <th>Subscription Info</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index) =>
        <tr key={user._id}>
        <td>{index +1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt="user image" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
            {user.displayName}
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>subscription info</td>
        <th>
          {user.isBlocked ? (
  <button
    onClick={() => handleUnBlockUser(user._id)}
    className="btn btn-sm btn-success"
  >
    Unblock
  </button>
) : (
  <button
    onClick={() => handleBlockUser(user._id)}
    className="btn btn-sm btn-error"
  >
    Block
  </button>
)}
        </th>
      </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default ManageUsers;
