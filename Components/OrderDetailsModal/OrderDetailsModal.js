import React from "react";
import { Modal, List, Avatar, Descriptions, Divider, Typography, Button } from "antd";
import html2pdf from "html2pdf.js"; // Import the library for PDF generation

const { Title, Text } = Typography;

const OrderDetailsModal = ({ visible, onClose, order }) => {
  if (!order) return null;

  const downloadPDF = () => {
    const element = document.getElementById("order-details-content");
    const options = {
      margin: 1,
      filename: `Order_${order.OrderNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <Modal
      title={`Order Details: ${order.OrderNumber}`}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="download" onClick={downloadPDF}>
          Download PDF
        </Button>,
      ]}
      width={800}
    >
      <div id="order-details-content">
        <div className="order-details">
          <Title level={4}>Customer Information</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Customer Name">{order.userName}</Descriptions.Item>
            <Descriptions.Item label="Location">{order.location}</Descriptions.Item>
            <Descriptions.Item label="Address">{order.userAddress}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{order.userMobile}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={4}>Order Summary</Title>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Total Price">${order.totalPrice}</Descriptions.Item>
            <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Feedback" span={2}>{order.feedback}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={4}>Ordered Items</Title>
          <List
            itemLayout="horizontal"
            dataSource={order.items}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size={64} src={item.itemImage} />}
                  title={<Text strong>{item.itemName}</Text>}
                  description={
                    <div>
                      <Text>Price: ${item.itemPrice} x {item.itemQuantity}</Text>
                      <br />
                      <Text>Total: ${item.itemPrice * item.itemQuantity}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
