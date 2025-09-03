import React, { useState, useRef } from "react";

function EnterOTP({ length = 4, correctOTP = "1234" }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  // Handle change in OTP inputs
  const handleChange = (index, e) => {
    const value = e.target.value;

    // Only allow digits
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // keep only last digit
    setOtp(newOtp);

    // Move to next box automatically
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If last digit filled, auto verify
    if (index === length - 1 && value) {
      handleVerify(newOtp.join(""));
    }
  };

  // Handle backspace key → move focus backward
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleVerify = (enteredOtp) => {
    console.log("Entered OTP:", enteredOtp);

    if (enteredOtp === correctOTP) {
      setMessage("✅ OTP Verified Successfully!");
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex space-x-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center border border-[#1F4D34] rounded-lg text-xl font-bold text-[#1F4D34] focus:outline-none focus:ring-2 focus:ring-[#A45A2A]"
          />
        ))}
      </div>

      {message && (
        <p
          className={`mt-4 font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default EnterOTP;
