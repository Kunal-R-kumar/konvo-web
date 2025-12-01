import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Setup from "./Auth/Setup";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import EmojiBackground from "./components/Doodle/EmojiBackground";
import ForgetPassword from "./Auth/ForgetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Background only when user not logged in */}
      {!user && <EmojiBackground />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <ChatWindow /> : <Navigate to="/setup" />}
          />
          <Route
            path="/setup"
            element={!user ? <Setup /> : <Navigate to="/" />}
          />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeButton={false}
        newestOnTop={false}
        theme="dark"
        pauseOnHover
        closeOnClicks
      />
    </>
  );
};

export default App;
