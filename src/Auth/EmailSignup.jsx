import React, { useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { set, ref } from "firebase/database";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";

const EmailSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [is_visible_password, setvisible_password] = useState(false);
  const [is_visible_confirm_password, setvisible_confirm_password] =
    useState(false);
  const validatePassword = () => {
    return (
      password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password)
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validatePassword()) {
      setErrorMessage(
        "Password must contain 6+ characters, 1 uppercase & 1 number"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      console.log(uid);

      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        setErrorMessage(error.code.replace("auth/", "").split("-").join(" "));
      }
      await set(ref(db, `Users/${uid}`), {
        uid,
        name: `${email}`,
        imageUrl: "k_konvo_null",
        contactType: "email",
        contact: `${email}`,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      });
      navigate("/verify-email");
      w;
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="setup-form">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <div className="password-group">
        <input
          type={!is_visible_password ? "password" : "text"}
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="eye-icon"
          onClick={() => {
            setvisible_password(!is_visible_password);
          }}
        >
          {!is_visible_password ? (
            <FaRegEye className="actual_eye_icon" />
          ) : (
            <GrFormViewHide className="actual_eye_icon" />
          )}
        </span>
      </div>
      <div className="password-group">
        <input
          type={!is_visible_confirm_password ? "password" : "text"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span
          className="eye-icon"
          onClick={() => {
            setvisible_confirm_password(!is_visible_confirm_password);
          }}
        >
          {!is_visible_confirm_password ? (
            <FaRegEye className="actual_eye_icon" />
          ) : (
            <GrFormViewHide className="actual_eye_icon" />
          )}
        </span>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating…" : "Create Account"}
      </button>
    </form>
  );
};

export default EmailSignup;
