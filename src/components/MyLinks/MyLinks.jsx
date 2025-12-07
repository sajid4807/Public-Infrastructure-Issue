import { NavLink } from "react-router";

const MyLink = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "smooth-border-underline active"
          : `${className} smooth-underline`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;