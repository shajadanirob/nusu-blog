import React from "react";
import { Timeline } from "antd";

const UserTimeline = ({ timeline }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
      <Timeline>
        {timeline?.map((event, index) => (
          <Timeline.Item 
            key={index} 
            label={new Date(event.timestamp).toLocaleString()}
            className="text-gray-700"
          >
            <div className="bg-blue-100 rounded-md p-2">
              {event.description}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default UserTimeline;
