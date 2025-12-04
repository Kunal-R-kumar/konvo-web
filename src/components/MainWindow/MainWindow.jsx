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
import SettingsArea from "./SettingsPage/SettingsArea";
import ProfilePage from "./ProfilePage/ProfilePage";
import { UIContext } from "../../context/UIContext";

import "./MainWindow.css";
import ChatArea from "./ChatsPage/ChatArea";
import StatusArea from "./StatusPage/StatusArea";
import SettingsList from "./SettingsPage/SettingsList";
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
              <div className="left-section">
                <MainListNavbar />
                <ChatList />
              </div>
            </>
          )}
          {isMobile && !activeChat && (
            <div className="left-section">
              <MainListNavbar />
              <ChatList />
              <SideMenuBar />
            </div>
          )}
          <ChatArea />
          {/* {activeChat && (
            <div className="chat-area-section">
              <ChatHeader />
              <Messages />
              <MessageInput />
            </div>
          )} */}
        </>
      )}
      {/* Status Tab */}
      {activeTab === "Status" && (
        <>
          {!isMobile && (
            <>
              <SideMenuBar />
              <div className="left-section">
                <MainListNavbar />
                <StatusList />
              </div>
            </>
          )}
          {isMobile && !activeStatus && (
            <div className="left-section">
              <MainListNavbar />
              <StatusList />
              <SideMenuBar />
            </div>
          )}
          <StatusArea />
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
      {activeTab === "Settings" && (
        <>
          {!isMobile && (
            <>
              <SideMenuBar />
              <div className="left-section">
                <MainListNavbar />
                <SettingsList />
              </div>
            </>
          )}
          {isMobile && !activeStatus && (
            <div className="left-section">
              <MainListNavbar />
              <SettingsList />
              <SideMenuBar />
            </div>
          )}
          <SettingsArea />
        </>
      )}
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
