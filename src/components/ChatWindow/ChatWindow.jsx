import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import SideMenuBar from "./SideMenuBar";
import ChatList from "./ChatList";
import ChatListNavbar from "./ChatListNavbar";
import StatusPage from "./StatusPage";
import CallsPage from "./CallsPage";
import ArchivePage from "./ArchivePage";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import { UIContext } from "../../context/UIContext";

import "./ChatWindow.css";
const ChatWindow = () => {
  const { activeChat, isMobile, activeTab } = useContext(UIContext);

  return (
    <div className="chat-window">
      {/* Chats Tab */}
      {activeTab === "Chats" && (
        <>
          {!isMobile && (
            <>
              <SideMenuBar />
              <div className="chat-list-section">
                <ChatListNavbar />
                <ChatList />
              </div>
            </>
          )}
          {isMobile && !activeChat && (
            <div className="chat-list-section">
              <ChatListNavbar />
              <ChatList />
              <SideMenuBar />
            </div>
          )}
          {activeChat && (
            <div className="chat-area-section">
              <ChatHeader />
              <Messages />
              <MessageInput />
            </div>
          )}
        </>
      )}
      {/* Status Tab */}
      {activeTab === "Status" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <ChatListNavbar />
            <StatusPage />
          </div>
        </>
      )}
      {activeTab === "Status" && isMobile && (
        <>
          <div className="pages-section">
            <ChatListNavbar />
            <StatusPage />
            <SideMenuBar />
          </div>
        </>
      )}
      {/* Calls Tab */}
      {activeTab === "Calls" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <ChatListNavbar />
            <CallsPage />
          </div>
        </>
      )}
      {activeTab === "Calls" && isMobile && (
        <>
          <div className="pages-section">
            <ChatListNavbar />
            <CallsPage />
            <SideMenuBar />
          </div>
        </>
      )}
      {/* Archive Tab */}
      {activeTab === "Archive" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <ChatListNavbar />
            <ArchivePage />
          </div>
        </>
      )}
      {activeTab === "Archive" && isMobile && (
        <>
          <div className="pages-section">
            <ChatListNavbar />
            <ArchivePage />
            <SideMenuBar />
          </div>
        </>
      )}
      {/* Settings Tab */}
      {activeTab === "Settings" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <ChatListNavbar />
            <SettingsPage />
          </div>
        </>
      )}
      {activeTab === "Settings" && isMobile && (
        <>
          <div className="pages-section">
            <ChatListNavbar />
            <SettingsPage />
            <SideMenuBar />
          </div>
        </>
      )}{" "}
      {/* Profile Tab */}
      {activeTab === "Profile" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <ChatListNavbar />
            <ProfilePage />
          </div>
        </>
      )}
      {activeTab === "Profile" && isMobile && (
        <>
          <div className="pages-section">
            <ChatListNavbar />
            <ProfilePage />
            <SideMenuBar />
          </div>
        </>
      )}
    </div>
  );
};
export default ChatWindow;
