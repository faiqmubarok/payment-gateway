import propTypes from "prop-types";
import { useState, useRef } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { AiOutlineProduct } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";


import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const DefaultLayout = ({ children }) => {
  const listMenu = [
    {
      name: "Home",
      icon: <FaHome className="w-5 h-5" />,
      link: "/",
    },
    {
      name: "Products",
      icon: <AiOutlineProduct className="w-5 h-5" />,
      subMenu: [
        {
          name: "All Products",
          link: "/products/all-products",
        },
        {
          name: "Manage Products",
          link: "/products/manage",
        },
      ],
    },
    {
      name: "Transactions",
      icon: <GrTransaction className="w-5 h-5" />,
      subMenu: [
        {
          name: "All Transactions",
          link: "/transactions/all-transactions",
        },
        {
          name: "Manage Transactions",
          link: "/transactions/manage",
        },
      ],
    },
    {
      name: "Users",
      icon: <FaRegUser className="w-5 h-5" />,
      link: "/users",
    },
  ];

  const scrollableRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-poppins main-body">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          listMenu={listMenu}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Sidebar */}
        <div
          className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden no-scrollbar"
          ref={scrollableRef}
        >
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Header */}

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          <ScrollToTop scrollableRef={scrollableRef} />
        </div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: propTypes.node,
};

export default DefaultLayout;
