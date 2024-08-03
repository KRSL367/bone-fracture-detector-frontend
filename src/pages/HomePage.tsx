import React from "react";
import { useAuth } from "../components/authContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <NavBar />
      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
