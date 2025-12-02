import { MdInvertColors } from "react-icons/md";
import { useState } from "react";
const MainListNavbar = () => {
  const [inverted, setInverted] = useState(false);

  const handleInversion = () => {
    setInverted(!inverted);
  };
  return (
    <div className="chatlist-navbar">
      <div className="logo-area">
        <h3 className="chatlist-navbar-logo">Konvo</h3>
        {/* <span className="chatlist-navbar-logo">Konvo</span> */}
      </div>
      <div className="navbar-rightmost-area">
        <MdInvertColors
          className={!inverted ? "theme-btn" : "theme-btn inverted"}
          onClick={handleInversion}
        />
        <button className="menu-btn">⋮</button>
      </div>
    </div>
  );
};

export default MainListNavbar;
