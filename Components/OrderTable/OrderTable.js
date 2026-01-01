'use client';
import React, { useState } from "react";
import { Table, Button, Tag, Space, notification } from "antd";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from "@/redux/feature/order/orderApi";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";

const OrderTable = () => {
  const { data: ordersData, error, isLoading, refetch } = useGetOrdersQuery({ page: 1, limit: 10 });
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders.</div>;

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteOrder(orderId);
      toast.success("Order deleted successfully!");
      refetch();
    }
  };

  const handleStatusChange = async (order) => {
    const currentStatus = order.status;
    let newStatus;

    if (currentStatus === "PENDING") {
      newStatus = "APPROVED";
    } else if (currentStatus === "APPROVED") {
      newStatus = "DELIVERED";
    } else {
      newStatus = "PENDING";
    }

    try {
      const response = await updateOrder({ id: order._id, status: newStatus });
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}!`);
        refetch(); // Refetch orders to refresh the table
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      toast.error('Failed to update order status.');
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "OrderNumber",
      key: "orderNumber",
    },
    {
      title: "Customer Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Total Amount (৳)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `৳${totalPrice}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "PENDING") {
          color = "red";
        } else if (status === "APPROVED") {
          color = "orange";
        } else if (status === "DELIVERED") {
          color = "green";
        } else {
          color = "grey";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <Space size="middle">
          <Button onClick={() => openModal(order)}>Details</Button>
          <Button onClick={() => handleStatusChange(order)}>
            {order.status === "PENDING" ? "Approve" : order.status === "APPROVED" ? "Deliver" : "Reset"}
          </Button>
          <Button danger onClick={() => handleDelete(order._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen mt-12 mb-28 px-4">
      <Table
        columns={columns}
        dataSource={ordersData?.data || []} // Ensure you access the correct data structure
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No Orders Found" }}
        bordered
        rowClassName="hover:bg-gray-100"
      />
      <OrderDetailsModal
        visible={isModalVisible}
        onClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderTable;
