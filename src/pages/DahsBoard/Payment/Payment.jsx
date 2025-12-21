import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";





const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all"); // all, paid, unpaid

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payment");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Apply filter
  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter((p) => p.paymentStatus === filterStatus);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">All Payments</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-2 items-center">
        <span>Status Filter:</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md p-1"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Currency</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-4 text-gray-500"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{payment.displayName || "-"}</td>
                  <td className="border px-4 py-2">{payment.email || "-"}</td>
                  <td className="border px-4 py-2">{payment.amount}</td>
                  <td className="border px-4 py-2">{payment.currency.toUpperCase()}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      payment.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {payment.paymentStatus}
                  </td>
                  <td className="border px-4 py-2">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;

