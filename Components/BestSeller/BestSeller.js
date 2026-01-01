import React from "react";
import FeaturedProductCard from "../FeaturedProduct/FeaturedProductCard";

const BestSeller = async () => {
  const res = await fetch("https://hawkers-accessories-backend.vercel.app/api/products/type/BestSeller", {
    cache :'no-store'
  });
  const data = await res.json()
  const product = data.data

  return (
    <div className=" rounded-md max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-5 my-10">
        <h1 className='text-xl font-bold my-5'>Featured Products</h1>

     <FeaturedProductCard data={product}/>
    </div>
  );
};

export default BestSeller;
