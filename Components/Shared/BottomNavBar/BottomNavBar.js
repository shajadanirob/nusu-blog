'use client'
import React, { useState } from 'react';
import { FiUser, FiX } from 'react-icons/fi'; // Importing profile and close icons

const BottomNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600 md:hidden">
        <div className="grid h-full gap-64 max-w-lg grid-cols-3 mx-auto">
          {/* Existing Nav Items */}
          <NavItem
            tooltip="Home"
            iconPath="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z"
          />
       
          
          {/* Profile Icon to toggle drawer */}
          <div className="relative group">
            <button
              type="button"
              onClick={toggleDrawer}
              className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <FiUser className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 dark:group-hover:text-blue-500" />
              <span className="sr-only">Profile</span>
            </button>
         
          </div>
        </div>
      </div>

      {/* Profile Drawer (Now Opens from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 bg-white shadow-lg transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
            <button
              onClick={toggleDrawer}
              className="text-orange-500 text-2xl focus:outline-none"
            >
              <FiX />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex flex-col space-y-4">
            <button className="text-gray-800 font-medium text-left">
              Login/Signup
            </button>
            <button className="text-gray-800 font-medium text-left">
              Join as an Affiliate Partner
            </button>

            {/* Input field and Track Order Button */}
            <input
              type="text"
              placeholder="Order ID or Phone Number"
              className="border p-2 w-full rounded-md text-gray-700"
            />
            <button className="bg-black text-white p-2 rounded-md w-full">
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </>
  );
};

// Navigation Item Component
const NavItem = ({ tooltip, iconPath }) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <svg
          className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400  dark:group-hover:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d={iconPath} />
        </svg>
        <span className="sr-only">{tooltip}</span>
      </button>
      <div
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-gray-700"
      >
        {tooltip}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};

export default BottomNavBar;
