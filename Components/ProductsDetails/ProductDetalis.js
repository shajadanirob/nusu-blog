'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseFloat(product.price) || 0);

  // Debugging: Log the product object to ensure it contains the expected properties
  console.log('Product:', product);

  useEffect(() => {
    setTotalPrice((parseFloat(product.price) || 0) * quantity);
  }, [quantity, product.price]);

  const incrementQuantity = () => {
    if (quantity < parseInt(product.stockQuantity)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isOutOfStock = product.stockQuantity === '0';
  console.log('Is Out of Stock:', isOutOfStock);

  const addToCart = () => {
    // Show loading toast
    const toastId = toast.loading("Adding product to cart...");

    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex((item) => item._id === product._id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update toast to success
      toast.success("Product added to cart!");
      toast.dismiss(toastId);
    }, 1000); // Simulate a delay for loading
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 my-5">
      {/* Toast Container */}
      <Toaster />
      
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row p-6">
        {/* Left Section: Product Image */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <Image
            width={500}
            height={500}
            src={product.imageOne || '/placeholder-image.png'} // Use a placeholder image if the product image is not available
            alt={product.name || 'Product Image'} // Use a fallback alt text
            className="object-cover h-64 w-full lg:w-3/4 rounded-md"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-10">
          <h2 className="text-2xl font-semibold">{product.name || 'Product Name'}</h2>
          <p className="text-sm text-gray-500 mt-2">{product.brand || 'Brand'}</p>
          <p className="mt-2 text-gray-400">{product.description || 'Product Description'}</p>

          {/* Price Section */}
          <div className="mt-4 flex items-center">
            <span className="text-2xl font-bold text-red-600">{`৳ ${totalPrice.toFixed(2)}`}</span>
            {product.originalPrice && (
              <span className="ml-3 line-through text-gray-500">{`৳ ${product.originalPrice}`}</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-4">Quantity:</span>
              <div className="flex">
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 px-3 py-1 rounded-l-lg"
                  disabled={isOutOfStock}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border-t border-b border-gray-200"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 px-3 py-1 rounded-r-lg"
                  disabled={isOutOfStock || quantity >= parseInt(product.stockQuantity)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="mt-6">
            <button
              className={`bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 mr-4 ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isOutOfStock}
              onClick={addToCart}
            >
              Add to cart
            </button>
            
          </div>

          {/* Brand & Stock Info */}
          <div className="mt-4 text-gray-500">
            <p>Brand: <span className="text-black">{product.brand || 'Believers Sign'}</span></p>
            <p>Status: <span className={isOutOfStock ? 'text-red-600' : 'text-green-600'}>{isOutOfStock ? 'Out of Stock' : 'In Stock'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
