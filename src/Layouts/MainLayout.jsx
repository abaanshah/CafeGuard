import React from 'react';
import Footer from "../components/Footer/Footer"; // Assuming Footer is in a sub-directory
import Navbar from "../components/Navbar/Navbar"; // Assuming Navbar is in a sub-directory

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <Navbar />
      {/* This is the fix: 
        1. Corrected the className syntax.
        2. Changed pt-[50px] to pt-20, which matches the navbar's height (h-20).
      */}
      <main className="flex-grow pt-25">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
