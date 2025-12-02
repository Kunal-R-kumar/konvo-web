import React, { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { UIContext } from "../../../context/UIContext";

const ChatArea = () => {
  const { activeChat } = useContext(UIContext);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever activeChat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  if (!activeChat) {
    return (
      <div className="chat-empty-msg">
        <h1>Select a chat to start messaging</h1>
      </div>
    );
  }

  return (
    <div className="chat-area-section">
      <ChatHeader />
      <div className="messages">
        <Messages />
        <div ref={messagesEndRef}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatArea;
