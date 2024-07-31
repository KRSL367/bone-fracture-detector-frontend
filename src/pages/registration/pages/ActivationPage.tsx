import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateData } from "../hooks/useActivationData";

const ActivationPage: React.FC = () => {
  const navigate = useNavigate();
  const { activateUser, isLoading, error } = useActivateData();
  const {uid, token} = useParams();

  const handleClick = async () => {
    if (uid && token) {
      const data = { uid, token };
      await activateUser(data);
      navigate("/login");
    } else {
      console.error("UID and token are required for activation.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Activate Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Click the button below to activate your account.
        </p>
      </div>

      {error && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4 text-center text-red-600">
          {error}
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Activating..." : "Activate"}
        </button>
      </div>
    </div>
  );
};

export default ActivationPage;