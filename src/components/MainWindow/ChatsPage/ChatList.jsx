import { useContext, useState, useEffect } from "react";
import { UIContext } from "../../../context/UIContext";
import { auth, db } from "../../../Firebase/firebase";
import { ref, onValue } from "firebase/database";
import avatar from "../../../assets/images/avatar.png";
// const dummyUsers = [{ id: 1, name: "Amit", img: avatar }];

const ChatList = () => {
  const { setActiveChat } = useContext(UIContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersDbRef = ref(db, "Users");

    const unsubscribe = onValue(usersDbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedUsers = Object.entries(data).map(([id, user]) => ({
          id,
          uid: user.uid,
          name: user.name || `user${uid}`,
          imageUrl: user.imageUrl || "k_konvo_null",
          contact: user.contact || "Unknown",
        }));
        setUsers(fetchedUsers);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-list left-section-list">
      {users.map((user) => (
        <div
          key={user.id}
          className="chat-user list-element"
          onClick={() => setActiveChat(user)}
        >
          <img
            src={user.imageUrl == "k_konvo_null" ? avatar : user.imageUrl}
            alt={user.name}
            className="profile-pic"
          />
          <div className="profile-list-info">
            <span className="profile-list-info-name">
              {user.name[0].toUpperCase() + user.name.slice(1)}
              {user.uid === auth.currentUser?.uid && <b> (You)</b>}
            </span>
            <span className="profile-list-info-name">{user.contact}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
