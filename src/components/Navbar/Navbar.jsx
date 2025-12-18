import { Link } from "react-router";
import MyLink from "../MyLinks/MyLinks";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const {user,logOut}=useAuth() 
    const links =<>
    <li><MyLink to='/'>Home</MyLink></li>
    <li><MyLink to='/all-issue'>All Issues</MyLink></li>
    <li><MyLink to='/report'>Report</MyLink></li>
    </>

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
          console.log(err.message);
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
        <div className="navbar md:px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow ">
        {links}
      </ul>
    </div>
    <Link to='/' className="hidden md:block"><Logo/></Link>
    {/* <img src={logo} className="w-14 h-12" alt="" />
    <h2 className="hidden md:block text-2xl font-bold">Public Infrastructure Issue</h2> */}
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end ">
    {user ? <>
        <div className="flex items-center">
                <div className="dropdown ">
                  <div tabIndex={0} role="button" className="">
                    <img
                      referrerPolicy="no-referrer"
                      src={`${user ? user?.photoURL : ""}`}
                      alt=""
                      className="w-14 h-14 rounded-full border cursor-pointer"
                    />
                  </div>
                  <ul
                    className="menu menu-sm dropdown-content bg-base-100 w-44 md:w-44 rounded-box mt-3 p-2 shadow right-0"
                  >
                    <li>
                     <p className="smooth-underline uppercase">{user.displayName}</p>
                    </li>
                    <li>
                      <MyLink to="/dashboard/admin-home">DashBoard</MyLink>
                    </li>
                    <li>
                      <button
                        className="font-bold text-xl smooth-underline !flex items-center gap-2"
                        onClick={handleLogout}
                      >
                        <MdOutlineLogout /> Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
       


      
    </> :<Link to='/login' className="btn btn-glow">LogIn</Link>}
  </div>
</div>
    );
};

export default Navbar;