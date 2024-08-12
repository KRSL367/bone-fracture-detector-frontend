import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import AppDrawer from "../components/AppDrawrer";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Outlet />
    </>
  );
};

export default Layout;
