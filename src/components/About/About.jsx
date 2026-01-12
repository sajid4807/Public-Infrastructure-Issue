import React from "react";
import { FaUsers, FaTools, FaMapMarkedAlt, FaInfoCircle, FaBullseye, FaEye, FaRocket } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Citizen Engagement",
      description: "Citizens can easily report issues and track their status in real-time.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaTools />,
      title: "Efficient Management",
      description: "Staff and administrators can manage, assign, and resolve issues effectively.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Location-Based Reports",
      description: "Issues are reported with location data for accurate and faster response.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 text-center max-w-6xl mx-auto z-10">
        <div 
          className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-6"
          style={{ animation: 'fadeIn 0.6s ease-out' }}
        >
          <FaInfoCircle className="text-indigo-600 animate-pulse" />
          <span className="text-indigo-700 font-semibold text-xs uppercase tracking-wide">
            About Us
          </span>
        </div>
        
        <h1 
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6"
          style={{ animation: 'fadeIn 0.8s ease-out' }}
        >
          About Public Issue Tracker
        </h1>
        
        <p 
          className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ animation: 'fadeIn 1s ease-out' }}
        >
          Public Issue Tracker is a digital platform designed to help citizens, staff, and authorities collaborate efficiently to report and resolve public infrastructure issues.
        </p>
        
        <div 
          className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"
          style={{ animation: 'fadeIn 1.2s ease-out' }}
        ></div>
      </section>

      {/* Mission / Vision Section */}
      <section className="relative px-4 py-12 md:py-20 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div 
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2"
              style={{ animation: 'slideInLeft 0.8s ease-out' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <FaBullseye className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                  Our Mission
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                Our mission is to create transparency, accountability, and faster resolution of public issues by connecting citizens directly with responsible authorities.
              </p>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Vision Card */}
            <div 
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2"
              style={{ animation: 'slideInRight 0.8s ease-out' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <FaEye className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  Our Vision
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                We envision smarter cities where infrastructure issues are identified early and resolved efficiently through technology and collaboration.
              </p>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-16 md:py-20 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
              What We Offer
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make infrastructure management seamless and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2 text-center"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
              >
                {/* Icon */}
                <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl items-center justify-center text-white text-3xl shadow-lg mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative px-4 py-16 md:py-24 z-10">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden relative"
            style={{ animation: 'fadeInUp 0.8s ease-out' }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaRocket className="text-4xl" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Together, We Can Build Better Communities
              </h2>

              <p className="max-w-2xl mx-auto mb-8 text-white/90 text-base md:text-lg leading-relaxed">
                Join us in making public infrastructure management more transparent, efficient, and citizen-friendly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <FaUsers />
                  Get Started
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300">
                  Learn More
                </button>
              </div>

              {/* Decorative line */}
              <div className="h-1 w-32 bg-white/30 rounded-full mx-auto mt-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom decorative dots */}
      <div className="flex justify-center pb-12 gap-2">
        <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></div>
        <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 w-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

export default About;