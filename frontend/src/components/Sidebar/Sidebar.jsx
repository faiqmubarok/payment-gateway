import { useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import propTypes from "prop-types";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import ClickedOutside from "../ClickedOutside";

const Sidebar = ({ listMenu, sidebarOpen, setSidebarOpen }) => {
  const sidebar = useRef(null);
  const trigger = useRef(null);

  return (
    <ClickedOutside onClick={() => setSidebarOpen(false)} className="relative">
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-secondary duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between gap-2 p-6">
          <Logo />

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <IoIosArrowRoundBack className="w-7 h-7 text-white" />
          </button>
        </div>
        {/* Sidebar Header */}

        {/* Sidebar Menu */}
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
          <div className="mt-3 py-4 px-4 lg:px-6">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
            
              MENU UTAMA
            </h3>
            <ul className="mb-6 flex flex-col gap-3">
              {listMenu.map((item, index) => (
                <li key={index}>
                  <NavLink
                    onClick={() => setSidebarOpen(false)}
                    to={item.link}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-lg py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary ${
                        isActive ? "text-white bg-primary" : "text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

          </div>
        </div>
        {/* Sidebar Menu */}
      </aside>
    </ClickedOutside>
  );
};

Sidebar.propTypes = {
  listMenu: propTypes.array,
  sidebarOpen: propTypes.bool,
  setSidebarOpen: propTypes.func,
};

export default Sidebar;
