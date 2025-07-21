import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const ProfileDropdown = ({ username, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative inline-block text-left">
        {/* Profile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 py-2 pl-2 pr-2 md:pr-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition-transform"
        >
          {/* Profile Icon */}
          <AccountCircleOutlinedIcon className="text-2xl" />

          {/* Username (Only on md and above) */}
          <span className="hidden md:inline text-sm font-medium">
            {username}
          </span>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
            <div className="py-1">
              {/* Username (Only on small screens) */}
              <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 md:hidden">
                {username}
              </p>

              {/* Logout Option */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
