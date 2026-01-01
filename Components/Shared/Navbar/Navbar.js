'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import Link from "next/link";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { useGetProductsQuery } from "@/redux/feature/product/productsApi";

// Navigation links array without dropdowns
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Mobile & Accessories", href: "/Accessories" },
  { title: "Smart Watch", href: "/SmartWatch" },
  { title: "Audio & Wearables", href: "/AudioWearables" },
  { title: "Tech Essentials", href: "/TechEssentials" },
  { title: "SmartLighting & Decor", href: "/SmartLightingDecor" },
  { title: "Portable Tech & Gadgets", href: "/PortableTechGadge" },
 
];

const useCartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  };

  useEffect(() => {
    getCartItems();
    const handleStorageChange = () => {
      getCartItems();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return cartItems;
};

const Navbar = () => {
  const [showMediaIcon, setMediaIcon] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setIsLoading: userLoading } = useUser();
  const cartItems = useCartItems();

  // Fetch products based on search term
  const { data: products = [] } = useGetProductsQuery(searchTerm ? { searchTerm } : {});


console.log(products.data);
  return (
    <nav className="bg-white shadow-md hidden md:block">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="https://i.ibb.co/m8hMCr7/hawkers-accessories-Logo.jpg"
              alt="Believer's Sign"
              className="h-10"
              height={40}
              width={20}
            />
          </Link>
          <span className="ml-2 text-xl font-bold text-gray-800">Hawkars accessories</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
         
          
          {/* Auto-suggestion Dropdown */}
      
{searchTerm && products?.data?.length > 0 && (
  <div className="absolute z-10 w-full bg-gray-200 border border-gray-300 rounded-lg mt-1 shadow-lg">
    {products?.data?.map((product) => (
      <Link key={product._id} href={`/ProductsDetails/${product._id}`}>
        <div className="flex items-center p-3 hover:bg-gray-100 transition duration-150 ease-in-out">
          {/* Product Image */}
          <Image
            src={product.imageOne} // Assuming `product.image` contains the image URL
            alt={product.name}
            className="h-12 w-12  rounded-lg object-cover"
            width={48}
            height={48}
          />
          {/* Product Details */}
          <div className="ml-3">
            <div className="text-gray-800 font-semibold">{product.name}</div>
            <div className="text-gray-600">৳ {product?.price}</div> {/* Assuming price is a number */}
          </div>
        </div>
      </Link>
    ))}
  </div>
)}


        </div>

        {/* User and Cart Icons */}
        <div className="flex items-center space-x-4">
          {user?.role === 'ADMIN' && (
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
          )}
          {/* {user?.email ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              <FaRegUser className="text-xl" />
            </Link>
          )} */}
          <Link href="/MyCart" className="relative text-gray-600 hover:text-gray-800">
            <GrCart className="text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{cartItems.length}</span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMediaIcon(!showMediaIcon)}>
            {showMediaIcon ? (
              <i className="fas fa-times text-xl"></i>
            ) : (
              <i className="fas fa-bars text-xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <ul className="flex justify-center items-center space-x-6 text-gray-700">
            {navLinks.map((link, index) => (
              <li key={index} className="hover:text-orange-500">
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
