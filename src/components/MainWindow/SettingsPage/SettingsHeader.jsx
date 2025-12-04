import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";

const SettingsHeader = () => {
  const { activeStatus, setActiveStatus } = useContext(UIContext);
  return (
    <div className="page-header">
      <div className="profile">
        <IoIosArrowBack
          className="back-btn"
          onClick={() => setActiveStatus(null)}
        />
        <div className="settings-list-info">
          <setting.Icon className="settings-list-info-icon" />
          <span className="settings-list-info-name">{setting.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
