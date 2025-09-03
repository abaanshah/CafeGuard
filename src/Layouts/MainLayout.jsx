import  Footer  from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
        <Navbar/>
      <main className={`flex-grow "pt-[50px]" : ""}`}>
        {children}
      </main>
       {<Footer/>}
    </div>
  );
}

export default MainLayout;
