// 📌 EmailLogin.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_visible_password, setvisible_password] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true); // 🔥 Start loader state

    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);

      toast.success("Login Successful 🎉");

      // ⏳ delay redirect so toast stays visible
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.error("Login Error:", error.code);

      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found! Please sign up first.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password!");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format!");
          break;
        default:
          toast.error(`${error.code}! Try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="setup-form">
      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <div className="password-group">
        <input
          type={!is_visible_password ? "password" : "text"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="eye-icon"
          onClick={() => setvisible_password(!is_visible_password)}
        >
          {!is_visible_password ? (
            <FaRegEye className="actual_eye_icon" />
          ) : (
            <GrFormViewHide className="actual_eye_icon" />
          )}
        </span>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="options">
        <span
          className="forgot-password link"
          onClick={() => navigate("/forget-password")}
        >
          Forgot Password?
        </span>
      </div>
    </form>
  );
};

export default EmailLogin;
