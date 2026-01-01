import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import ProductsCard from "../ProductsCard/ProductsCard";

const FeaturedProduct = async () => {
  const res = await fetch("https://hawkers-accessories-backend.vercel.app/api/products/type/Featured", {
    cache :'no-store'
  });
  const data = await res?.json()
  const product = data.data

  return (
    <div className=" rounded-md max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-5 my-10">
        <h1 className='text-xl font-bold my-5'>Best Seller Products</h1>

     <ProductsCard data={product}/>
    </div>
  );
};

export default FeaturedProduct;
