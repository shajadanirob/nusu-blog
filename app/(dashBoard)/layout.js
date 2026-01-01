'use client';
import { useState, useEffect } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdManageSearch } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { CiHome } from "react-icons/ci";
import Link from 'next/link';
import { logout } from '@/services/AuthService';
import { useUser } from '@/context/user.provider';

const Layout = ({ children }) => {
  const { user, setIsLoading: userLoading } = useUser();

  const menus = [
    { name: "Static", link: "/dashboard", icon: MdManageSearch },
    { name: "User Management", link: "/dashboard/user", icon: AiOutlineUser },
    { name: "Product Management", link: "/dashboard/productManagement", icon: FiFolder },
    { name: "Order Management", link: "/dashboard/orderManagement", icon: FiShoppingCart },
    { name: "Settings", link: "#", icon: RiSettings4Line, margin: true },
    { name: "Analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Saved", link: "/", icon: AiOutlineHeart },
    { name: "Messages", link: "/", icon: FiMessageSquare },
    { name: "home", link: "/", icon: CiHome },
  ];
  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
     
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-screen ${isSidebarOpen ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link
              href={menu.link}
              key={i}
              className={`${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${currentPath === menu.link ? "bg-gray-800" : ""}`}
            >
              <menu.icon size={20} />
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!isSidebarOpen && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
          
           
          </div>
          <div className="flex items-center space-x-4 px-4">
          <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
