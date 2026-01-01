import ProductDetalis from '@/Components/ProductsDetails/ProductDetalis';
import RelatedProducts from '@/Components/RelatedProducts/RelatedProducts';
import React from 'react';

const Page = async ({ params }) => {
  // Check if params and params.id are defined
  if (!params || !params.id) {
    console.error('params or params.id is undefined');
    return <div>Error: Invalid product ID</div>;
  }

  const productId = params.id; // Dynamic route parameter for product ID

  try {
    // Fetch product details
    const res = await fetch(`https://hawkers-accessories-backend.vercel.app/api/products/${productId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch product data');
    }

    const productData = await res.json();
    const product = productData?.data;

    // Fetch related products based on product category
    const relatedRes = await fetch(`https://hawkers-accessories-backend.vercel.app/api/products/types/${product?.category}`, {
      cache: 'no-store',
    });

    if (!relatedRes.ok) {
      throw new Error('Failed to fetch related products');
    }

    const relatedData = await relatedRes.json();
    const relatedProducts = relatedData?.data;

    return (
      <div>
        <ProductDetalis product={product} />
        <RelatedProducts products={relatedProducts} id={params.id}/>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product data:', error);
    return <div>Error: {error.message}</div>;
  }
};

export default Page;
