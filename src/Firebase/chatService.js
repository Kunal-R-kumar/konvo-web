import { ref, push, onChildAdded } from "firebase/database";
import { db } from "./firebase";

export const sendMessage = (chatId, userId, text) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  push(messagesRef, {
    message: text,
    senderId: userId,
    timestamp: Date.now(),
  });
};

export const listenMessages = (chatId, callback) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  onChildAdded(messagesRef, (snapshot) => {
    callback(snapshot.val());
  });
};
