import React, { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { UIContext } from "../../context/UIContext";
import ScrollControls from "./ScrollControls";
import "./ChatWindow.css";

const ChatArea = () => {
  const { activeChat } = useContext(UIContext);
  const messagesEndRef = useRef(null);
  // const scrollContainerRef = useRef(null);

  // Scroll to bottom whenever activeChat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  if (!activeChat) {
    return (
      <div className="chat-area-section chat-empty-msg">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-area-section">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages container */}
      {/* <div className="messages" ref={scrollContainerRef}> */}
      <div className="messages">
        <Messages />
        <div ref={messagesEndRef}></div>
      </div>

      {/* Scroll buttons */}
      {/* <ScrollControls scrollContainerRef={scrollContainerRef} /> */}

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatArea;
