import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/cafeguardLogo.jpg';

// Hamburger and Close Icon SVGs

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



const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  // Function to handle smooth scrolling

  const handleScroll = (e, targetId) => {

    e.preventDefault();

    const target = document.getElementById(targetId);

    if (target) {

      target.scrollIntoView({ behavior: 'smooth' });

    }

    // Close mobile menu after clicking a link

    if (isMenuOpen) {

      setIsMenuOpen(false);

    }

  };



  const navLinks = [

    { href: "#features", text: "Features" },

    { href: "#how-it-works", text: "How It Works" },

    { href: "#benefits", text: "Benefits" },

  ];



  return (

    <nav className="bg-[#F3EBD4] backdrop-blur-md shadow-sm w-full sticky top-0 z-50">

      <div className="container mx-auto px-6 py-3">

        <div className="flex justify-between items-center">

         

          <Link to="/" className="flex -mt-[10px] items-center space-x-2">

            <img src={logo} alt="CafeGuard Logo" className="h-22" />

          </Link>



          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-8">

            {navLinks.map((link) => (

              <a

                key={link.text}

                href={link.href}

                onClick={(e) => handleScroll(e, link.href.substring(1))}

                className="text-gray-700 font-medium hover:text-cafeguard-brown transition-colors duration-300"

              >

                {link.text}

              </a>

            ))}

          </div>



          {/* CTA & Mobile Menu Button */}

          <div className="flex items-center">

             <Link

              to="/login"

              className="hidden sm:block px-6 py-2 font-semibold text-cafeguard-dark-green border-2 border-cafeguard-dark-green rounded-full hover:bg-cafeguard-dark-green hover:text-white transition-all duration-300"

            >

              Admin Login

            </Link>



            {/* Mobile Menu Button */}

            <div className="md:hidden ml-4">

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-cafeguard-dark-green focus:outline-none">

                {isMenuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}

              </button>

            </div>

          </div>

        </div>



        {/* Mobile Menu */}

        {isMenuOpen && (

          <div className="md:hidden mt-4 pb-4 flex flex-col items-center space-y-4">

             {navLinks.map((link) => (

              <a

                key={link.text}

                href={link.href}

                onClick={(e) => handleScroll(e, link.href.substring(1))}

                className="text-gray-700 font-medium hover:text-cafeguard-brown transition-colors duration-300"

              >

                {link.text}

              </a>

            ))}

            <Link

              to="/login"

              className="w-full text-center mt-2 px-6 py-2 font-semibold text-white bg-cafeguard-brown rounded-full hover:bg-cafeguard-dark-green transition-all duration-300"

            >

              Admin Login

            </Link>

          </div>

        )}

      </div>

    </nav>

  );

};



export default Navbar;