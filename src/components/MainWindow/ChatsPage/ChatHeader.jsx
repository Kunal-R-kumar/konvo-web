import { useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";
import avatar from "../../../assets/images/avatar.png";

const ChatHeader = () => {
  const { activeChat, setActiveChat, isMobile } = useContext(UIContext);

  const userName = activeChat?.name
    ? activeChat.name.charAt(0).toUpperCase() + activeChat.name.slice(1)
    : "User";

  return (
    <div className="page-header">
      <div className="profile">
        {isMobile && (
          <IoIosArrowBack
            className="back-btn"
            onClick={() => setActiveChat(null)}
          />
        )}

        <img
          src={
            !activeChat?.imageUrl || activeChat?.imageUrl === "k_konvo_null"
              ? avatar
              : activeChat?.imageUrl
          }
          alt="Profile"
          className="profile-pic"
        />

        <div className="profile-header-info-section">
          <h4>{userName}</h4>
          {activeChat?.contact && <p>{activeChat.contact}</p>}
        </div>
      </div>
      <button className="menu-btn">⋮</button>
    </div>
  );
};

export default ChatHeader;
