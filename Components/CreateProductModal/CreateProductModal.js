
'use client';

import { useState } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined, TagOutlined, InboxOutlined, DollarOutlined, NumberOutlined, FileTextOutlined, ShopOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/redux/feature/product/productsApi";

const CreateProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stockQuantity: "",
    description: "",
    productType: "",
    imageOne: "",
    offer: "",
  });
  const [errors, setErrors] = useState({});
  const [createProduct] = useCreateProductMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.imageOne) newErrors.imageOne = "Product image link is required";
    if (!formData.price) newErrors.price = "Product price is required";
    if (!formData.stockQuantity) newErrors.stockQuantity = "Stock quantity is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description) newErrors.description = "Product description is required";
    if (!formData.productType) newErrors.productType = "Product type is required";
    if (!formData.offer) newErrors.offer = "Offer is required";

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const toastId = toast.loading("Creating...");

    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully", { id: toastId });
      setFormData({
        name: "",
        category: "",
        price: 0,
        stockQuantity: "",
        description: "",
        productType: "",
        imageOne: "",
        offer: "",
      });
      handleCancel();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          onClick={showModal}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center"
          icon={<PlusOutlined />}
        >
          Add New Product
        </Button>
      </div>

      <Modal
        title="Add New Product to Inventory"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="max-w-lg w-full mx-auto"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              <TagOutlined className="mr-2" /> Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="imageOne" className="block text-sm font-medium text-gray-700 mb-1">
              <InboxOutlined className="mr-2" /> Product Image Link One
            </label>
            <input
              id="imageOne"
              name="imageOne"
              type="text"
              placeholder="Enter product image URL"
              value={formData.imageOne}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.imageOne && <span className="text-red-500 text-xs">{errors.imageOne}</span>}
          </div>

          

          <div className="form-group">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              <DollarOutlined className="mr-2" /> Product Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              <NumberOutlined className="mr-2" /> Stock Quantity
            </label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              placeholder="Enter stock quantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.stockQuantity && <span className="text-red-500 text-xs">{errors.stockQuantity}</span>}
          </div>

               {/* Category */}
               <div className="form-group">
  <label
    htmlFor="category"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    <ShopOutlined className="mr-2" /> Category
  </label>
  <select
    id="category"
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
  >
    <option value="" disabled>
      Select product category
    </option>
    <option value=" Mobile&Accessories"> Mobile&Accessories</option>
    <option value="Smartwatches">Smartwatches</option>
    <option value="Audio&Wearables">Audio&Wearables</option>
    <option value=" TechEssentials"> TechEssentials</option>
    <option value="SmartLighting&Decor">  SmartLighting&Decor </option>
    <option value="PortableTech&Gadgets"> PortableTech&Gadgets </option>
   
  </select>
  {errors.category && (
    <span className="text-red-500 text-xs">{errors.category}</span>
  )}
</div>

          <div className="form-group">
            <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
              <FileTextOutlined className="mr-2" /> Product Type
            </label>
            <select
    id="productType"
    name="productType"
    value={formData.productType}
    onChange={handleChange}
    className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
  >
    <option value="" disabled>
      Select product type
    </option>

    <option value="Best Seller">Best Seller</option>
    <option value="Featured">Featured</option>
    <option value="New Arrival">New Arrival</option>
  </select>
            {errors.productType && <span className="text-red-500 text-xs">{errors.productType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="offer" className="block text-sm font-medium text-gray-700 mb-1">
              <FileTextOutlined className="mr-2" /> Offer
            </label>
            <input
              id="offer"
              name="offer"
              type="text"
              placeholder="Enter product offer"
              value={formData.offer}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.offer && <span className="text-red-500 text-xs">{errors.offer}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              <FileTextOutlined className="mr-2" /> Product Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              className="input-field border rounded-lg w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
            />
            {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
          </div>

          <div className="form-group text-right">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              Add Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
