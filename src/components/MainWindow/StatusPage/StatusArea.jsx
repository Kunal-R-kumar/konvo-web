import React, { useContext } from "react";
import StatusHeader from "./StatusHeader";
import EmojiBackground from "../../Doodle/EmojiBackground";
import { UIContext } from "../../../context/UIContext";

const StatusArea = () => {
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
            <h1>Select a User to see their Status</h1>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="right-section">
      <StatusHeader />
      <EmojiBackground
        bgUicolor="--wlbd-color"
        total_emojis={isMobile ? 80 : 140}
      />
      {activeStatus.name == "Kunal" && (
        <div className="developer-msg">
          <h1>Hi, I am Kunal Developer & Owner of Konvo </h1>
          <h3>
            The thing you are viewing is just a preview where the status Will be
            shown for now u can just see how Status will be shown.
          </h3>
          <h3>
            The feature to upload status is under development and will be rolled
            out soon
          </h3>
        </div>
      )}
      {activeStatus.name != "Kunal" && (
        <div className="developer-img">
          <img src={activeStatus.s_pic} alt="" />
        </div>
      )}
    </div>
  );
};

export default StatusArea;
