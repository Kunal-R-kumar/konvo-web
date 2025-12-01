import React, { useState } from "react";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import EmailSignup from "./EmailSignup";
import "./Setup.css";

const Setup = () => {
  const [usePhone, setUsePhone] = useState(false);
  const [useSignup, setUseSignup] = useState(false);

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h2 className="form-heading">
          {useSignup ? "Konvo Signup" : "Konvo Login"}
        </h2>

        {/* Render Correct Form */}
        {useSignup ? (
          usePhone ? (
            <PhoneLogin />
          ) : (
            <EmailSignup />
          )
        ) : usePhone ? (
          <PhoneLogin />
        ) : (
          <EmailLogin />
        )}

        {/* Toggle Login / Signup */}
        <p className="toggle-text">
          {usePhone ? (
            <span onClick={() => setUsePhone(false)} className="link">
              Use Email Instead
            </span>
          ) : (
            <span onClick={() => setUsePhone(true)} className="link">
              Use Phone Instead
            </span>
          )}
        </p>

        <div>
          {useSignup ? (
            <>
              <span>Already have an account? </span>
              <span className="link" onClick={() => setUseSignup(false)}>
                Login
              </span>
            </>
          ) : (
            <>
              <span>Don't Have Account? </span>
              <span className="link" onClick={() => setUseSignup(true)}>
                Signup
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
