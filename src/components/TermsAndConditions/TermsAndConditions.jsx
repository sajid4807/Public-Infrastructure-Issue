import React, { useState } from "react";
import { FaFileContract, FaUserCheck, FaCopyright, FaUserShield, FaExclamationTriangle, FaBan, FaSync, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const TermsAndConditions = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const terms = [
    {
      icon: <FaUserCheck />,
      title: "User Responsibilities",
      content: "Users must provide accurate information when reporting issues. Submitting false, misleading, or offensive content is strictly prohibited.",
      gradient: "from-blue-500 to-cyan-500",
      number: "01"
    },
    {
      icon: <FaCopyright />,
      title: "Intellectual Property",
      content: "All content, design, and software used in this platform are protected by intellectual property laws. Users may not copy or distribute content without permission.",
      gradient: "from-purple-500 to-pink-500",
      number: "02"
    },
    {
      icon: <FaUserShield />,
      title: "Privacy",
      content: "Your use of this platform is also governed by our Privacy Policy. Please review it to understand how your personal data is handled.",
      gradient: "from-green-500 to-emerald-500",
      number: "03"
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Limitation of Liability",
      content: "We are not responsible for any damages, losses, or consequences that may arise from the use of our platform, including incorrect or incomplete reports.",
      gradient: "from-orange-500 to-red-500",
      number: "04"
    },
    {
      icon: <FaBan />,
      title: "Termination",
      content: "We reserve the right to suspend or terminate access to the platform for users who violate these terms or engage in harmful behavior.",
      gradient: "from-red-500 to-pink-500",
      number: "05"
    },
    {
      icon: <FaSync />,
      title: "Changes to Terms",
      content: "We may update these Terms and Conditions from time to time. The latest version will always be available on this page.",
      gradient: "from-indigo-500 to-purple-500",
      number: "06"
    }
  ];

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
            <FaFileContract className="text-purple-600 animate-pulse" />
            <span className="text-purple-700 font-semibold text-xs uppercase tracking-wide">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to our Public Infrastructure Issue Reporting System. By using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Acceptance Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center animate-pulse">
              <FaExclamationTriangle className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                Please read these terms carefully before using our platform. By continuing to use our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-amber-400 text-amber-600 focus:ring-4 focus:ring-amber-200 cursor-pointer"
                />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                  I have read and agree to the Terms and Conditions
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Terms Grid - Alternating Layout */}
        <div className="space-y-8">
          {terms.map((term, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-6 lg:gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ animation: `fadeIn 0.6s ease-out ${index * 0.15}s both` }}
            >
              {/* Icon Side */}
              <div className="lg:w-1/3">
                <div className="group sticky top-8 bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${term.gradient} flex items-center justify-center text-white font-black text-xl`}>
                      {term.number}
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${term.gradient} flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      {term.icon}
                    </div>
                  </div>

                  {/* Decorative gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${term.gradient} rounded-full mb-4`}></div>

                  {/* Visual indicator */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    <span>Section {term.number}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-2/3">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 h-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                    {term.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                    {term.content}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`h-1 bg-gradient-to-r ${term.gradient} rounded-full mt-6 transform scale-x-0 hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <FaCheckCircle className="text-4xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Accept & Continue
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            By continuing to use our platform, you accept these Terms and Conditions. For any questions or concerns, please don't hesitate to contact our support team.
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

        {/* Effective Date */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200">
            <FaFileContract />
            <span className="font-medium">Effective Date: January 1, 2026</span>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default TermsAndConditions;