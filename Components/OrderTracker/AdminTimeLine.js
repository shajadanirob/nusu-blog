import React, { useState } from "react";
import { Button, Input, Form, notification } from "antd";
import { useUpdateOrderMutation } from "@/redux/feature/order/orderApi";

const AdminTimeline = ({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();
  const [eventDescription, setEventDescription] = useState("");

  const handleAddTimelineEvent = async () => {
    const newEvent = {
      description: eventDescription,
      timestamp: new Date().toISOString(),
    };

    try {
      await updateOrder({
        id: order._id,
        timeline: [...order.timeline, newEvent],
      });
      notification.success({ message: "Timeline updated successfully!" });
      setEventDescription("");
    } catch (error) {
      notification.error({ message: "Failed to update timeline." });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">Add Timeline Event</h3>
      <Form layout="inline">
        <Form.Item>
          <Input
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            onClick={handleAddTimelineEvent} 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminTimeline;
