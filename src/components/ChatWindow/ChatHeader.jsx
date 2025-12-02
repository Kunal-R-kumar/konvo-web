import { useContext } from "react";
import { UIContext } from "../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";

const ChatHeader = () => {
  const { activeChat, setActiveChat, isMobile } = useContext(UIContext);

  return (
    <div className="chat-header">
      <div className="profile">
        {isMobile && (
          <IoIosArrowBack
            className="back-btn"
            onClick={() => setActiveChat(null)}
          />
        )}
        <img src={activeChat?.img} alt="" className="profile-pic" />
        <div className="profile-header-info-section">
          <h4>{activeChat?.name}</h4>
          <p>activeChat?.contact</p>
        </div>
      </div>
      <button className="menu-btn">⋮</button>
    </div>
  );
};

export default ChatHeader;
