import {
  FaRegEdit,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaUserShield,
  FaBell,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRegEdit />,
    title: "Report Public Issues",
    description:
      "Citizens can easily report public infrastructure issues with images and location details.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "blue"
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Location Based Tracking",
    description:
      "Issues are mapped and tracked based on their real-time geographic location.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "purple"
  },
  {
    icon: <FaCheckCircle />,
    title: "Fast Resolution Process",
    description:
      "Authorities review, assign, and resolve issues through an efficient workflow.",
    gradient: "from-green-500 to-emerald-500",
    bgGlow: "green"
  },
  {
    icon: <FaUserShield />,
    title: "Verified Authorities",
    description:
      "Only authorized officials can manage and resolve reported issues securely.",
    gradient: "from-indigo-500 to-purple-500",
    bgGlow: "indigo"
  },
  {
    icon: <FaBell />,
    title: "Real-time Updates",
    description:
      "Users receive notifications as issue status changes from pending to resolved.",
    gradient: "from-orange-500 to-red-500",
    bgGlow: "orange"
  },
  {
    icon: <FaChartLine />,
    title: "Transparency & Analytics",
    description:
      "Track issue progress and resolution performance with transparent insights.",
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "pink"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
            <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse"></div>
            <span className="text-indigo-700 font-semibold text-sm uppercase tracking-wide">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Application Features
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our platform empowers citizens and authorities to collaborate in
            resolving public infrastructure issues efficiently.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
              
              {/* Glow effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${feature.bgGlow}-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <div className="text-4xl">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16 gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce delay-75"></div>
          <div className="h-2 w-2 rounded-full bg-pink-400 animate-bounce delay-150"></div>
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

export default FeaturesSection;