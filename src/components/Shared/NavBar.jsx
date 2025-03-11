import React from "react";
import logo from "../../assets/ball.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="w-full border-b-2 pb-2 mb-2">
      <nav className="w-full flex justify-evenly py-2 px-3 max-md:flex-col max-md:justify-center">
        <Link
          to="/"
          className="navLogo w-8 h-8 flex max-md:justify-center max-md:mx-auto"
        >
          <img src={logo} />
          <h1 className="text-[20px] font-medium text-white ml-3">
            Shootha <span className="text-[#c3cc5a]">Goal</span>
          </h1>
        </Link>
        <div className="flex gap-2 my-auto max-md:justify-center max-md:gap-1">
          <Link
            to="/"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3 max-md:text-[14px] max-md:mt-4"
          >
            Home
          </Link>
          <Link
            to="/topSocer"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3 max-md:text-[14px] max-md:mt-4"
          >
            Top Socers
          </Link>
          <Link
            to="/TopAssists"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3 max-md:text-[14px] max-md:mt-4"
          >
            Top Assists
          </Link>
          <a
            href="#"
            className="sideBarLink flex text-white text-[17px] font-semibold mb-3 max-md:text-[14px] max-md:mt-4"
          >
            Notification
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
