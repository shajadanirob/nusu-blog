import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewArrivalCard = ({ data }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
      {data?.map((item) => (
        <div key={item._id} className="w-full">
          <div className="group relative border border-gray-300">
            <Link href={`/ProductsDetails/${item._id}`}>
              {/* Responsive Image Sizing */}
              <div className="relative lg:h-[250px] h-[100px] md:h-[300px] ">
                <Image
                  alt="product image"
                  id="product_view"
                  width={500}
                  height={500}
                  decoding="async"
                  src={item.imageOne}
                  style={{ objectFit: 'cover', color: 'transparent' }}
                  className="w-full h-full"
                />
              </div>
            </Link>
            <div className="mt-3 p-2 text-center">
              <p className="text-xs h-[40px]">{item.name}</p>
              <div className="flex justify-center items-center space-x-2">
                <p className="font-extrabold text-sm">TK. {item.price}</p>
              </div>
            </div>
            <Link href={`/ProductsDetails/${item._id}`} className="w-full flex justify-between">
              <button className="bg-[#CD6727] text-white w-full py-2 text-sm capitalize font-semibold mt-2">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewArrivalCard;
