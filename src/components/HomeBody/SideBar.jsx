import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { IoIosFootball, IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

// كمبوننت الشريط الجانبي في الصفحه الرئيسيه
export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-[500] p-2 bg-[#222222] text-white rounded-lg"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative flex flex-col justify-center h-[80vh] rounded-xl bg-[#222222] px-2 py-3 align-top transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        {/* first sec [websiteName & searchInput] */}
        <div className="w-full flex flex-col">
          <h1 className="text-white text-2xl text-center font-semibold mb-3">
            SHOOTHA <span className="text-[#C3CC5A]">GOAL</span>
          </h1>
          <input
            type="search"
            placeholder="search"
            className="w-full text-white outline-none py-1 px-1 rounded-md text-center text-[16px] bg-[#303030]"
          />
        </div>
        {/* second sec Links */}
        <div className="text-left flex flex-col mt-4">
          <a
            href="#"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3"
          >
            <FaHome className="mr-2 my-auto" />
            Home
          </a>
          <Link
            to="/topSocer"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3"
          >
            <FaUser className="mr-2 my-auto" />
            Top Socers
          </Link>
          <Link
            to="/TopAssists"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3"
          >
            <IoIosFootball className="mr-2 my-auto" />
            Top Assists
          </Link>
          {/* <a
            href="#"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3"
          >
            <IoMdNotificationsOutline className="mr-2 my-auto" />
            Notification
          </a> */}
        </div>
        {/* logOut button */}
        {/* <div className="flex mb-3 absolute w-full bottom-4">
          <div className="bg-[#303030] flex p-2">
            <div className="flex flex-col ml-2 text-white">
              <h4 className="text-[14px]">Ahmed fathy</h4>
              <span className="text-[14px]">ahmedfathy241110@gmail.com</span>
            </div>
          </div>
          <CiLogin className="cursor-pointer ml-1 my-auto text-3xl text-[#c3cc5a] bg-[#303030]" />
        </div> */}
      </div>
    </>
  );
};
