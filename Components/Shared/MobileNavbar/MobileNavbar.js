'use client';
import React, { useState, useEffect } from 'react';
import { FiMenu, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useGetProductsQuery } from '@/redux/feature/product/productsApi'; // Assuming you have this API query to fetch products
import Link from 'next/link';
import Image from 'next/image';
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
const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for the search modal
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const cartItems = useCartItems();

  // Fetch products based on search term
  const { data: products = [] } = useGetProductsQuery(searchTerm ? { searchTerm } : {});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search modal
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex items-center justify-between lg:px-8 fixed top-0 w-full z-50 md:hidden">
        {/* Left: Hamburger menu and logo */}
        <div className="flex items-center">
          {/* Hamburger Menu */}
          <button className="text-2xl text-orange-500 lg:hidden mr-4" onClick={toggleMenu}>
            <FiMenu />
          </button>

          {/* Logo */}
          <a href="/" className="text-xl font-semibold">
            <span className="text-gray-800">Believers</span> <span className="text-orange-500">Sign</span>
          </a>
        </div>

        {/* Right: Cart Icon with item count */}
        <div className="flex items-center space-x-4">
          {/* Search Icon for Mobile */}
          <FiSearch className="text-xl text-orange-500 lg:hidden" onClick={toggleSearchModal} />

          {/* Cart Icon with item count */}
          <div className="relative">
            <FiShoppingCart className="text-2xl text-orange-500 cursor-pointer" />
            {cartItems?.length > 0 && (
              <Link href={'/MyCart'}>
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems?.length}
              </span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white fixed top-0 left-0 w-4/5 h-full z-50 overflow-y-auto duration-500">
            <div className="flex justify-between items-center py-2 px-2 bg-secondary">
              <h4 className="font-semibold tracking-wider text-white">
                Category
              </h4>
              <button className="focus:outline-none" onClick={toggleMenu}>
                <svg
                  className="h-7 w-7 fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-9.414L9.172 7.757 7.757 9.172 10.585 12 7.757 14.828 9.172 16.243 12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"></path>
                </svg>
              </button>
            </div>
            <ul className="p-4">
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/" className="text-black uppercase font-semibold">
                  Home
                </Link>
              </li>
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/Accessories" className="text-black uppercase font-semibold">
                Mobile & Accessories
                </Link>
              </li>
              
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="SmartWatch" className="text-black uppercase font-semibold">
                Smart Watch
                </Link>
              </li>
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/AudioWearables" className="text-black uppercase font-semibold">
                Audio & Wearables
                </Link>
              </li>
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/TechEssentials" className="text-black uppercase font-semibold">
                Tech Essentials
                </Link>
              </li>
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/SmartLightingDecor" className="text-black uppercase font-semibold">
                SmartLighting & Decor
                </Link>
              </li>
              <li className="list-none py-2 border-b border-gray-300">
                <Link href="/PortableTechGadge" className="text-black uppercase font-semibold">
                Portable Tech & Gadgets
                </Link>
              </li>
              
            </ul>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-start justify-center">
          <div
            className={`bg-white p-4 w-full max-w-lg mx-auto mt-4 rounded shadow-lg transform transition-transform duration-500 ${
              isSearchOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={toggleSearchModal}>
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">Search</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Looking for something? ...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />

            {/* Auto-suggestion List */}
            {searchTerm && products?.data?.length > 0 && (
              <div className="mt-4">
                {products?.data?.map((product) => (
                  <Link key={product._id} href={`/ProductsDetails/${product._id}`}>
                    <div className="flex items-center p-2 border-b border-gray-300 hover:bg-gray-100 transition">
                      {/* Product Image */}
                      <Image
                        src={product.imageOne} // Assuming image URL is in `product.imageOne`
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover"
                        width={48}
                        height={48}
                      />
                      {/* Product Info */}
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-gray-500">${product.price}</p> {/* Assuming price is a number */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {!searchTerm && <p className="mt-4 text-gray-500">Start typing to search for products...</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
