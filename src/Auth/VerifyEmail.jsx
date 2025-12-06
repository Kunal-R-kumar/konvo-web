// import React, { useEffect, useState } from "react";
// import { IoRefreshOutline } from "react-icons/io5";
// import { auth, db } from "../Firebase/firebase";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { ref, remove } from "firebase/database";
// import { deleteUser, sendEmailVerification } from "firebase/auth";

// const VerifyEmail = () => {
//   const [time, setTime] = useState(60);
//   const [loading, setLoading] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const navigate = useNavigate();

//   // ⏳ Countdown Timer
//   useEffect(() => {
//     if (time <= 0) {
//       handleTimeoutDelete();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTime((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [time]);

//   // 🔄 Auto-Check Verification every 3 seconds
//   useEffect(() => {
//     const checkInterval = setInterval(() => {
//       checkVerification();
//     }, 3000);

//     return () => clearInterval(checkInterval);
//   }, []);

//   // 🧐 Check if verified → redirect
//   const checkVerification = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     await user.reload();

//     if (user.emailVerified) {
//       toast.success("Email Verified 🎉 Redirecting...");
//       setTimeout(() => navigate("/"), 1200);
//     }
//   };

//   // ❌ Remove unverified user after timeout
//   const handleTimeoutDelete = async () => {
//     const user = auth.currentUser;
//     if (!user || user.emailVerified) return;

//     try {
//       await remove(ref(db, `Users/${user.uid}`));
//       await deleteUser(user);
//       toast.error("Email not verified in time! Account deleted ❌");
//       navigate("/setup");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove user");
//     }
//   };

//   // 🔘 Manual Refresh Button
//   const handleRefresh = async () => {
//     setLoading(true);
//     await checkVerification();
//     setLoading(false);
//   };

//   // 📩 Resend Verification Email
//   const handleResendVerification = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     try {
//       await sendEmailVerification(user);
//       toast.success("Verification Email Sent Again 📩");

//       setResendDisabled(true);
//       setTimeout(() => setResendDisabled(false), 10000);
//     } catch (err) {
//       toast.error("Failed to resend email!");
//     }
//   };

//   return (
//     <div className="central-card">
//       <h2 className="verify-notice">Verify Your Email To Continue 📩</h2>

//       <p>Email: {auth.currentUser?.email}</p>

//       <p className="verification_deletion_timer">
//         ⏳ Time Remaining: <strong>{time}s</strong>
//       </p>

//       <button
//         className="refresh_button"
//         onClick={handleRefresh}
//         disabled={loading || time <= 0}
//       >
//         {loading ? "Checking..." : "Refresh"}
//         <IoRefreshOutline style={{ marginLeft: 6 }} />
//       </button>

//       <button
//         style={{ marginTop: 10 }}
//         className="refresh_button"
//         disabled={resendDisabled || time <= 0}
//         onClick={handleResendVerification}
//       >
//         {resendDisabled ? "Wait..." : "Resend Email"}
//       </button>
//     </div>
//   );
// };

// export default VerifyEmail;
import React from "react";

export default function VerifyEmail() {
  return <div>VerifyEmail</div>;
}
