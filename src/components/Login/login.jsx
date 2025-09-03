import {React , useState} from 'react';
import PhoneOtpLogin from './PhoneOTPLogin';
function Login() {
  
  return (  
    <div>
      <div>
        <img src="/CafeGuard_logo.png" alt="CafeGuard logo" width={150} height={10} className='m-auto'/>
        <div className='Heading text-2xl font-bold text-center mt-1 mb-1'><span className='text-[#A45A2A]'>Cafe</span><span className='text-[#1F4D34]'>Guard</span></div>
        <div className='subheading text-xl font-semibold text-center '><span className='text-[#A45A2A]'>Guarding Connections,</span><span className='text-[#1F4D34] '> Empowering Cafes.</span></div>
      </div>
      <div>
        <p className='text-center mt-4 text-lg text-[#1F4D34] font-lg'>
          Securely connect to cafe Wi-Fi with a simple, one-time<br/>
          password, enhancing both your security and your coffee<br/>
          shop experience.
        </p>
      </div>
      <div>
       <PhoneOtpLogin/> 
      </div>
       
    </div>
  );
}

export default Login;