import React from "react";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
function handlesignout() {
  signOut(auth);
}
export default function ChatWindow() {
  return (
    <div>
      {`THis is CHat Window ${auth.currentUser.uid}`}
      <button onClick={handlesignout}>Signout</button>
    </div>
  );
}
