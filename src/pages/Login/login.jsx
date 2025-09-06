import React, { useState, useRef, useEffect } from "react";
import cafeguard from "../../assets/cafeguardLogo.png";

// This single component now handles all three steps:
// 1. Entering a phone number.
// 2. Verifying the OTP and getting a token.
// 3. Displaying the final QR code and one-time code.

const BACKEND_URL = "http://localhost:4443";
function Login() {
  // State to manage which step of the login process we are on
  const [step, setStep] = useState("phone"); // 'phone', 'otp', 'qr'

  // States for user input and API status
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testOtp, setTestOtp] = useState("");

  // --- NEW: State for the one-time code and copy button ---
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const otpInputRefs = useRef([]);

  // Focus the first OTP input box when the OTP step becomes active
  useEffect(() => {
    if (step === "otp" && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  // --- Step 1: Handle Phone Number Submission ---
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTestOtp("");

    const sanitizedNumber = phoneNumber.replace(/^\+91/, "").replace(/\s/g, "");

    if (!/^[0-9]{10}$/.test(sanitizedNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/client/generate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_number: sanitizedNumber }),
      });

      const responseText = await response.text();
      if (!response.ok) throw new Error(responseText || "Failed to send OTP.");

      const otpValue = responseText.split("+")[1]?.trim();
      if (otpValue) setTestOtp(otpValue);

      setPhoneNumber(sanitizedNumber);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Handle OTP Verification (UPDATED) ---
  const handleOtpSubmit = async (enteredOtp) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/client/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_number: phoneNumber,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Verification failed.");

      // --- NEW: Save both the token and the one-time code ---
      if (data.secret_token) {
        localStorage.setItem("secretToken", data.secret_token);
        console.log("OTP Verified! Token and One-Time Code received. ",data.secret_token);
        setStep("qr");
      } else {
        throw new Error(
          "Verification successful, but required codes were not received."
        );
      }
    } catch (err) {
      setError(err.message);
      setOtp(new Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handle copying the one-time code to the clipboard ---
  const handleCopyCode = async (token) => {
    if (token) {
      try {
        await navigator.clipboard.writeText(token); // ✅ wait for clipboard write
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };
  

  // --- Helper functions for the OTP input boxes ---
  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (value && index < 5) otpInputRefs.current[index + 1].focus();
    if (combinedOtp.length === 6) handleOtpSubmit(combinedOtp);
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // --- Render different content based on the current 'step' ---
  const renderStepContent = () => {
    switch (step) {
      case "phone":
        return (
          <form onSubmit={handlePhoneSubmit} className="w-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[#1F4D34]">
                Get Started
              </h2>
              <p className="text-gray-600 mt-2">
                Enter your mobile number to receive a secure access code.
              </p>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 or 10-digit mobile number"
              className="bg-[#FAF9F6] rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"
            />
            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: "1.5rem" }} // This is equivalent to mt-6 and will override the reset style.
              className="px-6 py-3 text-lg font-semibold text-white bg-[#9A5832] rounded-full w-full hover:bg-[#284838] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:scale-100"
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </form>
        );
      case "otp":
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-semibold text-[#1F4D34] mb-4">
              Enter OTP
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              An access code was sent to <br />
              +91 {phoneNumber}
            </p>
            <div className="flex space-x-2 md:space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  disabled={loading}
                  className="w-12 h-14 text-center border border-[#1F4D34] rounded-lg text-2xl font-bold text-[#1F4D34] focus:outline-none focus:ring-2 focus:ring-[#A45A2A] disabled:bg-gray-200"
                />
              ))}
            </div>
            {testOtp && (
              <div className="mt-4 p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
                <p className="text-sm text-yellow-800">For testing purposes:</p>
                <p className="text-lg font-bold text-yellow-900">{testOtp}</p>
              </div>
            )}
            {loading && <p className="mt-4 text-[#1F4D34]">Verifying...</p>}
          </div>
        );

      case "qr":
        const token = localStorage.getItem("secretToken");
        const qrCodePageUrl = `${BACKEND_URL}/show-QrCode`;
        return (
          <div className="flex flex-col items-center w-full text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-green-600">
                Access Granted!
              </h2>
              <p className="text-gray-600 mt-1">
                Scan the QR code with your phone or use the code below for other
                devices.
              </p>
            </div>
            <iframe
              src={qrCodePageUrl}
              title="Secure Wi-Fi QR Code"
              className="w-full h-80 md:h-96 border-2 border-[#1F4D34] rounded-lg shadow-lg"
            />
            <div className="w-full p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-sm text-gray-600 font-semibold">
                For laptops or other devices:
              </p>
              <div className="flex items-center justify-center space-x-3 mt-2">
                <p className="text-2xl font-bold  text-[#1F4D34]">
                  {token}
                </p>
                <button
                  onClick={() => handleCopyCode(token)} 
                  className="px-4 py-1 text-sm font-semibold text-white bg-[#9A5832] rounded-md hover:bg-[#284838] transition-all"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* --- LEFT PANEL (Branding - visible on large screens) --- */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-[#A45A2A] via-[#5D4037] to-[#1F4D34] text-white relative">
        <div className="text-center w-full max-w-md">
          <img
            src={cafeguard}
            alt="CafeGuard logo"
            className="w-60 h-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold">
            <span>Cafe</span>
            <span className="opacity-80">Guard</span>
          </h1>
          <p className="text-lg mt-2 opacity-80">
            Guarding Connections, Empowering Cafes.
          </p>
          <div className="border-t border-white/20 my-8"></div>
          <p className="text-lg leading-relaxed opacity-90">
            Securely connect to cafe Wi-Fi with a simple, one-time password,
            enhancing both your security and your coffee shop experience.
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form - visible on all screens) --- */}
      <div className="flex flex-col items-center justify-center p-4 bg-[#f7f2e9]">
        {/* Header for Mobile View */}
        <header className="text-center mb-8 lg:hidden">
          <img
            src="/CafeGuard_logo.png"
            alt="CafeGuard logo"
            className="w-32 h-auto mx-auto"
          />
          <h1 className="text-3xl font-bold mt-2">
            <span className="text-[#A45A2A]">Cafe</span>
            <span className="text-[#1F4D34]">Guard</span>
          </h1>
        </header>

        {/* Main Content Card */}
        <main className="bg-[#FFF4E6] w-full max-w-md px-8 py-10 rounded-2xl shadow-xl border border-[#1F4D34]/20">
          {renderStepContent()}
          {error && (
            <p className="text-red-600 text-sm text-center mt-4 font-semibold">
              {error}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Login;
