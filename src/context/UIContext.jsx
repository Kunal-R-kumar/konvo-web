import { createContext, useState, useEffect } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("Chats");

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
