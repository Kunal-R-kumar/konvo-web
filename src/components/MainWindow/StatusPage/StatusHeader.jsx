import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../../context/UIContext";
import { IoIosArrowBack } from "react-icons/io";
import "./ProgressBarStyles.css";

const StatusHeader = () => {
  const { activeStatus, setActiveStatus } = useContext(UIContext);
  const [progress, setProgress] = useState(0);
  const handleStopStatus = () => {
    setActiveStatus(null);
  };
  useEffect(() => {
    setProgress(0); // reset when new status is opened

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            handleStopStatus();
          }, 0); // exit status automatically when done
          return 100;
        }
        return prev + 1; // Increase progress 1% every 50ms → 5 seconds total
      });
    }, 300);

    return () => clearInterval(timer);
  }, [activeStatus]);

  return (
    <div className="status-header-progress">
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="page-header">
        <div className="profile">
          <IoIosArrowBack
            className="back-btn"
            onClick={() => setActiveStatus(null)}
          />
          <img src={activeStatus?.img} alt="" className="profile-pic" />

          <div className="profile-header-info-section">
            <h4>{activeStatus?.name}</h4>
            <p>{activeStatus?.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
