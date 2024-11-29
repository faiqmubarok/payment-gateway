import propTypes from "prop-types";
import Logo from "../Logo";
import { HiMenuAlt2 } from "react-icons/hi";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const Header = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white drop-shadow-sm">
      <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-md md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm bg-white hover:bg-gray-50 p-2 shadow-sm lg:hidden"
          >
            <HiMenuAlt2 className="w-7 h-7" />
          </button>
          {/* Hamburger Toggle Button */}

          <span className="block flex-shrink-0 lg:hidden">
            <Logo />
          </span>
        </div>

        <ul className="flex items-center gap-3 sm:gap-5">
          <DropdownNotification />
          <DropdownUser />
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  sidebarOpen: propTypes.bool,
  setSidebarOpen: propTypes.func,
};

export default Header;
