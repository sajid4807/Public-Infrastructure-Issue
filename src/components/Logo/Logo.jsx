import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} className="w-14 h-12" alt="" />
      <h2 className="hidden md:block -ml-2 text-xl leading-4 font-bold">
        Public Infrastructure Issue <br />
        Reporting System
      </h2>
    </div>
  );
};

export default Logo;
