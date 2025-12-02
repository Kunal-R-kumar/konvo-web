import { useContext } from "react";
import { UIContext } from "../../../context/UIContext";
import avatar from "../../../assets/images/avatar.png";
const dummyUsers = [
  { id: 1, name: "Amit", img: avatar },
  { id: 2, name: "Karan", img: avatar },
  { id: 3, name: "Ravi", img: avatar },
  { id: 4, name: "Priya", img: avatar },
  { id: 5, name: "Simran", img: avatar },
  { id: 6, name: "Neha", img: avatar },
  { id: 7, name: "Vikram", img: avatar },
  { id: 8, name: "Rohit", img: avatar },
  { id: 9, name: "Anjali", img: avatar },
  { id: 10, name: "Sahil", img: avatar },
  { id: 11, name: "Aarav", img: avatar },
  { id: 12, name: "Manish", img: avatar },
  { id: 13, name: "Sheetal", img: avatar },
  { id: 14, name: "Ayesha", img: avatar },
  { id: 15, name: "Maya", img: avatar },
  { id: 16, name: "Rajesh", img: avatar },
  { id: 17, name: "Tanvi", img: avatar },
  { id: 18, name: "Sanya", img: avatar },
  { id: 19, name: "Shiv", img: avatar },
  { id: 20, name: "Chandan", img: avatar },
  { id: 21, name: "Deepika", img: avatar },
  { id: 22, name: "Alok", img: avatar },
  { id: 23, name: "Isha", img: avatar },
  { id: 24, name: "Vani", img: avatar },
  { id: 25, name: "Jai", img: avatar },
  { id: 26, name: "Gaurav", img: avatar },
  { id: 27, name: "Kriti", img: avatar },
  { id: 28, name: "Nikhil", img: avatar },
  { id: 29, name: "Pooja", img: avatar },
  { id: 30, name: "Lina", img: avatar },
];

const StatusList = () => {
  const { setActiveStatus } = useContext(UIContext);

  return (
    <div className="status-list">
      {dummyUsers.map((user) => (
        <div
          key={user.id}
          className="status-user"
          onClick={() => setActiveStatus(user)}
        >
          <img src={user.img} alt={user.name} className="status-pic" />
          <div className="status-profile-list-info">
            <span className="status-profile-list-info-name">{user.name}</span>
            <span className="status-profile-list-info-name">
              {"Tap to See Status"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusList;
