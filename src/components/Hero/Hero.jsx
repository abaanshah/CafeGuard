import React from 'react';

const Hero = () => {
  // This function handles the smooth scrolling when the button is clicked.
  const handleScrollToContact = () => {
    // Finds the element with the id 'contact' (which is your CtaSection).
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // Smoothly scrolls the page to that section.
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-[90vh] text-center py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#284838] leading-tight">
          Turn Your Free Wi-Fi
          <br />
          <span className="text-[#9A5832]">Into Your Best Asset.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          CafeGuard eliminates Wi-Fi squatters and transforms your internet access into a powerful tool for customer engagement and business growth.
        </p>
        <div className="mt-10">
          {/* --- UPDATED THIS BLOCK --- */}
          {/* Now using a <button> with an onClick handler for clean, reliable behavior */}
          <button 
            onClick={handleScrollToContact}
            className="px-10 py-4 text-lg font-semibold text-white bg-[#9A5832] rounded-full hover:bg-[#284838] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

