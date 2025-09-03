import {React,useState} from 'react';
import EnterOTP from './EnterOTP';
function PhoneOtpLogin() {
  const [phoneNumber , setPhoneNumber] = useState(" ");
  const [isSubmit , setIssubmit] = useState(false);
  const [isNumberValid , setIsNumbervalid] = useState(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if(phoneNumber.length < 10 || phoneNumber.length > 15 || phoneRegex.test(phoneNumber)){
      setIsNumbervalid(false);
    }
    setIssubmit(true);
    // Proceed with form submission or further processing
    console.log("Submitted phone number:", phoneNumber);

  };

  const handleOnChange = (e) =>{
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };
  return ( 
    
    <div className='bg-[#FFF4E6] w-120 h-60 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none" mt-10 mb-30 m-auto rounded-xl'>
      {!isSubmit ? <form onSubmit={handleOnSubmit} className='flex flex-col justify-center mt-8'>
        <label htmlFor="" className='text-lg text-[#1F4D34] relative left-10'>Enter Mobile Number</label>
          <input type="text" 
          value={phoneNumber}
          onChange={handleOnChange}
          placeholder='Enter the Mobile Number'
          className='bg-[#FAF9F6] rounded-lg w-100 h-10 m-auto relative top-6 border border-[#1F4D34] focus:border-[#A45A2A] focus:ring-2 focus:ring-[#A45A2A] outline-none text-[#1F4D34] {$!isNumberValid ? "border-red-500" : ""}'
          />
          {!isNumberValid && (
            <p className='text-red-500 text-sm mt-1 relative top-6'>Please enter a valid phone number.</p>
          )}
          <button className="px-2 py-2 text-lg font-semibold text-white bg-[#9A5832] rounded-full w-45 h-13 mt-10 m-auto hover:bg-[#284838] transition-all duration-300 transform hover:scale-105 shadow-lg relative top-3 " type='Submit' >Get The OTP</button>
      </form> : <div className='text-center text-lg font-semibold text-[#1F4D34] mt-16'>OTP has been sent to {phoneNumber}
      <EnterOTP/>
        </div>}
    </div>
  );
}

export default PhoneOtpLogin;