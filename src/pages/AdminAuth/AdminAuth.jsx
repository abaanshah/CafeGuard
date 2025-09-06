import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/cafeguardLogo.png';

// --- Configuration ---
const BACKEND_URL = 'http://localhost:4443';

// --- UI Components ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const AdminAuth = () => {
  const [authMode, setAuthMode] = useState('login');
  const [step, setStep] = useState('form');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [testOtp, setTestOtp] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const otpInputRefs = useRef([]);

  useEffect(() => {
    if (step === 'otp' && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setError('');
    setUsername('');
    setPassword('');
    setMobileNumber('');
    setTestOtp('');
  };

  // --- MODIFIED: Bypasses OTP and logs in directly for development ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation for the form fields
    if (!username || !password || !mobileNumber) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
    }
    
    const sanitizedNumber = mobileNumber.replace(/^\+91/, "").replace(/\s/g, "");
    if (!/^[0-9]{10}$/.test(sanitizedNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    console.log("Bypassing OTP verification for development.");
    console.log("Signing up and logging in with:", { username, password });

    // Simulate API call and successful login
    setTimeout(() => {
      // In a real app, the backend would create the user and return a token.
      // Here, we just set a mock token to simulate being logged in.
      localStorage.setItem('adminToken', 'mock-admin-token-for-dev');
      
      // Redirect to the dashboard
      navigate('/admin/dashboard');

      setLoading(false);
    }, 1000);
  };

  // --- Verifies OTP and CREATES the admin account (kept for future use) ---
  const handleOtpVerification = async (enteredOtp) => {
    setLoading(true);
    setError('');
    
    try {
      // This needs to be a new admin-specific endpoint on your backend
      const response = await fetch(`${BACKEND_URL}/admin/verify-and-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, // Sends the username and password from the first step
          password,
          client_number: mobileNumber,
          otp: enteredOtp,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
         throw new Error(data.message || "Verification failed.");
      }
      
      console.log(data.message); // "Admin account created successfully."
      setAuthMode('login');
      setStep('form');

    } catch (err) {
      setError(err.message);
      setOtp(new Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/admin/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed.");

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        throw new Error("Login successful, but no token was received.");
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join('');
    if (value && index < 5) otpInputRefs.current[index + 1].focus();
    if (combinedOtp.length === 6) handleOtpVerification(combinedOtp);
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const renderContent = () => {
    if (step === 'otp') {
      return (
        <div className="flex flex-col items-center w-full text-center">
            <h2 className="text-2xl font-bold text-[#1F4D34] mb-4">Verify Admin Number</h2>
            <p className="text-gray-600 mb-6">Enter the OTP sent to <span className="font-semibold">{mobileNumber}</span></p>
            <div className="flex space-x-2 md:space-x-3">
              {otp.map((digit, index) => (
                <input key={index} ref={(el) => (otpInputRefs.current[index] = el)} type="text" value={digit} maxLength="1" onChange={(e) => handleOtpChange(index, e)} onKeyDown={(e) => handleOtpKeyDown(index, e)} disabled={loading} className="w-12 h-14 text-center border border-[#1F4D34] rounded-lg text-2xl font-bold text-[#1F4D34] focus:outline-none focus:ring-2 focus:ring-[#A45A2A] disabled:bg-gray-200"/>
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
    }
    // ... (Login and Signup form JSX remains the same)
    if (authMode === 'login') {
      return (
        <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#1F4D34]">Admin Login</h2>
            <div>
              <label htmlFor="username-login" className="block text-sm font-medium text-[#1F4D34]">Username</label>
              <input id="username-login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 bg-white rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"/>
            </div>
            <div>
              <label htmlFor="password-login" className="block text-sm font-medium text-[#1F4D34]">Password</label>
              <input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 bg-white rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"/>
            </div>
            <button type="submit" disabled={loading} className="w-full h-12 flex items-center justify-center text-lg font-semibold text-white bg-[#1F4D34] rounded-full hover:bg-[#9A5832] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400">
              {loading ? <Spinner /> : 'Login'}
            </button>
        </form>
      );
    }

    if (authMode === 'signup') {
      return (
        <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-[#1F4D34]">Create Admin Account</h2>
            <div>
              <label htmlFor="username-signup" className="block text-sm font-medium text-[#1F4D34]">Username</label>
              <input id="username-signup" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 bg-white rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"/>
            </div>
             <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-[#1F4D34]">Mobile Number</label>
              <input id="mobile" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required className="mt-1 bg-white rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"/>
            </div>
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-[#1F4D34]">Password</label>
              <input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 bg-white rounded-lg w-full h-12 px-4 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34]"/>
            </div>
            <button type="submit" disabled={loading} className="w-full h-12 flex items-center justify-center text-lg font-semibold text-white bg-[#1F4D34] rounded-full hover:bg-[#9A5832] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400">
              {loading ? <Spinner /> : 'Sign Up & Login'}
            </button>
        </form>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e9] flex flex-col mt-[-25px] items-center p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <img src={logo} alt="CafeGuard Logo" className="w-32 h-auto mx-auto" />
          <h1 className="text-3xl font-bold mt-2">
            <span className="text-[#A45A2A]">Cafe</span><span className="text-[#1F4D34]">Guard</span>
          </h1>
          <p className="text-gray-600 font-semibold mt-1">Admin Portal</p>
        </header>

        <main className="bg-[#FFF4E6] p-8 rounded-2xl shadow-xl border border-[#1F4D34]/20 min-h-[380px] flex items-center">
          <div className="w-full">
            {renderContent()}
            {error && <p className="text-red-600 text-sm text-center font-semibold mt-4">{error}</p>}
          </div>
        </main>
        
        {step === 'form' && (
          <footer className="mt-6 text-center">
            <p className="text-gray-600">
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleAuthMode} className="font-semibold text-[#A45A2A] hover:underline ml-1">
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;

