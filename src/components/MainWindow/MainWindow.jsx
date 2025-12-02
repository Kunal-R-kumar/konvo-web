import { useContext } from "react";
import ChatHeader from "./ChatsPage/ChatHeader";
import StatusHeader from "./StatusPage/StatusHeader";
import Messages from "./ChatsPage/Messages";
import MessageInput from "./ChatsPage/MessageInput";
import SideMenuBar from "./SideMenuBar";
import ChatList from "./ChatsPage/ChatList";
import MainListNavbar from "./MainListNavbar";
import StatusList from "./StatusPage/StatusList";
import CallsPage from "./CallsPage/CallsPage";
import ArchivePage from "./ArchivePage/ArchivePage";
import SettingsPage from "./SettingsPage/SettingsPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import { UIContext } from "../../context/UIContext";

import "./MainWindow.css";
import ChatArea from "./ChatsPage/ChatArea";
const MainWindow = () => {
  const { activeChat, isMobile, activeTab, activeStatus } =
    useContext(UIContext);

  return (
    <div className="main-window">
      {/* Chats Tab */}
      {activeTab === "Chats" && (
        <>
          {!isMobile && (
            <>
              <SideMenuBar />
              <div className="chat-list-section">
                <MainListNavbar />
                <ChatList />
              </div>
            </>
          )}
          {isMobile && !activeChat && (
            <div className="chat-list-section">
              <MainListNavbar />
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
      {activeTab === "Status" && (
        <>
          {!isMobile && (
            <>
              <SideMenuBar />
              <div className="status-list-section">
                <MainListNavbar />
                <StatusList />
              </div>
            </>
          )}
          {isMobile && !activeStatus && (
            <div className="status-list-section">
              <MainListNavbar />
              <StatusList />
              <SideMenuBar />
            </div>
          )}
          {activeStatus && (
            <div className="status-area-section">
              <StatusHeader />
              <Messages />
            </div>
          )}
        </>
      )}
      {/* Calls Tab */}
      {activeTab === "Calls" && !isMobile && (
        <>
          <SideMenuBar />
          <div className="pages-section">
            <MainListNavbar />
            <CallsPage />
          </div>
        </>
      )}
      {activeTab === "Calls" && isMobile && (
        <>
          <div className="pages-section">
            <MainListNavbar />
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
            <MainListNavbar />
            <ArchivePage />
          </div>
        </>
      )}
      {activeTab === "Archive" && isMobile && (
        <>
          <div className="pages-section">
            <MainListNavbar />
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
            <MainListNavbar />
            <SettingsPage />
          </div>
        </>
      )}
      {activeTab === "Settings" && isMobile && (
        <>
          <div className="pages-section">
            <MainListNavbar />
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
            <MainListNavbar />
            <ProfilePage />
          </div>
        </>
      )}
      {activeTab === "Profile" && isMobile && (
        <>
          <div className="pages-section">
            <MainListNavbar />
            <ProfilePage />
            <SideMenuBar />
          </div>
        </>
      )}
    </div>
  );
};
export default MainWindow;
