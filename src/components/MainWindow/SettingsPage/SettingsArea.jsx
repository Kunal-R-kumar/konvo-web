import React, { useContext } from "react";
import SettingsHeader from "./SettingsHeader";
import EmojiBackground from "../../Doodle/EmojiBackground";
import { UIContext } from "../../../context/UIContext";

const SettingsArea = () => {
  const { activeStatus, isMobile } = useContext(UIContext);

  if (!activeStatus) {
    return (
      <>
        {!isMobile && (
          <div className="empty-msg">
            <EmojiBackground
              bgUicolor="--wlbd-color"
              total_emojis={isMobile ? 80 : 140}
            />
            <h1>Select a Setting First</h1>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="right-section">
      {/* <SettingsHeader /> */}
      <EmojiBackground
        bgUicolor="--wlbd-color"
        total_emojis={isMobile ? 80 : 140}
      />
    </div>
  );
};

export default SettingsArea;
