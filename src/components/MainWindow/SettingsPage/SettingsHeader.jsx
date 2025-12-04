import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";

const SettingsHeader = () => {
  const { activeSettings, setActiveSettings } = useContext(UIContext);
  return (
    <div className="page-header">
      <div className="profile">
        <IoIosArrowBack
          className="back-btn"
          onClick={() => setActiveSettings(null)}
        />
        <div className="settings-list-info">
          <activeSettings.Icon className="settings-list-info-icon" />
          <span className="settings-list-info-name">{activeSettings.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
