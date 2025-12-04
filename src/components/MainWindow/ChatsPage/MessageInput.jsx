// import { useState } from "react";

// const MessageInput = () => {
//   const [text, setText] = useState("");

//   const handleSend = () => {
//     if (!text.trim()) return;
//     console.log("Send:", text);
//     setText("");
//   };

//   return (
//     <div className="message-input">
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type a message…"
//       />
//       <button onClick={handleSend}>➤</button>
//     </div>
//   );
// };

// export default MessageInput;
import { useState, useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import { ref, push, set } from "firebase/database";
import { auth, db } from "../../../Firebase/firebase";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { activeChat } = useContext(UIContext);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent new line in input
      handleSend();
    }
  };
  const handleSend = () => {
    if (!text.trim() || !activeChat) return;

    const currentUser = auth.currentUser.uid;

    // ----- Room 1: sender -----
    const senderRoomId = `${currentUser + activeChat.uid}`;
    const senderMessagesRef = ref(db, `chats/${senderRoomId}/messages`);

    // Generate a new unique key
    const newMessageKey = push(senderMessagesRef).key;

    // Message object
    const messageData = {
      message: text,
      senderId: currentUser,
      timestamp: Date.now(),
    };

    // Write to sender's room
    set(
      ref(db, `chats/${senderRoomId}/messages/${newMessageKey}`),
      messageData
    );

    // ----- Room 2: receiver -----
    if (activeChat.uid !== currentUser) {
      const receiverRoomId = `${activeChat.uid + currentUser}`;
      set(
        ref(db, `chats/${receiverRoomId}/messages/${newMessageKey}`),
        messageData
      );
    }

    setText(""); // clear input
  };

  return (
    <div className="message-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
};

export default MessageInput;
