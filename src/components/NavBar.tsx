import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation as staticNavigation } from "../constants";
import { useAuth } from "./authContext";
import AppDrawer from "./AppDrawrer";
import MenuSvg from "../assets/svg/MenuSvg";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamically filter navigation items based on roles
  const navigation = staticNavigation.filter((item) => {
        // Hide "Admin Panel" for users who are not superadmin or hospital admin
    if (item.title === "Admin Panel" && !(user?.is_superuser || user?.is_hospital_admin)) {
      return false;
    }
        // Hide "Reports" for superadmin
    if (item.title === "Reports" && user?.is_superuser){
      return false;
    }
    return true;
  });

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 200);
  };

  return (
    <div
      className={`w-full border-b border-gray-200 bg-white shadow-lg ${
        openNavigation ? "bg-white" : "bg-opacity-90"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-10">
        <a className="block w-[12rem] xl:mr-8">
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
              <div
                key={item.id}
                onMouseEnter={item.subMenu ? handleMouseEnter : undefined}
                onMouseLeave={item.subMenu ? handleMouseLeave : undefined}
                className="relative"
              >
                <a
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
                {item.subMenu && submenuOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 bg-white border shadow-xl py-2 w-48 rounded-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.subMenu.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.url}
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
        <div className="hidden lg:flex items-center">
          {isAuthenticated ? (
            <AppDrawer
              src="https://via.placeholder.com/50"
              alt="Profile Image"
            />
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
