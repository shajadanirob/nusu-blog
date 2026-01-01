import CreateProductModal from '@/Components/CreateProductModal/CreateProductModal';
import ProductsTable from '@/Components/ProductTable/ProductTable';
import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen mt-12'>
            <CreateProductModal/>
          <ProductsTable/>
        </div>
    );
};

export default page;