import React, { useContext, useEffect, useRef } from "react";
import StatusHeader from "./StatusHeader";
import { UIContext } from "../../../context/UIContext";
// import ScrollControls from "../ScrollControls";

const StatusArea = () => {
  const { activeStatus } = useContext(UIContext);
  // const scrollContainerRef = useRef(null);
  if (!activeStatus) {
    return (
      <div className="status-area-section">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="status-area-section">
      {/* Chat Header */}
      <StatusHeader />

      {/* Messages container */}
      {/* <div className="messages" ref={scrollContainerRef}> */}
      {/* <div className="messages">
        <Messages />
        <div ref={messagesEndRef}></div>
      </div> */}

      {/* Scroll buttons */}
      {/* <ScrollControls scrollContainerRef={scrollContainerRef} /> */}

      {/* Message Input */}
      {/* <MessageInput /> */}
    </div>
  );
};

export default StatusArea;
