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
import { TbLogout } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const DashBoardLayout = () => {
  const { role } = useRole();
  const{logOut}=useAuth()

  const handleLogout =()=>{
    Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Log Out it!"
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
      .then(()=>{
        Swal.fire({
        title: "Logout!",
        text: "Successfully LogOut",
        icon: "success"
      });
      })
      .catch((err) => {
            const error =err.message
            Swal.fire({
      position: "top-end",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500
    });
          });
      
    }
  })
  }

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

          <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Log out"
                    onClick={handleLogout}
                  >
                    <TbLogout size={30} />

                    <span className="is-drawer-close:hidden text-2xl font-medium">
                      Log out
                    </span>
                  </button>
                </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;