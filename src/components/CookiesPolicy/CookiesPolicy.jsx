import React, { useState } from "react";
import { FaCookie, FaInfoCircle, FaCogs, FaChartLine, FaPalette, FaChartBar, FaUserCog, FaExternalLinkAlt, FaSync, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CookiesPolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: true,
    functional: true,
    analytics: true
  });

  const cookieTypes = [
    {
      id: "essential",
      icon: <FaCogs />,
      title: "Essential Cookies",
      description: "Necessary for basic site functionality, such as login sessions and navigation.",
      gradient: "from-blue-500 to-cyan-500",
      required: true
    },
    {
      id: "performance",
      icon: <FaChartLine />,
      title: "Performance Cookies",
      description: "Help us understand how users interact with our site, enabling us to improve it.",
      gradient: "from-purple-500 to-pink-500",
      required: false
    },
    {
      id: "functional",
      icon: <FaPalette />,
      title: "Functional Cookies",
      description: "Remember your preferences, such as language and display settings.",
      gradient: "from-green-500 to-emerald-500",
      required: false
    },
    {
      id: "analytics",
      icon: <FaChartBar />,
      title: "Analytics Cookies",
      description: "Collect anonymous data about site usage to help us enhance your experience.",
      gradient: "from-orange-500 to-red-500",
      required: false
    }
  ];

  const usagePurposes = [
    { icon: <FaCogs />, text: "Enhance the functionality of our platform" },
    { icon: <FaChartLine />, text: "Analyze user behavior and improve services" },
    { icon: <FaUserCog />, text: "Remember your preferences for a better experience" }
  ];

  const toggleCookie = (id) => {
    if (id !== "essential") {
      setCookiePreferences(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const acceptAll = () => {
    setCookiePreferences({
      essential: true,
      performance: true,
      functional: true,
      analytics: true
    });
  };

  const rejectOptional = () => {
    setCookiePreferences({
      essential: true,
      performance: false,
      functional: false,
      analytics: false
    });
  };

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
            <FaCookie className="text-amber-600 animate-bounce" />
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-wide">
              Cookie Settings
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-4">
            Cookies Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            This Cookies Policy explains how our Public Infrastructure Issue Reporting System uses cookies and similar technologies to improve your experience.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* What are Cookies Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8 md:p-10 mb-12 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <FaInfoCircle className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                What are Cookies?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, improve functionality, and analyze usage.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Types Grid with Toggle */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => (
              <div
                key={cookie.id}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2"
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
              >
                {/* Header with Icon and Toggle */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${cookie.gradient} flex items-center justify-center text-white text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {cookie.icon}
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleCookie(cookie.id)}
                    disabled={cookie.required}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      cookiePreferences[cookie.id]
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-slate-300'
                    } ${cookie.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                        cookiePreferences[cookie.id] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Title and Badge */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-800">
                      {cookie.title}
                    </h3>
                    {cookie.required && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm mb-4">
                  {cookie.description}
                </p>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {cookiePreferences[cookie.id] ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-green-600">Enabled</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-slate-400" />
                      <span className="text-slate-500">Disabled</span>
                    </>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${cookie.gradient} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Cookies */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg border-2 border-white/50 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            How We Use Cookies
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            We use cookies to enhance your experience on our platform:
          </p>
          <div className="space-y-4">
            {usagePurposes.map((purpose, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  {purpose.icon}
                </div>
                <p className="text-slate-700 font-medium">{purpose.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Your Cookie Choices */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <FaUserCog className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Your Cookie Choices</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              You can manage cookies through your browser settings. You can block or delete cookies, but some features of our site may not work properly if you disable them.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border-2 border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <FaExternalLinkAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Third-Party Cookies</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Some third-party services we use, such as analytics providers, may set cookies on your device. These are subject to their own privacy policies.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center text-white mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-white/90 leading-relaxed">
              Choose which cookies you want to accept. Essential cookies cannot be disabled as they are necessary for the site to function.
            </p>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={acceptAll}
              className="flex items-center justify-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FaCheckCircle />
              Accept All Cookies
            </button>
            <button
              onClick={rejectOptional}
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300"
            >
              <FaTimesCircle />
              Reject Optional
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t-2 border-white/30 text-center">
            <p className="text-white/90 mb-4">
              For any questions regarding this Cookies Policy, please contact us:
            </p>
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
            >
              <FaEnvelope />
              support@example.com
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200">
            <FaSync className="animate-spin" style={{ animationDuration: '3s' }} />
            <span className="font-medium">Last updated: January 2026</span>
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-400 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-2 w-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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

export default CookiesPolicy;