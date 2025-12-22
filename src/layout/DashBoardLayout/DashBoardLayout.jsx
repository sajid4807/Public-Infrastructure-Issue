import { Link, NavLink, Outlet } from "react-router";
import LogoDash from "../../components/Logo/LogoDash";
import { MdPayment, MdReport } from "react-icons/md";
import {
  FaClipboardList,
  FaCloudUploadAlt,
  FaUser,
  FaUsers,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";
import useRole from "../../hooks/useRole";
import { HiCollection } from "react-icons/hi";
const DashBoardLayout = () => {
  const { role } = useRole();

  //  if (role === "admin") {
  //   return <Navigate to="/dashboard/admin-home" replace />;
  // }

  // if (role === "citizen") {
  //   return <Navigate to="/dashboard/citizen-home" replace />;
  // }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link
            to={`${
              role === "admin"
                ? "/dashboard/admin-home"
                : role === "staff"
                ? "/dashboard/staff-home"
                : "/dashboard/citizen-home"
            }`}
            className="md:px-4 md:text-2xl font-bold"
          >
            Public Infrastructure Issue
          </Link>
        </nav>
        {/* Page content here */}
        {/* <div className="px-4 md:px-5"> */}
          <Outlet />
        {/* </div> */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex  min-h-full flex-col items-start bg-base-200 is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link to="/">
                <LogoDash />
              </Link>
            </li>

            {/* our link list */}

            {/* citizen navLink */}

            {role === "citizen" && (
              <>
              


              {/* my issue page */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Issue"
                    to="/dashboard/citizen-report"
                  >
                    <FaClipboardList size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      My Issue
                    </span>
                  </NavLink>
                </li>

                {/* report issue page */}

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Report Issue"
                    to="/dashboard/citizen-report-issue"
                  >
                    <FaCloudUploadAlt size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Report Issue
                    </span>
                  </NavLink>
                </li>

                {/* profile page */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/citizen-profile"
                  >
                    <FaUser size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      My Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}


              {/* admin navLink */}


            {role === "admin" && (
              <>
                {/* all issue */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Issue"
                    to="/dashboard/admin-issues"
                  >
                    <MdReport size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      All Issue
                    </span>
                  </NavLink>
                </li>

                {/* manage users */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                    to="/dashboard/manage-users"
                  >
                    <FaUsers size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Manage Users
                    </span>
                  </NavLink>
                </li>

                {/* manage staff */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Staff"
                    to="/dashboard/manage-staff"
                  >
                    <FaUsersCog size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Manage Staff
                    </span>
                  </NavLink>
                </li>
                    {/* payment related api */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment"
                    to="/dashboard/admin-payment"
                  >
                    <MdPayment size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Payment
                    </span>
                  </NavLink>
                </li>
                        {/*profile  */}
                 <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/admin-profile"
                  >
                    <FaUserShield size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      My Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}


            {/* staff navLink  */}

            {role ==='staff' && (
            <>
                        {/*profile  */}
                 <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Issues"
                    to="/dashboard/assigned-issues"
                  >
                    <HiCollection size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Assigned Issues
                    </span>
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/staff-profile"
                  >
                    <FaUser size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      My Profile
                    </span>
                  </NavLink>
                </li>
                
            </>
          )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;






// import { Link, NavLink, Outlet } from "react-router";
// import LogoDash from "../../components/Logo/LogoDash";
// import { MdPayment, MdReport } from "react-icons/md";
// import {
//   FaClipboardList,
//   FaCloudUploadAlt,
//   FaUser,
//   FaUsers,
//   FaUsersCog,
//   FaUserShield,
// } from "react-icons/fa";
// import useRole from "../../hooks/useRole";

// const DashBoardLayout = () => {
//   const { role } = useRole();

//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col">
//         {/* Modern Navbar */}
//         <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-white/90 via-blue-50/90 to-indigo-50/90 border-b border-indigo-100/50 shadow-lg">
//           <div className="navbar px-4 lg:px-8">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="my-drawer-4"
//                 aria-label="open sidebar"
//                 className="btn btn-ghost btn-circle hover:bg-indigo-100/50 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2"
//                   fill="none"
//                   stroke="currentColor"
//                   className="size-6 text-indigo-600"
//                 >
//                   <path d="M4 6h16M4 12h16M4 18h16"></path>
//                 </svg>
//               </label>
//             </div>
//             <div className="flex-1">
//               <Link
//                 to={`${
//                   role === "admin"
//                     ? "/dashboard/admin-home"
//                     : role === "staff"
//                     ? "/dashboard/staff-home"
//                     : "/dashboard/citizen-home"
//                 }`}
//                 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
//               >
//                 Public Infrastructure Issue
//               </Link>
//             </div>
//             <div className="flex-none">
//               <div className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow-lg">
//                 {role?.charAt(0).toUpperCase() + role?.slice(1) || "User"}
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Page content */}
//         <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
//           <Outlet />
//         </div>
//       </div>

//       <div className="drawer-side z-40">
//         <label
//           htmlFor="my-drawer-4"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 is-drawer-close:w-20 is-drawer-open:w-72 shadow-2xl border-r border-indigo-900/20">
//           {/* Sidebar content */}
//           <ul className="menu w-full grow p-4 space-y-2">
//             {/* Logo */}
//             <li className="mb-6">
//               <Link to="/" className="hover:bg-transparent flex justify-center">
//                 <div className="transform hover:scale-110 transition-transform duration-300">
//                   <LogoDash />
//                 </div>
//               </Link>
//             </li>

//             {/* Citizen NavLinks */}
//             {role === "citizen" && (
//               <>
//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Profile"
//                     to="/dashboard/citizen-profile"
//                   >
//                     <FaUser size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Profile
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="My Issue"
//                     to="/dashboard/citizen-report"
//                   >
//                     <FaClipboardList size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       My Issue
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Report Issue"
//                     to="/dashboard/citizen-report-issue"
//                   >
//                     <FaCloudUploadAlt size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Report Issue
//                     </span>
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* Admin NavLinks */}
//             {role === "admin" && (
//               <>
//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="All Issue"
//                     to="/dashboard/admin-issues"
//                   >
//                     <MdReport size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       All Issue
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Manage Users"
//                     to="/dashboard/manage-users"
//                   >
//                     <FaUsers size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Manage Users
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Manage Staff"
//                     to="/dashboard/manage-staff"
//                   >
//                     <FaUsersCog size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Manage Staff
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Payment"
//                     to="/dashboard/admin-payment"
//                   >
//                     <MdPayment size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Payment
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Profile"
//                     to="/dashboard/admin-profile"
//                   >
//                     <FaUserShield size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Profile
//                     </span>
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* Staff NavLinks */}
//             {role === "staff" && (
//               <>
//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
//                           : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105"
//                       }`
//                     }
//                     data-tip="Profile"
//                     to="/dashboard/admin-profile"
//                   >
//                     <FaUserShield size={24} className="is-drawer-close:mx-auto" />
//                     <span className="is-drawer-close:hidden text-lg font-medium">
//                       Profile
//                     </span>
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* Settings - Pushed to bottom */}
//             <li className="mt-auto">
//               <button
//                 className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
//                 data-tip="Settings"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2"
//                   fill="none"
//                   stroke="currentColor"
//                   className="size-6 is-drawer-close:mx-auto"
//                 >
//                   <path d="M20 7h-9"></path>
//                   <path d="M14 17H5"></path>
//                   <circle cx="17" cy="17" r="3"></circle>
//                   <circle cx="7" cy="7" r="3"></circle>
//                 </svg>
//                 <span className="is-drawer-close:hidden text-lg font-medium">Settings</span>
//               </button>
//             </li>

//             {/* Decorative gradient bar at bottom */}
//             <li className="is-drawer-close:hidden">
//               <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-4"></div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoardLayout;
