import { useGetOrderQuery } from '@/redux/feature/order/orderApi';
import React, { useState } from 'react';

const OrderTracker = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState('');
  const { data: order, error, isLoading } = useGetOrderQuery(submittedOrderNumber, {
    skip: !submittedOrderNumber, // Skip query if no order number is entered
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedOrderNumber(orderNumber);
  };

  return (
    <div className="order-tracker">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Enter Order Number"
          required
        />
        <button type="submit">Track Order</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {order && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p>Order Number: {order.orderNumber}</p>
          <p>User Name: {order.userName}</p>
          <p>User Mobile: {order.userMobile}</p>
          <p>User Address: {order.userAddress}</p>
          <p>Location: {order.location}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <p>Status: {order.status}</p>
          {/* Add more order details as needed */}
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
