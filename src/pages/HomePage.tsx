import { useAuth } from "../components/authContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <NavBar  isLoggedIn={isLoggedIn}/>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
