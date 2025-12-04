// import React, { useContext } from "react";
// import { UIContext } from "../../../context/UIContext";
// const Messages = () => {
//   const { activeChat } = useContext(UIContext);
//   return (
//     <div className="messages">
//       <div className="message date">23-06-1980</div>
//       <div className="message sent">HI, How are you</div>
//       <div className="message received">I am good! You?</div>
//     </div>
//   );
// };
// export default Messages;
import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { UIContext } from "../../../context/UIContext";
import { auth, db } from "../../../Firebase/firebase";
import { ref, onValue, off } from "firebase/database";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const Messages = () => {
  const { activeChat } = useContext(UIContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, messages]);
  useEffect(() => {
    if (!activeChat) return;

    const currentUser = auth.currentUser.uid;
    const chatId = `${currentUser + activeChat.uid}`;
    const chatRef = ref(db, `chats/${chatId}/messages`);

    const listener = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setMessages([]);

      const msgs = Object.entries(data)
        .map(([id, msg]) => ({ id, ...msg }))
        .sort((a, b) => a.timestamp - b.timestamp);

      setMessages(msgs);
    });

    return () => off(chatRef);
  }, [activeChat]);

  if (!activeChat) return null;

  let lastShownDate = "";

  return (
    <div className="messages">
      {messages.map((msg) => {
        const date = dayjs(msg.timestamp).format("DD MMM YYYY");
        const showDate = date !== lastShownDate;
        if (showDate) lastShownDate = date;

        return (
          <React.Fragment key={msg.id}>
            {/* Only one date per day */}
            {showDate && <div className="message date">{date}</div>}
            <div
              className={`message ${
                msg.senderId === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <span className="message-text">{msg.message}</span>
              <span className="message-time">
                {dayjs(msg.timestamp).format("HH:mm")}
              </span>
              {/* Comment */}
            </div>
          </React.Fragment>
        );
      })}

      {/* 🔻Scroll Anchor */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;

// import { useContext, useEffect, useState, useRef } from "react";
// import { UIContext } from "../../../context/UIContext";
// import { auth, db } from "../../../Firebase/firebase";
// import { ref, onValue, off } from "firebase/database";
// import dayjs from "dayjs";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// dayjs.extend(localizedFormat);

// const Messages = () => {
//   const { activeChat } = useContext(UIContext);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!activeChat) return;

//     const currentUser = auth.currentUser.uid;
//     const chatId = `${currentUser + activeChat.uid}`;
//     const chatRef = ref(db, `chats/${chatId}/messages`);

//     const listener = onValue(chatRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) return setMessages([]);

//       const msgs = Object.entries(data)
//         .map(([id, msg]) => ({ id, ...msg }))
//         .sort((a, b) => a.timestamp - b.timestamp);

//       setMessages(msgs);
//     });

//     return () => off(chatRef, "value", listener);
//   }, [activeChat]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!activeChat) return <div className="messages empty">Select a chat</div>;

//   let lastShownDate = "";

//   return (
//     <div className="messages-container">
//       {" "}
//       {/* single container */}
//       {messages.map((msg) => {
//         const formattedDate = dayjs(msg.timestamp).format("DD MMM YYYY");
//         const showDate = formattedDate !== lastShownDate;
//         if (showDate) lastShownDate = formattedDate;

//         return (
//           <div key={msg.id}>
//             {showDate && <div className="message date">{formattedDate}</div>}

//             <div
//               className={`message ${
//                 msg.senderId === auth.currentUser.uid ? "sent" : "received"
//               }`}
//             >
//               {msg.message}
//               <div className="message-time">
//                 {dayjs(msg.timestamp).format("HH:mm")}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       <div ref={messagesEndRef}></div>
//     </div>
//   );
// };

// export default Messages;
