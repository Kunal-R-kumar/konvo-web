import { useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";

const StatusHeader = () => {
  const { activeStatus, setActiveStatus, isMobile } = useContext(UIContext);

  return (
    <div className="status-header">
      <div className="profile">
        {isMobile && (
          <IoIosArrowBack
            className="back-btn"
            onClick={() => setActiveStatus(null)}
          />
        )}
        <img src={activeStatus?.img} alt="" className="profile-pic" />
        <div className="profile-header-info-section">
          <h4>{activeStatus?.name}</h4>
          <p>activeStatus?.contact</p>
        </div>
      </div>
      <button className="menu-btn">⋮</button>
    </div>
  );
};

export default StatusHeader;
