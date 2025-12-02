import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext"; // added UIProvider

import Setup from "./Auth/Setup";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import EmojiBackground from "./components/Doodle/EmojiBackground";
import ForgetPassword from "./Auth/ForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <UIProvider>
      {/* Background only when user not logged in */}
      {!user && <EmojiBackground />}
      <BrowserRouter>
        <Routes>
          {/* Main Chat Window - Protected Route */}
          <Route
            path="/"
            element={user ? <ChatWindow /> : <Navigate to="/setup" />}
          />
          {/* Setup Page - Redirect if already logged in */}
          <Route
            path="/setup"
            element={!user ? <Setup /> : <Navigate to="/" />}
          />
          {/* Forget Password */}
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* Optional: Catch-all redirect */}
          <Route path="*" element={<Navigate to={user ? "/" : "/setup"} />} />
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
        closeOnClick={true}
      />
    </UIProvider>
  );
};

export default App;
