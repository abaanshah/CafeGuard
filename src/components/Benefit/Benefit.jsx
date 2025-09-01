import React from 'react';

const BenefitItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 text-[#9A5832]">{icon}</div>
    <div>
      <h3 className="font-bold text-lg text-[#284838]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Benefit = () => (
  <section id="benefits" className="py-20 bg-[#F5F2E8]">
    <div className="container mx-auto px-6">
       <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#284838]">A Strategic Investment for Your Business</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Implementing CafeGuard delivers multiple returns beyond just managing Wi-Fi.</p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <BenefitItem 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>}
          title="Increase Revenue"
          description="Encourage purchases by linking Wi-Fi access directly to a transaction, boosting customer spend."
        />
        <BenefitItem 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          title="Enhance Customer Experience"
          description="Provide fast and reliable internet exclusively for your paying patrons, improving satisfaction and loyalty."
        />
        <BenefitItem 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>}
          title="Optimize Bandwidth"
          description="Save on internet costs by eliminating unauthorized use and ensuring your valuable resources serve genuine customers."
        />
        <BenefitItem 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>}
          title="Gain Usage Insights"
          description="Understand your Wi-Fi usage patterns with valuable data, helping you make smarter business decisions."
        />
      </div>
    </div>
  </section>
);

export default Benefit;
