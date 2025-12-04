import React from "react";
import EmojiBackground from "../../Doodle/EmojiBackground";
import { UIContext } from "../../../context/UIContext";
import { useContext } from "react";

export default function ArchivePage() {
  const { isMobile } = useContext(UIContext);
  return (
    <div className="pages-actual-content under-development">
      <EmojiBackground
        bgUicolor="--wlbd-color"
        total_emojis={isMobile ? 80 : 140}
      />
      <h3>{"Archive-Page: ⚠️ Currently Under Development Phase"}</h3>
    </div>
  );
}
