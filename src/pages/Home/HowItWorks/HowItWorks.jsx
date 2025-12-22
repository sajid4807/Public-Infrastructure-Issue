import {
  FaRegEdit,
  FaSearch,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaRegEdit />,
    title: "Report an Issue",
    description:
      "Citizens submit infrastructure issues with photos, location, and details through the platform.",
    gradient: "from-blue-500 to-cyan-500",
    number: 1
  },
  {
    icon: <FaSearch />,
    title: "Issue Review",
    description:
      "Authorities verify the report, assess priority, and assign it to the appropriate department.",
    gradient: "from-purple-500 to-pink-500",
    number: 2
  },
  {
    icon: <FaTools />,
    title: "Work in Progress",
    description:
      "Assigned teams begin work and update the status as the issue is being resolved.",
    gradient: "from-orange-500 to-red-500",
    number: 3
  },
  {
    icon: <FaCheckCircle />,
    title: "Issue Resolved",
    description:
      "The issue is resolved and citizens receive confirmation with final updates.",
    gradient: "from-green-500 to-emerald-500",
    number: 4
  },
];

const HowItWorks = () => {
  return (
    <section className=" relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-indigo-700 font-semibold text-sm uppercase tracking-wide">Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to report and resolve public
            infrastructure issues efficiently.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Steps - Desktop: Horizontal with Connectors */}
        <div className="hidden md:block relative">
          {/* Connection Line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full" style={{ width: '85%', left: '7.5%' }}></div>
          
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
              >
                {/* Step Card */}
                <div className="group relative bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white">
                  {/* Step Number Badge */}
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                    <span className="text-white font-black text-xl">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mt-8 mb-6">
                    <div className={`inline-flex p-5 bg-gradient-to-br ${step.gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <div className="text-4xl">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile: Vertical with Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-6"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                {/* Number Badge */}
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white z-10`}>
                  <span className="text-white font-black text-lg">{step.number}</span>
                </div>
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className={`w-1 flex-1 bg-gradient-to-b ${step.gradient} mt-2 rounded-full min-h-[80px]`}></div>
                )}
              </div>

              {/* Card */}
              <div className="flex-1 bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 border border-white">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${step.gradient} rounded-2xl text-white shadow-lg`}>
                    <div className="text-3xl">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mt-4`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Start Reporting Issues Today</span>
          </div>
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

export default HowItWorks;