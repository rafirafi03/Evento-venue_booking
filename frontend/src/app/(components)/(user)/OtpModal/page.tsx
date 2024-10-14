import React, { useRef, useState, useEffect } from 'react';
import { useResendOtpMutation } from 'app/store/slices/userApiSlices';

interface PageProps {
  email: string;
  handleOtp: (event: React.FormEvent<Element>,otp: string) => void;
  otpError: string;
  clearError: ()=> void;
}

const Page: React.FC<PageProps> = ({ email, handleOtp, otpError, clearError }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(Array(4).fill(''));
  const [timer, setTimer] = useState<number>(60); 
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const [resendOtp] = useResendOtpMutation()

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); 
    }

    return () => clearInterval(interval); 
  }, [isTimerActive, timer]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    clearError()

    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value; 
      return newValues;
    });

    if (/^[0-9]$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); 
      }
    } else {
      if (value === '' && index > 0) {
        inputRefs.current[index - 1].focus(); 
      }
    }

    
  };

  const handleResendOTP = async () => {
    setTimer(60);
    setIsTimerActive(true);
    setInputValues(Array(4).fill(''));

    const res = await resendOtp({email}).unwrap();

    console.log(res);
    
    console.log('OTP resent to:', email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    const otp = inputValues.join('')
    handleOtp(e,otp)
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                {isTimerActive ? (
                  <p>We have sent a code to {email}</p>
                ) : (
                  <p>oopsss. time over</p>
                )}
              </div>
              <div className=" text-sm font-medium text-gray-400">
                {otpError && <p className='text-[rgb(255,0,0)]'>{otpError}</p>}
              </div>
            </div>

            <div>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div className="w-16 h-16" key={index}>
                        <input
                          ref={(el) => {(inputRefs.current[index] = el!)}}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 appearance-none"
                          type="text"
                          maxLength={1} // Limit to 1 character
                          value={inputValues[index]} // Set value from state
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button onClick={handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[rgb(255,0,0)] border-none text-white text-sm font-bold shadow-sm">
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      {isTimerActive ? (
                        <p>{timer} seconds remaining</p> 
                      ) : (
                        <>
                        <br />
                        <p>Didn't receive code?</p>
                        <button
                          className="flex flex-row items-center text-blue-600"
                          onClick={handleResendOTP} 
                        >
                          Resend
                        </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
