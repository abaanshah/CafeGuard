import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/cafeguardLogo.png'; // Make sure this path is correct for your project structure

// --- Icon Components ---
const MenuIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // --- Scroll Detection Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show/hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) { // Scrolling down
        setIsNavbarVisible(false);
      } else { // Scrolling up
        setIsNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Show/hide "back to top" button
      if (currentScrollY > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- Smooth Scroll and Menu Close Logic ---
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    // Only scroll on the homepage
    if (location.pathname === '/') {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: "#features", text: "Features" },
    { href: "#how-it-works", text: "How It Works" },
    { href: "#benefits", text: "Benefits" },
  ];

  return (
    <>
      <nav className={`w-full h-[100px] fixed top-0 z-50 transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'} bg-white/50 backdrop-blur-lg shadow-md`}>
        <div className="container mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img src={logo} alt="CafeGuard Logo" className="h-24 w-auto" />
            </Link>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.text} href={link.href} onClick={(e) => handleScrollTo(e, link.href.substring(1))} className="text-gray-700 font-semibold hover:text-[#9A5832] transition-colors">
                  {link.text}
                </a>
              ))}
            </div>

            {/* --- CTA Buttons & Mobile Menu --- */}
            <div className="flex items-center space-x-4">
              {/* --- UPDATED: Button Group --- */}
              <div className="hidden sm:flex items-center space-x-4">
                <Link to="/adminlogin" className="px-5 py-2 font-semibold text-[#1F4D34] border-2 border-[#1F4D34] rounded-full hover:bg-[#1F4D34] hover:text-white transition-all duration-300">
                  Admin Login
                </Link>
                <Link to="/login" className="px-5 py-2 font-semibold text-white bg-[#9A5832] rounded-full hover:bg-[#284838] transition-all duration-300 transform hover:scale-105">
                  User Login
                </Link>
              </div>
              
              {/* --- Mobile Menu Button --- */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1F4D34] focus:outline-none">
                  {isMenuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu (UPDATED) --- */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[100px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg pb-6 pt-4 flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a key={link.text} href={link.href} onClick={(e) => handleScrollTo(e, link.href.substring(1))} className="text-gray-700 font-semibold hover:text-[#9A5832] transition-colors py-2">
                {link.text}
              </a>
            ))}
            <div className="border-t w-4/5 my-2"></div>
            {/* --- Mobile Buttons --- */}
            <Link to="/login" className="w-4/5 text-center px-6 py-2.5 font-semibold text-white bg-[#9A5832] rounded-full hover:bg-[#1F4D34] transition-all duration-300">
              User Login
            </Link>
            <Link to="/adminlogin" className="w-4/5 text-center px-6 py-2.5 font-semibold text-[#1F4D34] border-2 border-[#1F4D34] rounded-full hover:bg-[#1F4D34] hover:text-white transition-all duration-300">
              Admin Login
            </Link>
          </div>
        )}
      </nav>
      
      {/* --- Back to Top Button --- */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-[#9A5832] text-white rounded-full shadow-lg transition-opacity duration-300 ease-in-out hover:bg-[#1F4D34] hover:scale-110 ${isBackToTopVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Go to top"
      >
        <ArrowUpIcon />
      </button>
    </>
  );
};

export default Navbar;

