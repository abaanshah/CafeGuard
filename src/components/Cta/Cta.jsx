import React from 'react';

const CtaSection = () => {
  // This function opens the user's default email client when the button is clicked.
  const handleEmailLink = () => {
    window.location.href = "mailto:zishanza436@gmail.com";
  };

  return (
    // This section needs the id="contact" for the "Request a Demo" button to scroll to it.
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#284838]">Ready to Take Control of Your Wi-Fi?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Let us show you how CafeGuard can transform your business. Schedule a free, no-obligation demo with our team today.
        </p>
        <div className="mt-8">
          {/* Using a button with an onClick handler for consistent styling and behavior */}
          <button
            onClick={handleEmailLink}
            className="px-10 py-4 text-lg font-semibold text-white bg-[#284838] rounded-full hover:bg-[#9A5832] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get a Free Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

