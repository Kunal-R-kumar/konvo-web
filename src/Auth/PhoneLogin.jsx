import React, { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithCustomToken } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { ref, set } from "firebase/database";

const PhoneLogin = () => {
  const ip_and_port = "https://backend-bxhi.onrender.com";

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpInputsRef = useRef([]);
  const navigate = useNavigate();

  otpInputsRef.current = Array(6)
    .fill()
    .map((_, i) => otpInputsRef.current[i] || React.createRef());

  useEffect(() => {
    if (step === 2) {
      const firstEmptyIndex = otp.findIndex((d) => d === "");
      const idx = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      otpInputsRef.current[idx].current.focus();
    }
  }, [step]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Phone number required!");
      return;
    }

    try {
      const res = await fetch(`${ip_and_port}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: `+${phone}` }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const verifyotp = async (code) => {
    try {
      const res = await fetch(`${ip_and_port}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: `+${phone}`, otp: `${code}` }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");

        const result = await signInWithCustomToken(auth, data.token);
        const user = result.user;

        // 🔥 Store user in Realtime DB (safe set)
        await set(ref(db, "Users/" + user.uid), {
          uid: user.uid,
          contactType: "phone",
          contact: `+${phone}`,
          createdAt: Date.now(),
          name: `+${phone}`,
        });

        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Error verifying OTP!");
      console.error(err);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    verifyotp(`${code}`);
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (val.length > 1) {
      const chars = val.split("").slice(0, 6);
      for (let i = 0; i < chars.length; i++) {
        newOtp[index + i] = chars[i];
        otpInputsRef.current[index + i].current.value = chars[i];
      }
      setOtp(newOtp);
      const nextPos = Math.min(index + val.length, 5);
      otpInputsRef.current[nextPos].current.focus();
      return;
    }

    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      otpInputsRef.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        otpInputsRef.current[index].current.value = "";
        return;
      }

      if (index > 0) {
        otpInputsRef.current[index - 1].current.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpInputsRef.current[index - 1].current.value = "";
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputsRef.current[index - 1].current.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputsRef.current[index + 1].current.focus();
    } else if (e.key === "Enter" && index === 5) {
      handleVerifyOtp(e);
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasteData.replace(/[^0-9]/g, "").slice(0, 6 - index);
    if (!digits) return;

    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[index + i] = digits[i];
      otpInputsRef.current[index + i].current.value = digits[i];
    }
    setOtp(newOtp);
    const nextPos = Math.min(index + digits.length, 5);
    otpInputsRef.current[nextPos].current.focus();
  };

  return (
    <div className="phone-login">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="setup-form">
          <PhoneInput
            country={"in"}
            value={phone}
            className="phoneInput"
            onChange={setPhone}
            enableSearch={true}
            inputStyle={{
              width: "100%",
              borderRadius: "5px",
            }}
          />

          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="otp-form">
          <p>Enter OTP sent to +{phone}</p>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={otpInputsRef.current[index]}
                type="text"
                inputMode="numeric"
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                style={{
                  width: 44,
                  height: 44,
                  textAlign: "center",
                  fontSize: 18,
                }}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <button type="submit">Verify OTP</button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp(["", "", "", "", "", ""]);
                otpInputsRef.current.forEach((r) =>
                  r.current ? (r.current.value = "") : null
                );
              }}
            >
              Edit Phone
            </button>
            {
              "Due to limited sms fascility the sms services ae suspended for a short period of time "
            }
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;
