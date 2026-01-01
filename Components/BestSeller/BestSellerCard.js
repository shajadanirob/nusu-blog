import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BestSellerCard = ({data}) => {
 
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 '>


          {
            data.map(item => 
                <div key={item._id}>
                        <div className="group relative border border-gray-300 ">
                   <Link href={`/ProductsDetails/${item._id}`}>
                     <div className="  ">
                       <Image
                         alt="prod-1"
                         id="product_view"
                        
                         width="500"
                         height="500"
                         decoding="async"
                         
                         src={item.imageOne}
                         style={{ color: 'transparent' }}
                       />
                     </div>
                
                   </Link>
                  
                   <div className="mt-3 p-2">
                     <p className="text-xs text-center xls:text-xs xms:text-xs xs:text-xs h-[40px]">{item.name}</p>
                     <div className="flex justify-center items-center space-x-2">
                       <p className="font-extrabold text-sm xls:text-xs xms:text-xs xs:text-xs">TK.{item.price}</p>
                       
                     </div>
                   </div>
                   <Link href={`/ProductsDetails/${item._id}`} className="w-full flex xms:block xs:block justify-between space-x-2 xms:space-x-0 xs:space-x-0">
                     <button className="bg-[#CD6727] text-white w-full py-2 text-sm capitalize font-semibold xms:mt-2 xs:mt-2" id="product_view">
                       buy now
                     </button>
                   </Link>
                 </div>
                     </div>)
          }

        </div>
    );
};

export default BestSellerCard;