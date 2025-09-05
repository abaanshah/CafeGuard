import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- SVG Icon Components ---
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const TimerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const features = [
  {
    icon: <LockIcon />,
    title: "Secure OTP Login",
    description:
      "Protect your network with a simple, secure one-time password system for every customer.",
  },
  {
    icon: <TimerIcon />,
    title: "Timed Sessions",
    description:
      "Automatically manage access duration to ensure fair usage and free up tables for new customers.",
  },
  {
    icon: <ChartIcon />,
    title: "Customer Insights",
    description:
      "Gain valuable insights by understanding peak hours and customer traffic patterns.",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const handleToLogin = () => navigate("/login");

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background with subtle zoom animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
          alt="Modern cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F4D34] via-[#5D4037]/80 to-black/60"></div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mt-[-120px] px-6 py-24">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-shadow-lg"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Turn Your Free Wi-Fi
          <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Into Your Best Asset.
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 text-lg md:text-xl text-amber-50 max-w-3xl mx-auto text-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          CafeGuard eliminates Wi-Fi squatters and transforms your internet
          access into a powerful tool for customer engagement and business
          growth.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
        >
          <button
            onClick={handleToLogin}
            className="px-10 py-4 text-lg font-semibold text-white bg-[#9A5832] rounded-full hover:bg-[#284838] transition-all duration-300 transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Get Secure Access Now
          </button>
        </motion.div>

        {/* Features */}
        <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature, index) => (
  <motion.div
    key={index}
    className="group flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-500 cursor-pointer shadow-lg"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 1 + index * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 12px 24px rgba(0,0,0,0.25)",
      transition: { duration: 0.4, ease: "easeInOut" }
    }}
  >
    <div className="p-4 bg-[#9A5832]/50 rounded-full transition-colors duration-300 group-hover:bg-[#9A5832]">
      {feature.icon}
    </div>
    <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
    <p className="mt-2 text-amber-100/80">{feature.description}</p>
  </motion.div>
))}

        </div>
      </div>
    </section>
  );
};

export default Hero;