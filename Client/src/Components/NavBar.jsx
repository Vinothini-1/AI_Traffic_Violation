import React from "react";
import LogoutContainer from "./LogoutContainer";
import logo from "../assets/logo/traffic-icon-7-removebg-preview.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="bg-background">
      {/* nav container */}
      <nav className="relative container mx-auto pl-10 pr-10 pt-0 bg-background">
        <div className="flex justify-between items-center">
          {/* flex container for logo */}
          <div className="flex items-center space-x-20">
            {/* logo */}
            <img src={logo} alt="logo" className="w-80 h-40 object-cente" />

            {/* left menu */}
            <div className="hidden space-x-8 font-bold lg:flex">
            <p className="text-pink-500 hover:text-violet-800 text-xl cursor-pointer">

                <Link to="/"> Home </Link>
              </p>
              <p className="text-pink-500 hover:text-pink-800 text-xl cursor-pointer">

                About
              </p>
              <p className="text-pink-500 hover:text-pink-800 text-xl cursor-pointer">

                Recsources
              </p>
            </div>
          </div>

          {/* right menu */}
          <div className=" flex items-center space-x-6 font-bold text-pink">
            <Link to="/login">
            <p className="text-pink-500 hover:text-white-800 text-xl cursor-pointer">

                Login
              </p>{" "}
            </Link>
            <Link to="/register">
            <p className="px-6 py-3 font-bold text-white bg-pink-500 shadow-lg rounded-full transform transition-shadow hover:bg-pink-700 cursor-pointer">
  Sign Up
</p>

            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
