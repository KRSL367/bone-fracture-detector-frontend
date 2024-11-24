import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  const location = useLocation();

  // Define routes where NavBar should not be displayed
  const noNavBarRoutes = ["/login", "/register"];

  // Check if NavBar should be hidden
  const hideNavBar = noNavBarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavBar && <NavBar />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
