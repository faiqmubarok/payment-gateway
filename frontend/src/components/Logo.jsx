import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 rtl:space-x-reverse group"
    >
      <div className="relative">
        <img
          src={"/public/logo.svg"}
          className="h-10 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          alt="Top-It Logo"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-full blur-md"></div>
      </div>
      <span
        className="self-center text-3xl font-extrabold uppercase font-inter 
      bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700 
      transition-colors duration-300 group-hover:text-accent"
      >
        Top-It
      </span>
    </Link>
  );
};

export default Logo;
