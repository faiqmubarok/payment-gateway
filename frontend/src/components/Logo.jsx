import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* <img
        src={"/LogoPatani.svg"}
        className="h-8"
        loading="lazy"
        alt="Flowbite Logo"
      /> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase text-primary font-poppins">
        Provider
      </span>
    </Link>
  );
};

export default Logo;
