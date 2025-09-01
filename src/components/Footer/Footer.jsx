import React from 'react';

// Placeholder social media icons. You'd typically use an icon library like react-icons.
const SocialIcon = ({ children }) => (
  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">CafeGuard</h2>
          <p className="max-w-md mx-auto mt-2 text-gray-400">
            Smart Wi-Fi Access for Smart Business Growth.
          </p>
          <div className="flex justify-center mt-6 space-x-6">
            {/* Replace with actual icons */}
            <SocialIcon>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..." /></svg>
            </SocialIcon>
            <SocialIcon>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..." /></svg>
            </SocialIcon>
            <SocialIcon>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..." /></svg>
            </SocialIcon>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CafeGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
