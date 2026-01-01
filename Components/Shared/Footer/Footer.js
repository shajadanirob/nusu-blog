import React from 'react';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#FFFFFF] py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Need Help Section */}
        <div className="space-y-4">
          <h4 className="text-orange-500 text-lg font-bold">Need Help?</h4>
          <p>Call us: 09638090000</p>
          <p>Email us: <a href="mailto:cc.believerssign@gmail.com" className="text-[#FFFFFF]">cc.demo@gmail.com</a></p>
          <p>
            Shop Address: 
            <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF]">
              Shop-3/1, Eastern Plaza, Hatirpool, Dhaka, Dhaka, Bangladesh...
            </a>
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-orange-500 hover:text-gray-300">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-orange-500 hover:text-gray-300">
              <FiYoutube className="w-5 h-5" />
            </a>
            <a href="#" className="text-orange-500 hover:text-gray-300">
              <FiInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Customers Account Section */}
        <div className="space-y-4">
          <h4 className="text-orange-500 text-lg font-bold">Customers Account</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Sign in</a></li>
            <li><a href="#" className="hover:text-gray-300">Create New Account</a></li>
            <li><a href="#" className="hover:text-gray-300">My Orders</a></li>
            <li><a href="#" className="hover:text-gray-300">Join as an Affiliate Partner</a></li>
            <li><a href="#" className="hover:text-gray-300">Complain Box</a></li>
          </ul>
        </div>

        {/* Related Pages Section */}
        <div className="space-y-4">
          <h4 className="text-orange-500 text-lg font-bold">Related Pages</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Refund & Return</a></li>
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-300">Our Showrooms</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>
          Hawkars aco © 2024 POWERED BY 
          <a href="https://storex.com" target="_blank" className="text-green-500 hover:underline ml-1">STOREX</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
