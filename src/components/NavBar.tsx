import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import profile from "../assets/profile.webp";
import { useAuth } from "./authContext";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white shadow-lg ${
        openNavigation ? "bg-white" : "bg-opacity-90"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-10">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src="path" width={190} height={40} alt="FractureX" />
        </a>
        <nav
          className={` ${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-white lg:static lg:flex 
        lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-sans text-lg text-gray-700 transition-colors
                    hover:text-blue-600 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-4 py-4 lg:py-0 lg:px-6 ${
                  item.url === location.hash
                    ? "font-bold text-blue-600"
                    : "font-normal"
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>
        <div className="hidden lg:flex items-center">
          {isAuthenticated ? (
            <a
              href="#profile"
              className="text-gray-700 hover:text-blue-600 
            flex justify-between flex-row gap-2 items-center"
            >
              <img
                src={profile}
                alt="Profile Icon"
                className="w-8 h-8 rounded-full"
              />
              <h3>{user?.username}</h3>
            </a>
          ) : (
            <>
              <a
                href="/register"
                className="mr-6 text-gray-700 hover:text-blue-600 transition-colors"
              >
                New account
              </a>
            </>
          )}
        </div>
        <button
          className="ml-auto lg:hidden flex items-center"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
