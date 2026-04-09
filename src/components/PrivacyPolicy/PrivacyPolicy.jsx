import React from "react";
import { FaShieldAlt, FaDatabase, FaUserShield, FaLock, FaFileContract, FaCookie, FaSync, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaDatabase />,
      title: "Information We Collect",
      content: "We may collect personal information such as your name, email address, phone number, and location, as well as the details of the issue you report, including photos or videos.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaUserShield />,
      title: "How We Use Your Information",
      content: "Your information is used to process your reports, communicate with you, and improve our services. We do not sell your data to third parties.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaFileContract />,
      title: "Data Sharing",
      content: "We may share your information with local authorities or service providers to resolve reported issues. We only share necessary information and ensure it is protected.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaLock />,
      title: "Data Security",
      content: "We implement reasonable security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <FaShieldAlt />,
      title: "Your Rights",
      content: "You can request access to, correction, or deletion of your personal data. You can also opt out of communications at any time.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FaCookie />,
      title: "Cookies",
      content: "Our system may use cookies or similar technologies to enhance user experience. You can manage cookie preferences in your browser settings.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <FaSync />,
      title: "Updates",
      content: "We may update this Privacy Policy periodically. The latest version will always be available on this page.",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
            <FaShieldAlt className="text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold text-xs uppercase tracking-wide">
              Legal Information
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect the information you provide while using our Public Infrastructure Issue Reporting System.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Important Notice Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-3xl p-6 md:p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Your Privacy Matters
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                We are committed to protecting your personal information and being transparent about how we handle your data. Please read this policy carefully to understand our practices.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections - Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              {/* Icon and Number */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {section.icon}
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                {section.title}
              </h2>

              {/* Content */}
              <p className="text-slate-600 leading-relaxed text-sm">
                {section.content}
              </p>

              {/* Bottom accent line */}
              <div className={`h-1 bg-gradient-to-r ${section.gradient} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <FaEnvelope className="text-3xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Questions About Your Privacy?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            If you have any questions about this Privacy Policy or how we handle your personal information, please don't hesitate to reach out to our support team.
          </p>
          <a
            href="mailto:mdsajidhossen4807@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaEnvelope />
            mdsajidhossen4807@gmail.com
          </a>
          
          {/* Decorative bottom line */}
          <div className="h-1 w-32 bg-white/30 rounded-full mx-auto mt-8"></div>
        </div>

        {/* Last Updated Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <FaSync className="animate-spin" style={{ animationDuration: '3s' }} />
            <span>Last updated: January 2026</span>
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-2 w-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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

export default PrivacyPolicy;