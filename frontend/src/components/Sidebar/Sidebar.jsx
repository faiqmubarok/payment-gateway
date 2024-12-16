import { useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import propTypes from "prop-types";
import Logo from "../Logo";
import { NavLink, useLocation } from "react-router-dom";
import ClickedOutside from "../ClickedOutside";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ listMenu, sidebarOpen, setSidebarOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const sidebar = useRef(null);
  const trigger = useRef(null);

  const toggleDropdown = (menuName) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

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
              MAIN MENU
            </h3>
            <ul className="flex flex-col gap-3">
              {listMenu.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <>
                      <div
                        onClick={() => toggleDropdown(item.name)}
                        className={`group relative flex items-center gap-2.5 rounded-lg py-3 px-4 font-medium duration-300 ease-in-out cursor-pointer w-full text-left hover:bg-primary ${
                          item.subMenu.some(
                            (subItem) => location.pathname === subItem.link
                          )
                            ? "bg-primary text-white"
                            : activeDropdown === item.name
                            ? "bg-secondary text-white"
                            : "text-white"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {activeDropdown === item.name ? (
                          <FaChevronUp className="ml-auto" />
                        ) : (
                          <FaChevronDown className="ml-auto" />
                        )}
                      </div>

                      {/* Render submenu */}
                      {activeDropdown === item.name && (
                        <ul className="mt-2 flex flex-col gap-2">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                onClick={() => setSidebarOpen(false)}
                                to={subItem.link}
                                className={({ isActive }) =>
                                  `group pl-12 relative flex items-center gap-2.5 rounded-lg py-3 px-4 font-medium duration-300 text-sm ease-in-out hover:text-primary ${
                                    isActive
                                      ? "text-primary"
                                      : "text-white"
                                  }`
                                }
                              >
                                <span>{subItem.name}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      onClick={() => setSidebarOpen(false)}
                      to={item.link}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-2.5 rounded-lg py-3 px-4 font-medium duration-300 ease-in-out hover:bg-primary ${
                          isActive ? "text-white bg-primary" : "text-white"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  )}
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
