// 📌 VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { auth, db } from "../Firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { deleteUser } from "firebase/auth";

const VerifyEmail = () => {
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⏱ Countdown timer
  useEffect(() => {
    if (time <= 0) {
      handleTimeoutDelete(); // When time ends, delete user & data automatically
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  // 🔥 Delete user when timer finishes
  const handleTimeoutDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Delete user data in database
      await remove(ref(db, `Users/${user.uid}`));

      // Delete auth user
      await deleteUser(user);

      toast.error("Email not verified in time. User removed ❌");

      navigate("/"); // back to login screen
    } catch (error) {
      toast.error("Error while deleting user.");
      console.error(error);
    }
  };

  // 🔄 Refresh check
  const handleRefresh = async () => {
    setLoading(true);

    await auth.currentUser.reload();
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      toast.success("Email Verified Successfully 🎉");
      navigate("/chat");
    } else {
      toast.info("Still not verified. Check your inbox 📩");
    }

    setLoading(false);
  };

  return (
    <div className="central-card">
      <h2 className="verify-notice">Verify Your Email To Continue 📩</h2>

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
    </div>
  );
};

export default VerifyEmail;
