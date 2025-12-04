import { useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import { MdManageAccounts } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { TbMailForward } from "react-icons/tb";
import { MdLockReset } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { MdInvertColors } from "react-icons/md";
import { MdDownloading } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import { MdClearAll } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import "./SettingsStyles.css";
const SettingsList = () => {
  const { setActiveSettings } = useContext(UIContext);
  const settingsOptions = [
    {
      id: 1,
      name: "View Your Profile",
      Icon: MdManageAccounts,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 2,
      name: "Change Name",
      Icon: MdModeEditOutline,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 3,
      name: "Change Profile Picture",
      Icon: VscAccount,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 4,
      name: "Change E-mail",
      Icon: TbMailForward,
      enabled: false,
      color: "--blwd-color",
    },
    {
      id: 5,
      name: "Reset Password",
      Icon: MdLockReset,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 6,
      name: "change Phone Number",
      Icon: LuPhone,
      enabled: false,
      color: "--blwd-color",
    },
    {
      id: 7,
      name: "Change Theme",
      Icon: MdInvertColors,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 8,
      name: "Download Chat",
      Icon: MdDownloading,
      enabled: true,
      color: "--blwd-color",
    },
    {
      id: 9,
      name: "Generate Automated Link",
      Icon: MdAddLink,
      enabled: false,
      color: "--blwd-color",
    },
    {
      id: 10,
      name: "Clear All Chats",
      Icon: MdClearAll,
      enabled: true,
      color: "--danger-color",
    },
    {
      id: 11,
      name: "Logout",
      Icon: MdLogout,
      enabled: true,
      color: "--danger-color",
    },
  ];

  return (
    <div className="left-section-list">
      {settingsOptions.map((setting) => (
        <div
          key={setting.id}
          className="list-element"
          onClick={() => setActiveSettings(setting)}
          style={{ color: `var(${setting.color})` }}
        >
          {/* <Abc className="status-pic" /> */}
          <div className="settings-list-info">
            <setting.Icon className="settings-list-info-icon" />
            <span className="settings-list-info-name">{setting.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsList;
