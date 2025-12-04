import { createContext, useState, useEffect } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [activeSettings, setActiveSettings] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("Chats");

  // Check screen size for mobile layout
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Back button + ESC key close chat
  useEffect(() => {
    const handleBackPress = (e) => {
      if (activeChat) {
        e.preventDefault();
        setActiveChat(null);
        window.history.pushState(null, "", window.location.href);
      }
    };

    const handleEscPress = (e) => {
      if (e.key === "Escape" && activeChat) {
        setActiveChat(null);
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleBackPress); // Android/Browser Back
    window.addEventListener("keydown", handleEscPress); // ESC Key

    // Add dummy history entry so back won't exit
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handleBackPress);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [activeChat]);

  return (
    <UIContext.Provider
      value={{
        activeChat,
        setActiveChat,
        isMobile,
        activeTab,
        setActiveTab,
        activeStatus,
        setActiveStatus,
        activeSettings,
        setActiveSettings,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
