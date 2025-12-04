import { useState, useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import { ref, push, set } from "firebase/database";
import { auth, db } from "../../../Firebase/firebase";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { activeChat } = useContext(UIContext);

  const handleSend = () => {
    if (!text.trim() || !activeChat) return;

    const currentUser = auth.currentUser.uid;

    // Generate a unique message ID once
    const senderChatId = `${currentUser + activeChat.uid}`;
    const senderMessagesRef = ref(db, `chats/${senderChatId}/messages`);
    const newMessageKey = push(senderMessagesRef).key;

    const messageData = {
      message: text,
      senderId: currentUser,
      timestamp: Date.now(),
    };

    // Write the same message ID to the sender's room
    set(
      ref(db, `chats/${senderChatId}/messages/${newMessageKey}`),
      messageData
    );

    // Write the same message ID to the receiver's room
    if (activeChat.uid !== currentUser) {
      const receiverChatId = `${activeChat.uid + currentUser}`;
      set(
        ref(db, `chats/${receiverChatId}/messages/${newMessageKey}`),
        messageData
      );
    }

    setText("");
  };

  return (
    <div className="message-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
};

export default MessageInput;
