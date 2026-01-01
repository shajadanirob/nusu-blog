"use client";

import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/feature/product/productsApi";

const ProductsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const { data, error, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loading state

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true); // Set loading state to true
          toast.loading("Deleting product..."); // Show loading toast
          await deleteProduct(id).unwrap();
          toast.dismiss(); // Dismiss loading toast
          toast.success("Product deleted successfully!");
        } catch (err) {
          toast.dismiss(); // Dismiss loading toast
          toast.error("Failed to delete product!");
        } finally {
          setLoading(false); // Set loading state to false
        }
      }
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
      stockQuantity: product.stockQuantity,
    });
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true); // Set loading state to true
      toast.loading("Updating product..."); // Show loading toast
      await updateProduct({ id: editingProduct.key, ...values }).unwrap();
      toast.dismiss(); // Dismiss loading toast
      toast.success("Product updated successfully!");
      setIsEditModalVisible(false);
    } catch (err) {
      toast.dismiss(); // Dismiss loading toast
      toast.error("Failed to update product!");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image width={50} height={50} src={image} alt="Product Image" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `৳${price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Product Type",
      dataIndex: "ProductType",
      key: "ProductType",
      sorter: (a, b) => a.ProductType.localeCompare(b.ProductType),
    },
    {
      title: "Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
      render: (quantity) => `${quantity} units`,
    },
    {
      title: "Actions",
      key: "_id",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/ProductsDetails/${record.key}`}>
            <Button type="default" size="small" icon={<EyeOutlined />}>
              Details
            </Button>
          </Link>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Sort dataSource before rendering
  const sortedDataSource = data?.data
    .map((product) => ({
      key: product._id,
      image: product.imageOne,
      name: product.name,
      price: product.price,
      category: product.category,
      ProductType: product.ProductType,
      stockQuantity: product.stockQuantity,
      description: product.description,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Default sorting by name

  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: data?.meta.total || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div className="min-h-screen mt-12 mb-28 px-4">
      <Table
        columns={columns}
        dataSource={sortedDataSource}
        pagination={paginationConfig}
        locale={{ emptyText: "No Product Found!!! Please Add" }}
        bordered
        rowClassName="hover:bg-gray-100"
        scroll={{ x: 576 }}
        style={{ textAlign: "center" }}
      />
      <Modal
        title="Edit Product"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select a product category" },
            ]}
          >
            <Select
              placeholder="Select a category"
              options={[
                { value: "Mobile&Accessories", label: "Mobile&Accessories" },
                { value: "Smartwatches", label: "Smartwatches" },
                { value: "Audio&Wearables", label: "Audio&Wearables" },
                { value: "TechEssentials", label: "TechEssentials" },
                { value: "SmartLighting&Decor", label: "SmartLighting&Decor" },
                {
                  value: "PortableTech&Gadgets",
                  label: "PortableTech& Gadgets",
                },
                // Add more categories as needed
              ]}
            />
          </Form.Item>
          <Form.Item
            name="ProductType"
            label="Product Type"
            rules={[
              { required: false, message: "Please select a product type" },
            ]}
          >
            <Select
              placeholder="Select a product type"
              options={[
                { value: "BestSeller", label: "BestSeller" },
                { value: "Featured", label: "Featured" },
                { value: "NewArrival", label: "NewArrival" },
                // Add more product types as needed
              ]}
            />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="imageOne" label="Image One URL (Optional)">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsTable;
