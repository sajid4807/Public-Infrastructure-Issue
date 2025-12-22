import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const AdminLatestPayment = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/latest/payments");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (payments.length === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 pb-10 md:pb-14">
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-12 text-center border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Payments Yet</h3>
            <p className="text-slate-600">Payment transactions will appear here once users start making purchases.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
              Latest Payments
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {payments.map((payment, idx) => (
            <div
              key={payment._id}
              className="group relative bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-indigo-200 hover:-translate-y-1"
              style={{
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative p-6">
                {/* Profile Section */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg flex items-center justify-center ring-4 ring-white/50">
                      <img
                        src={payment.photoURL}
                        alt={payment.displayName}
                        className="w-full h-full rounded-xl object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="hidden text-white text-xl font-bold items-center justify-center w-full h-full">
                        {payment.displayName?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">
                      {payment.displayName || "Unknown User"}
                    </h3>
                    <p className="text-sm text-slate-600 truncate">{payment.email || "-"}</p>
                  </div>
                </div>

                {/* Payment Amount */}
                <div className="mb-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      {payment.amount}
                    </span>
                    <span className="text-lg font-semibold text-indigo-400">
                      {payment.currency.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Payment Type Badge */}
                <div className="mb-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm ${
                    payment.type === "boost"
                      ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200"
                      : "bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 border border-amber-200"
                  }`}>
                    <span className="text-base">
                      {payment.type === "boost" ? "🚀" : "🌟"}
                    </span>
                    {payment.type === "boost" ? "Issue Boost" : "Premium Subscription"}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : "-"}
                  </span>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
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
    </div>
  );
};

export default AdminLatestPayment;