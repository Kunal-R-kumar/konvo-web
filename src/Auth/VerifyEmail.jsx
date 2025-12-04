import React, { useEffect, useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { auth, db } from "../Firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { deleteUser, sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const navigate = useNavigate();

  // 1️⃣ Timer countdown
  useEffect(() => {
    if (time <= 0) {
      handleTimeoutDelete();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // 2️⃣ Auto check verification every 3 seconds
  useEffect(() => {
    const checkInterval = setInterval(() => {
      checkVerification();
    }, 3000);

    return () => clearInterval(checkInterval);
  }, []);

  const checkVerification = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await user.reload(); // Refresh latest info

    if (user.emailVerified) {
      toast.success("Email Verified 🎉 Redirecting...");
      navigate("/");
    }
  };

  // 3️⃣ Delete user if not verified in time
  const handleTimeoutDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await remove(ref(db, `Users/${user.uid}`));
      await deleteUser(user);
      toast.error("Email not verified in time. User deleted ❌");
      navigate("/setup");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
    }
  };

  // 🔄 Manual refresh button
  const handleRefresh = async () => {
    setLoading(true);
    await checkVerification();
    setLoading(false);
  };

  // 📩 Resend Email
  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await sendEmailVerification(user);
      toast.success("Verification Email Resent 📩");

      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 10000); // enable after 10s
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend verification email");
    }
  };

  return (
    <div className="central-card">
      <h2 className="verify-notice">Verify Your Email To Continue 📩</h2>

      <p>Email sent at: {auth.currentUser?.email}</p>

      <p className="verification_deletion_timer">
        {`⏳ Time Remaining: ${time}s`}
      </p>

      <button
        className="refresh_button"
        onClick={handleRefresh}
        disabled={loading || time <= 0}
      >
        {loading ? "Checking..." : "Refresh"}
        <IoRefreshOutline style={{ marginLeft: 6 }} />
      </button>

      <button
        style={{ marginTop: 10 }}
        className="refresh_button"
        disabled={resendDisabled || time <= 0}
        onClick={handleResendVerification}
      >
        {resendDisabled ? "Wait..." : "Resend Email"}
      </button>
    </div>
  );
};

export default VerifyEmail;
