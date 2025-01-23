import React, { useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

interface AppDrawerProps {
  src?: string;
  alt: string;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <div
        ref={btnRef}
        className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer"
        onClick={onOpen}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>

          <div className="relative bg-white w-80 h-full shadow-xl z-50">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.username}</span>
                  <span className="text-xs text-gray-500">
                    {user?.full_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6">
              <button
                className="w-full text-left bg-transparent font-light text-sm py-2 flex items-center space-x-4 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppDrawer;
