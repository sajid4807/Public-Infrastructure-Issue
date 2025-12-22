import { Link } from "react-router";
import MyLink from "../MyLinks/MyLinks";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { MdOutlineLogout } from "react-icons/md";
import { FaUser, FaTachometerAlt, FaBars } from "react-icons/fa";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const links = (
    <>
      <li>
        <MyLink to="/">Home</MyLink>
      </li>
      <li>
        <MyLink to="/all-issue">All Issues</MyLink>
      </li>
    </>
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logout!",
              text: "Successfully LogOut",
              icon: "success",
            });
          })
          .catch((err) => {
            const error = err.message;
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: error,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-md backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <div className="dropdown">
              <button
                tabIndex={0}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 transition-all hover:scale-105 hover:from-indigo-200 hover:to-purple-200 lg:hidden"
              >
                <FaBars className="text-lg" />
              </button>
              <ul
                tabIndex={-1}
                className="menu dropdown-content menu-sm mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
              >
                {links}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="hidden transition-transform hover:scale-105 md:block">
              <Logo />
            </Link>
          </div>

          {/* Center Section - Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
          </div>

          {/* Right Section - User Menu or Login */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="group relative overflow-hidden rounded-full ring-2 ring-indigo-200 transition-all hover:ring-4 hover:ring-indigo-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || ""}
                    alt="User"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-lg"></div>
                </button>

                <ul className="menu dropdown-content menu-sm mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                  {/* User Info */}
                  <li className="pointer-events-none mb-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                        <FaUser />
                      </div>
                      <div className="flex-1">
                        <p className="truncate font-bold uppercase text-slate-800">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {role === "admin" ? "Administrator" : role === "staff" ? "Staff Member" : "Citizen"}
                        </p>
                      </div>
                    </div>
                  </li>

                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                  {/* Dashboard Link */}
                  <li>
                    <MyLink
                      to={
                        role === "admin"
                          ? "/dashboard/admin-home"
                          : role === "staff"
                          ? "/dashboard/staff-home"
                          : "/dashboard/citizen-home"
                      }
                      className="group rounded-xl transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 transition-all group-hover:scale-110">
                          <FaTachometerAlt />
                        </div>
                        <span className="font-semibold">Dashboard</span>
                      </div>
                    </MyLink>
                  </li>

                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                  {/* Logout Button */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="group rounded-xl transition-all hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-rose-100 text-red-600 transition-all group-hover:scale-110">
                          <MdOutlineLogout className="text-xl" />
                        </div>
                        <span className="font-bold text-red-600">Log Out</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative">Log In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;