import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useRole from "../../hooks/useRole";
import LogoDash from "../Logo/LogoDash";

const Footer = () => {
  const { role } = useRole();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-20 top-0 h-64 w-64 animate-pulse rounded-full bg-indigo-400 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-64 w-64 animate-pulse rounded-full bg-purple-400 blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        {/* Top Wave Decoration */}
        <div className="absolute left-0 right-0 top-0">
          <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 73.3C480 67 600 73 720 76.7C840 80 960 80 1080 73.3C1200 67 1320 53 1380 46.7L1440 40V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="white" fillOpacity="0.05"/>
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                {/* <FaMapMarkerAlt className="text-xl text-white" /> */}
                <LogoDash/>
              </div>
              <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-black text-transparent">
                Public Issue Tracker
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              A digital platform that empowers citizens and authorities to
              collaborate in resolving public infrastructure issues efficiently
              and transparently.
            </p>
            {/* Decorative Line */}
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-white">
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-indigo-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-indigo-500"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to={role === 'citizen' && '/dashboard/citizen-report'} className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-indigo-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-indigo-500"></span>
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/all-issue" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-indigo-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-indigo-500"></span>
                  All Issues
                </Link>
              </li>
              <li>
                <Link to={role === 'admin' ? '/dashboard/admin-home' : role === 'staff' ? '/dashboard/staff-home' : '/dashboard/citizen-home'} className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-indigo-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-indigo-500"></span>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-white">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/faq" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-purple-500"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-purple-500"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-purple-500"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="group flex items-center gap-2 text-slate-400 transition-all hover:translate-x-2 hover:text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-purple-500"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-white">
                <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-2xl bg-slate-800/50 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-blue-600"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <FaFacebookF className="relative text-lg text-slate-400 transition-colors group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-2xl bg-slate-800/50 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-sky-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <FaTwitter className="relative text-lg text-slate-400 transition-colors group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-2xl bg-slate-800/50 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-blue-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <FaLinkedinIn className="relative text-lg text-slate-400 transition-colors group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-2xl bg-slate-800/50 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-slate-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <FaGithub className="relative text-lg text-slate-400 transition-colors group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-4 backdrop-blur-sm">
              <p className="mb-2 text-sm font-bold text-white">Stay Updated</p>
              <p className="text-xs text-slate-400">Get the latest updates on infrastructure improvements</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>© {new Date().getFullYear()}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600"></span>
            <span className="font-semibold text-slate-300">Public Issue Tracker</span>
            <span className="h-1 w-1 rounded-full bg-slate-600"></span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="text-slate-400 transition-colors hover:text-indigo-400">
              Privacy
            </Link>
            <span className="h-3 w-px bg-slate-700"></span>
            <Link to="/terms" className="text-slate-400 transition-colors hover:text-indigo-400">
              Terms
            </Link>
            <span className="h-3 w-px bg-slate-700"></span>
            <Link to="/cookies" className="text-slate-400 transition-colors hover:text-indigo-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;