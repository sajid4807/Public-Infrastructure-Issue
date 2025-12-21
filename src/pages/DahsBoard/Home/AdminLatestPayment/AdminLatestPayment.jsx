import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const AdminLatestPayment = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payment");
      return res.data.slice(0, 6); // latest 6 payments
    },
  });

  if (isLoading) return <Loading />;

  if (payments.length === 0) {
    return (
      <div className="my-10 md:my-14 text-center text-gray-500">
        No payments found.
      </div>
    );
  }

  return (
    <div className="my-10 md:my-14">
      {/* Header */}
      <h2 className="text-2xl mb-4 md:text-3xl font-bold text-gray-800">
        Latest Payment
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="flex items-center bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={payment.photoURL || "/default-profile.png"}
                alt={payment.displayName || "User"}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-4 flex-1 flex flex-col gap-1">
              <h3 className="text-gray-800 font-semibold text-lg line-clamp-1">
                {payment.displayName || "Unknown User"}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-1">
                {payment.email || "-"}
              </p>

              <p className="text-gray-500 text-sm">
                Amount: {payment.amount} {payment.currency.toUpperCase()}
              </p>

<p className="text-gray-500 text-sm flex items-center gap-2">
  <span
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
      ${
        payment.type === "boost"
          ? "bg-green-100 text-green-700"
          : "bg-indigo-100 text-indigo-700"
      }
    `}
  >
    {payment.type === "boost" ? "🚀 Issue Boost" : "🌟 Premium Subscription"}
  </span>
</p>



              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {payment.createdAt
                    ? new Date(payment.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLatestPayment;
