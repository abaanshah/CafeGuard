import React, { useState, useRef, useEffect } from "react";

// --- Configuration ---
const BACKEND_URL = "http://localhost:4443";

function Login() {
  const [step, setStep] = useState("phone"); // 'phone', 'otp', 'qr'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testOtp, setTestOtp] = useState(""); // For testing
  const otpInputRefs = useRef([]);

  // --- State for QR step ---
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (step === "otp" && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  // --- Phone submission ---
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

      console.log("OTP Sent:", responseText);

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

  // --- OTP verification ---
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

      if (data.secret_token) {
        localStorage.setItem("secret_Token", data.secret_token);
        console.log("OTP Verified! Token saved:", data.secret_token);
        setStep("qr");
      } else {
        throw new Error("Verification successful, but no token received.");
      }
    } catch (err) {
      setError(err.message);
      setOtp(new Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };

  // --- OTP input helpers ---
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

  // --- Copy token ---
  const handleCopy = () => {
    const token = localStorage.getItem("secret_Token");
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- Render ---
  const renderStepContent = () => {
    switch (step) {
      case "phone":
        return (
          <form
            onSubmit={handlePhoneSubmit}
            className="w-full flex flex-col space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#1F4D34] mb-2">
                Get Started
              </h2>
              <p className="text-gray-600">
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
              An access code was sent to <br />+91 {phoneNumber}
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
        const token = localStorage.getItem("secret_Token");
        const qrCodePageUrl = `${BACKEND_URL}/show-qrcode`;

        return (
          <div className="flex flex-col items-center w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Access Granted!
            </h2>
            <p className="text-gray-600 mb-6">
              Your secure QR code is loading below.
            </p>

            <iframe
              src={qrCodePageUrl}
              title="Secure Wi-Fi QR Code"
              className="w-full h-80 md:h-96 border-2 border-[#1F4D34] rounded-lg shadow-lg mb-4"
            />

            {token ? (
              <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md">
                <span className="font-mono text-lg">{token}</span>
                <button
                onClick={handleCopy}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              </div>
            ) : (
              <p className="text-red-500">No token found in storage.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <img
          src="/CafeGuard_logo.png"
          alt="CafeGuard logo"
          className="w-32 h-auto mx-auto"
        />
        <h1 className="text-3xl font-bold mt-2">
          <span className="text-[#A45A2A]">Cafe</span>
          <span className="text-[#1F4D34]">Guard</span>
        </h1>
        <p className="text-md font-semibold">
          <span className="text-[#A45A2A]">Guarding Connections,</span>
          <span className="text-[#1F4D34]"> Empowering Cafes.</span>
        </p>
      </header>
      <div className="text-center mb-8 text-lg text-[#1F4D34] font-medium max-w-lg mx-auto">
        <p>
          Securely connect to cafe Wi-Fi with a simple, one-time password,
          enhancing both your security and your coffee shop experience.
        </p>
      </div>

      <main className="bg-[#FFF4E6] w-full max-w-md px-8 py-10 rounded-2xl shadow-xl border border-[#1F4D34]/20">
        {renderStepContent()}
        {error && (
          <p className="text-red-600 text-sm text-center mt-4 font-semibold">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

export default Login;
