import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      content: "support@example.com",
      link: "mailto:support@example.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      content: "+880 1234 567890",
      link: "tel:+8801234567890",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      content: "123 Main Street, Your City, Bangladesh",
      link: "#",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
            <FaCommentDots className="text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold text-xs uppercase tracking-wide">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or suggestions? Fill out the form below and we will get back to you as soon as possible.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div 
            className="order-2 lg:order-1"
            style={{ animation: 'fadeInLeft 0.8s ease-out' }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-slate-600 text-sm">
                  We'd love to hear from you. Fill out the form and we'll respond shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                    <FaUser className="text-indigo-600" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                    <FaEnvelope className="text-purple-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                    <FaCommentDots className="text-pink-600" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Send Message</span>
                  <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div 
            className="order-1 lg:order-2 space-y-6"
            style={{ animation: 'fadeInRight 0.8s ease-out' }}
          >
            {/* Info Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Let's Connect
              </h2>
              <p className="text-white/90 leading-relaxed">
                We're here to help and answer any question you might have. We look forward to hearing from you!
              </p>
              <div className="h-1 w-20 bg-white/50 rounded-full mt-4"></div>
            </div>

            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl border-2 border-white/50 transition-all duration-300 hover:-translate-y-2"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {info.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                      {info.title}
                    </h3>
                    <a
                      href={info.link}
                      className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 break-words"
                    >
                      {info.content}
                    </a>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${info.gradient} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}

            {/* Map/Location Card */}
           
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="flex justify-center mt-12 gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-2 w-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
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
    </section>
  );
};

export default ContactUs;