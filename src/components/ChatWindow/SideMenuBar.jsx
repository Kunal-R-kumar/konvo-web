import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { UIContext } from "../../context/UIContext";
import { PiChats } from "react-icons/pi";
import { TbTopologyStarRing3 } from "react-icons/tb";
import { MdOutlineCall } from "react-icons/md";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
const SideMenuBar = () => {
  const [open, setOpen] = useState(false);
  const { isMobile, activeTab, setActiveTab } = useContext(UIContext);
  function handleMenuToggle() {
    setOpen(!open);
  }
  function handleShowChats() {
    // toast.info("Showing Chats");
    setActiveTab("Chats");
  }
  function handleShowStatus() {
    // toast.info("Showing Status");
    setActiveTab("Status");
  }
  function handleShowCalls() {
    // toast.info("Showing Calls");
    setActiveTab("Calls");
  }
  function handleShowArchive() {
    // toast.info("Showing Archive");
    setActiveTab("Archive");
  }
  function handleShowSettings() {
    // toast.info("Showing Settings");
    setActiveTab("Settings");
  }
  function handleShowProfile() {
    // toast.info("Showing Profile");
    setActiveTab("Profile");
  }
  return (
    <div className="side-menu">
      <div className="menu-top">
        {!isMobile && (
          <div
            className={`menu-item-top hamburger ${open ? "active" : ""}`}
            onClick={handleMenuToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div className="menu-item-top menu-item" onClick={handleShowChats}>
          <PiChats />
          {(open || isMobile) && "Chats"}
        </div>
        <div className="menu-item-top menu-item" onClick={handleShowStatus}>
          <TbTopologyStarRing3 />
          {(open || isMobile) && "Status"}
        </div>
        <div className="menu-item-top menu-item" onClick={handleShowCalls}>
          <MdOutlineCall /> {(open || isMobile) && "Calls"}
        </div>
        <div className="menu-item-bottom menu-item" onClick={handleShowArchive}>
          <HiOutlineArchiveBoxArrowDown /> {(open || isMobile) && "Archive"}
        </div>
      </div>
      <div className="menu-bottom">
        <div
          className="menu-item-bottom menu-item"
          onClick={handleShowSettings}
        >
          <IoIosSettings /> {(open || isMobile) && "Settings"}
        </div>
        <div className="menu-item-bottom menu-item" onClick={handleShowProfile}>
          <CgProfile /> {(open || isMobile) && "Profile"}{" "}
        </div>
      </div>
    </div>
  );
};

export default SideMenuBar;
