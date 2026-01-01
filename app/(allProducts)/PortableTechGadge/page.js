
import AllProductCategoryPage from '@/Components/AllProductCategoryPage/AllProductCategoryPage';
import Link from 'next/link';
import React from 'react';

const page = async() => {
  const res = await fetch("https://hawkers-accessories-backend.vercel.app/api/products/types/PortableTech&Gadgets", {
    cache :'no-store'
  });
  const data = await res.json()
  const product = data.data
  console.log(data);
  return (
    <div>
    <div className="bg-gray-300 py-2 px-4 my-16 md:my-3">
      <nav className="text-sm text-gray-600">
        <Link href="/" className="text-gray-800 hover:underline">
          Home
        </Link>
       
        <span className="mx-2"> &gt;&gt; </span>
        <span className="text-gray-500">Portable Tech & Gadgets</span>
      </nav>
    </div>
     <AllProductCategoryPage data={product}/>
    </div>
  );
};

export default page;