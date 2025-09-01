import React from 'react';

const Step = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#9A5832] text-white font-bold text-xl">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-[#284838]">{title}</h3>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </div>
);

const HowItWork = () => (
  <section id="how-it-works" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#284838]">Simple, Secure, and Seamless</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Get your customers online in three easy steps, controlled entirely by you.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-10">
        <Step 
          number="1" 
          title="Customer Connects & Gets QR" 
          description="A customer connects to your Wi-Fi and their device automatically displays a unique QR code, requesting activation."
        />
        <Step 
          number="2" 
          title="You Scan to Activate" 
          description="Using your Admin Panel on any camera-enabled device, you simply scan the customer's QR code at the counter."
        />
        <Step 
          number="3" 
          title="Access is Granted" 
          description="The customer is instantly granted time-limited internet access. The system handles the session and disconnection automatically."
        />
      </div>
    </div>
  </section>
);

export default HowItWork;
