import { SlLogout } from "react-icons/sl";
import ClickedOutside from "../ClickedOutside";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import images from "../../images/image";

const DropdownUser = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    photoProfile: "",
  });

  useEffect(() => {
    setUser({
      name: "Muhammad Faiq Mubarok",
      email: "faiqmubarok@gmail.com",
      photoProfile: "",
    })
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <ClickedOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5"
          to="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black">
              {user.name}
            </span>
            <span className="block text-xs">{user.email}</span>
          </span>

          <span className="h-12 w-12 rounded-full overflow-hidden drop-shadow-md">
            <img
              className="h-full w-full"
              src={
                user.photoProfile ? user.photoProfile : images.userProfile
              }
              alt="userProfile"
            />
          </span>

          <IoIosArrowDown className="w-4 h-4" />
        </button>

        {/* Start Dropdown */}
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-4 flex w-60 flex-col rounded-sm border border-gray-200 bg-white shadow-md`}
          >
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <SlLogout className="w-5 h-5" />
              Keluar
            </button>
          </div>
        )}
        {/* End Dropdown */}
      </li>
    </ClickedOutside>
  );
};

export default DropdownUser;
