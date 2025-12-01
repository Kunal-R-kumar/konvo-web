import React, { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { toast } from "react-toastify";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../Firebase/firebase";
const PhoneLogin = () => {
  const ip_and_port = "https://backend-bxhi.onrender.com";
  const [step, setStep] = useState(1); // 1: enter phone, 2: enter OTP
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const otpInputsRef = useRef([]);
  const navigate = useNavigate();
  // ensure refs array length
  otpInputsRef.current = Array(6)
    .fill()
    .map((_, i) => otpInputsRef.current[i] || React.createRef());

  useEffect(() => {
    if (step === 2) {
      // focus first empty input when OTP step opens
      const firstEmptyIndex = otp.findIndex((d) => d === "");
      const idx = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      otpInputsRef.current[idx].current.focus();
    }
  }, [step]); // run when step changes

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

        const customToken = data.token;
        await signInWithCustomToken(auth, customToken);

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
    console.log("OTP entered:", code);
    verifyotp(`${code}`);
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val && otp[index] === "") {
      // nothing changed
      return;
    }

    // If user pasted full OTP (more than 1 char), fill all inputs
    if (val.length > 1) {
      const chars = val.split("").slice(0, 6);
      const newOtp = [...otp];
      for (let i = 0; i < chars.length; i++) {
        newOtp[index + i] = chars[i];
        const ref = otpInputsRef.current[index + i];
        if (ref && ref.current) ref.current.value = chars[i];
      }
      setOtp(newOtp);
      const nextPos = Math.min(index + val.length, 5);
      otpInputsRef.current[nextPos].current.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      // move focus to next
      otpInputsRef.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault(); // we manage deletion manually
      const newOtp = [...otp];

      if (otp[index]) {
        // If current has a value, clear it and stay
        newOtp[index] = "";
        setOtp(newOtp);
        // clear the input element value as well
        otpInputsRef.current[index].current.value = "";
        return;
      }

      // current empty → move to previous and clear it
      if (index > 0) {
        otpInputsRef.current[index - 1].current.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpInputsRef.current[index - 1].current.value = "";
      }
    } else if (key === "ArrowLeft") {
      if (index > 0) otpInputsRef.current[index - 1].current.focus();
    } else if (key === "ArrowRight") {
      if (index < 5) otpInputsRef.current[index + 1].current.focus();
    } else if (key === "Enter") {
      // optional: submit when last box and Enter pressed
      if (index === 5) handleVerifyOtp(e);
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
      const ref = otpInputsRef.current[index + i];
      if (ref && ref.current) ref.current.value = digits[i];
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
          <p>Enter OTP sent to {phone}</p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={otpInputsRef.current[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                defaultValue={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                id={`otp-${index}`}
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
                otpInputsRef.current.forEach((r) => {
                  if (r && r.current) r.current.value = "";
                });
              }}
            >
              Edit Phone
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;
