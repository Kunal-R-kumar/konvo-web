import React, { useEffect, useState } from "react";
import "./EmojiBackground.css";
const EmojiBackground = (total = 80, emojiType = 1) => {
  const [emojis, setEmojis] = useState([]);
  const emojiSet = [
    "😄",
    "😂",
    "😅",
    "😎",
    "😋",
    "😘",
    "🥰",
    "😍",
    "🤩",
    "😭",
    "🤯",
    "🥳",
    "💀",
    "🐶",
    "🐇",
    "👀",
    "🫀",
    "⭐",
    "⚽",
    "❤️",
    "🌀",
    "👍",
    "🎧",
    "💡",
    "✨",
  ];

  const emojiSize = 30;
  const TOTAL = 140;

  const generateEmojiPositions = () => {
    const placed = [];
    const items = [];

    for (let i = 0; i < TOTAL; i++) {
      let x,
        y,
        valid = false,
        attempts = 0;

      while (!valid && attempts < 300) {
        x = Math.random() * (window.innerWidth - emojiSize);
        y = Math.random() * (window.innerHeight - emojiSize);

        valid = placed.every((p) => {
          const dx = p.x - x;
          const dy = p.y - y;
          return Math.sqrt(dx * dx + dy * dy) > emojiSize;
        });

        attempts++;
      }

      if (valid) {
        placed.push({ x, y });
        items.push({
          id: i,
          emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
          x,
          y,
          r: Math.random() * 360,
        });
      }
    }

    setEmojis(items);
  };

  useEffect(() => {
    generateEmojiPositions();
    window.addEventListener("resize", generateEmojiPositions);
    return () => window.removeEventListener("resize", generateEmojiPositions);
  }, []);

  return (
    <div className="emoji-bg">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="emoji"
          style={{
            left: e.x,
            top: e.y,
            transform: `rotate(${e.r}deg)`,
            fontSize: emojiSize,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiBackground;
// export default function EmojiBackground() {
//   const emojis = ["1F602", "1F60D", "1F44D", "1F64F", "2764", "1F389"];

//   return (
//     <div className="doodle-bg">
//       {emojis.map((id, i) => (
//         <img
//           key={i}
//           src={`https://cdn.jsdelivr.net/npm/openmoji@14.0.0/black/svg/${id}.svg`}
//           alt=""
//           className="doodle-icon"
//         />
//       ))}
//     </div>
//   );
// }
