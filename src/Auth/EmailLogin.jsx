// 📌 EmailLogin.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          toast.error("Something went wrong! Try again.");
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

      <input
        type="password"
        placeholder="Enter Password Here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

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
