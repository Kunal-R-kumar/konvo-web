import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import { MdInvertColors } from "react-icons/md";
import { useState } from "react";
const MainListNavbar = () => {
  const [inverted, setInverted] = useState(false);

  const handleInversion = () => {
    setInverted(!inverted);
    console.log(auth.currentUser.providerData[0]);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error during logout!");
      console.error(error);
    }
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
        <button className="menu-btn" onClick={handleLogout}>
          <MdLogout />
        </button>
      </div>
    </div>
  );
};

export default MainListNavbar;
