import React, { useContext } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { UIContext } from "../../../context/UIContext";
import EmojiBackground from "../../Doodle/EmojiBackground";

const ChatArea = () => {
  const { activeChat, isMobile } = useContext(UIContext);

  if (!activeChat) {
    return (
      <>
        {!isMobile && (
          <div className="empty-msg">
            <EmojiBackground bgUicolor="--wlbd-color" />
            <h1>🗨️Select a chat to start messaging</h1>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="right-section">
      <EmojiBackground bgUicolor="--chat-bg" />
      <ChatHeader />
      <div className="messages-area">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatArea;
