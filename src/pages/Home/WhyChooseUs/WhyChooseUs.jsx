import {
  FaHandsHelping,
  FaClock,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaHandsHelping />,
    title: "Citizen-Centered Solution",
    description:
      "Designed to empower citizens by giving them a direct voice in improving public infrastructure.",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: <FaClock />,
    title: "Faster Issue Resolution",
    description:
      "Streamlined workflows ensure issues are reviewed, assigned, and resolved quickly.",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Reliable",
    description:
      "Your data is protected with secure authentication and verified authority access.",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: <FaUsers />,
    title: "Transparent Collaboration",
    description:
      "Citizens and authorities collaborate transparently with real-time updates.",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-20">
      {/* Background Decorative Elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-32 translate-y-32 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h2 className="mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
            Why Choose Our Platform
          </h2>
          
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We provide a transparent, secure, and efficient solution to manage
            public infrastructure issues.
          </p>
          
          <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Background Gradient Blob */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.bgGradient} opacity-50 blur-2xl transition-all duration-500 group-hover:scale-150`}></div>

              {/* Icon Container */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl`}></div>
                  <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    <div className="text-4xl text-white">{item.icon}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center">
                <h3 className="mb-3 text-xl font-black text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                  {item.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}></div>

              {/* Corner Decoration */}
              <div className="absolute right-4 top-4 flex gap-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${item.gradient}`}></div>
                <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${item.gradient} opacity-60`}></div>
                <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${item.gradient} opacity-30`}></div>
              </div>

              {/* Number Badge */}
              <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 font-black text-slate-700 opacity-0 transition-all duration-500 group-hover:opacity-100">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA or Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-200 bg-white px-6 py-3 shadow-lg">
            <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></div>
            <p className="text-sm font-bold text-slate-700">
              Trusted by thousands of citizens & authorities
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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

export default WhyChooseUs;