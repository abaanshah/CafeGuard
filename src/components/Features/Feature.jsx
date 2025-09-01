import React from 'react';

// You can find great, free SVG icons from sites like heroicons.com
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#284838] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <svg className="w-12 h-12 text-[#9A5832]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>,
      title: 'Secure QR-Based Access',
      description: 'Ensure only paying customers can access your Wi-Fi with a unique, time-limited QR code system.'
    },
    {
      icon: <svg className="w-12 h-12 text-[#9A5832]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
      title: 'Automated Timed Sessions',
      description: 'Fairly allocate bandwidth and prevent misuse by automatically disconnecting users after their session expires.'
    },
    {
      icon: <svg className="w-12 h-12 text-[#9A5832]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
      title: 'Admin Analytics Panel',
      description: 'Gain valuable insights into your Wi-Fi usage with a simple dashboard tracking active users and data consumption.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#F5F2E8]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#284838]">Everything You Need to Control Your Network</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">CafeGuard provides a robust set of features designed to optimize your public Wi-Fi for business success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
