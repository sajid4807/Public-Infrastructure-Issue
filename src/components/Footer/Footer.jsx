import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import useRole from "../../hooks/useRole";
import Forbidden from "../Forbidden/Forbidden";

const Footer = () => {

    const {role}=useRole()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Public Issue Tracker
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              A digital platform that empowers citizens and authorities to
              collaborate in resolving public infrastructure issues efficiently
              and transparently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to={role === 'citizen' && '/dashboard/citizen-report'} className="hover:text-white transition">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/all-issue" className="hover:text-white transition">
                  All Issues
                </Link>
              </li>
              <li>
                <Link to={role === 'admin' ? '/dashboard/admin-home' : role === 'staff' ? '/dashboard/staff-home' : '/dashboard/citizen-home'} className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Public Issue Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
