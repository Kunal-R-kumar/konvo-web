import { useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import avatar from "../../../assets/images/avatar.png";
import k from "../../../assets/images/k.png";
import s from "../../../assets/images/s.png";
import rk from "../../../assets/images/rk.png";
import rek from "../../../assets/images/rek.png";

const dummyUsers = [
  {
    id: 2,
    name: "Kunu",
    img: "https://res.cloudinary.com/ducr58uwv/image/upload/v1743351686/Profile/jws2nmlcrwbtt55zslex.png",
    s_pic: k,
  },
  { id: 3, name: "Sushant", img: avatar, s_pic: s },
  { id: 4, name: "Rajeev", img: avatar, s_pic: rk },
  { id: 5, name: "Rekha", img: avatar, s_pic: rek },
  {
    id: 1,
    name: "Kunal",
    img: "https://res.cloudinary.com/ducr58uwv/image/upload/v1764808169/WhatsApp_Image_2025-12-04_at_05.58.40_ca7e0478_osrlwk.jpg",
  },
];

const StatusList = () => {
  const { setActiveStatus } = useContext(UIContext);

  return (
    <div className="status-list left-section-list">
      {dummyUsers.map((user) => (
        <div
          key={user.id}
          className="status-user list-element"
          onClick={() => setActiveStatus(user)}
        >
          <img src={user.img} alt={user.name} className="status-pic" />
          <div className="status-profile-list-info">
            <span className="status-profile-list-info-name">{user.name}</span>
            <span className="status-profile-list-info-name">
              {user.name != "Kunal" ? "Tap to See Status" : "Developer's Note"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusList;
