import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Setup.css";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const backtologin = () => {
    setTimeout(() => {
      navigate("/setup");
    }, 1200);
  };
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent! Check your email.");
      backtologin();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-box">
        <span className="back-option" onClick={backtologin}>
          <IoIosArrowBack />
          Back
        </span>
        <h2 className="form-heading">Konvo Password Recovery</h2>
        <form onSubmit={handleReset} className="setup-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Send Reset Link</button>
          <p className="forget-password-note note">
            ⚠️Email sent for password recovery maybe received in spam folder if
            not found in Inbox
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
