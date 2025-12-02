import { useState } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    console.log("Send:", text);
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
