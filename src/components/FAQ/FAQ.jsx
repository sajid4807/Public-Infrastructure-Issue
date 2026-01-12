import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How can I report an issue?",
    answer:
      "You can report an issue by filling out the report form on our platform. Make sure to provide accurate details and attach photos if possible.",
    icon: "📝",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes! We take your privacy seriously. Your personal data is only used to process your reports and communicate with you.",
    icon: "🔒",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    question: "Can I edit or delete a report?",
    answer:
      "Currently, you cannot edit a report once submitted. If you need to delete or update it, please contact our support team.",
    icon: "✏️",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    question: "How long does it take to resolve an issue?",
    answer:
      "Resolution times vary depending on the type of issue and the local authorities involved. We notify you via email when the status changes.",
    icon: "⏱️",
    gradient: "from-orange-500 to-red-500"
  },
  {
    question: "Who can see the reported issues?",
    answer:
      "Reported issues are visible to relevant authorities for action. Some reports may also be visible publicly for transparency.",
    icon: "👁️",
    gradient: "from-indigo-500 to-purple-500"
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
            <FaQuestionCircle className="text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold text-xs uppercase tracking-wide">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about reporting and managing infrastructure issues
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-6 md:p-8 flex items-center gap-4 focus:outline-none group-hover:bg-gradient-to-r group-hover:from-indigo-50/50 group-hover:to-purple-50/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl md:text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {item.icon}
                </div>

                {/* Question Text */}
                <span className="flex-1 text-base md:text-lg font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {item.question}
                </span>

                {/* Toggle Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md transform transition-all duration-300 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}>
                  <FaChevronDown className="text-sm" />
                </div>
              </button>

              {/* Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  {/* Divider */}
                  <div className={`h-1 w-full bg-gradient-to-r ${item.gradient} rounded-full mb-4`}></div>
                  
                  {/* Answer Text */}
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base pl-16 md:pl-20">
                    {item.answer}
                  </p>
                </div>
              </div>

              {/* Bottom gradient accent line */}
              <div className={`h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </button>
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

export default FAQ;