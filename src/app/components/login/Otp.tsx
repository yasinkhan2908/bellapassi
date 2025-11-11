'use client';
import Image from "next/image";
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent, Key } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
export default function Otp() {
    const [mobile, setMobile] = useState('');
    useEffect(() => {
        const storedMobile = sessionStorage.getItem('mobile');
        if (storedMobile) {
            setMobile(storedMobile);
        }
    }, []);

    const router = useRouter(); // ✅ initialize router
    //toast.loading('Logging in...');
    const [first_otp, setFirstOtp] = useState('');
    const [second_otp, setSecondOtp] = useState('');
    const [third_otp, setThirdOtp] = useState('');
    const [forth_otp, setForthOtp] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [result, setResult] = useState<{ error?: string; data?: any } | null>(null);
    const [otp, setOtp] = useState('');


    useEffect(() => {
        const storedOtp = localStorage.getItem('otp');
        if (storedOtp) {
        setOtp(storedOtp);
        }
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("otps",otps);return false;
        try {
            toast.loading('Logging in...');
            // 1️⃣ Get CSRF cookie first
            await api.get('/sanctum/csrf-cookie');

            // 2️⃣ Then login
            //const response = await api.post('/api/user/otp-verification', { mobile, first_otp, second_otp, third_otp, forth_otp });
            const response = await api.post('/api/user/otp-verification', { mobile, otps });
            //console.log('Login success:', response.data);
            if (response.data.success === false) {
                toast.dismiss();
                toast.error(response.data.message || 'Otp Not Match!');
                return;
            }
            toast.dismiss();
            toast.success(response.data.message || 'Opt successfully verify!');
            //auth manage start
            localStorage.setItem("token", response.data.data.token);
            //console.log("Token stored:", localStorage.getItem("token"));
            setToken(response.data.token);
            setUser(response.data.user);
            //auth manage end
            // ✅ redirect after short delay
            setTimeout(() => {
                router.push('/user/dashboard'); // 👈 your next page path
            }, 500);
            
        } catch (error) {
            //console.log(error);
            toast.dismiss();
            toast.error('Login failed. Please try again.');
        }
    };


    const length = 4;
    const [otps, setOtps] = useState<string[]>(new Array(length).fill(""));

    // ✅ Properly typed ref array
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, ""); // allow digits only
        if (!value) return;

        const newOtp = [...otps];
        newOtp[index] = value[0];
        setOtps(newOtp);

        // move to next
        if (index < length - 1 && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1]?.focus();
        }
        
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, length);
        const newOtp = pasteData.split("");
        setOtps(newOtp.concat(new Array(length - newOtp.length).fill("")));
    };
    
  return (
    <div className="d-flex h-screen mt-20 justify-center">
      <div>
        <div className="z-10">
          <div className="p-4 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <div className="d-flex justify-center">
                <Image src="/img/sms_icon.png"  width={40} height={40}   alt="Profile picture" className="w-40" loading="lazy"/>
            </div>
            <div className="d-flex flex-col mt-4 text-blue text-center">
                <span>OTP has been sent via SMS to {mobile} <strong> Otp - ( {otp} )</strong></span>
            </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-2">
                <div className="my-4 relative flex w-full flex-wrap items-stretch">
                    <div className="d-flex gap-2 justify-center mt-6">
                        {otps.map((digit, i) => (
                            <input
                            key={i}
                            // ✅ callback ref must return void (no implicit return)
                            ref={(el) => {
                                inputsRef.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                            className="m-2 border h-10 w-custom text-center form-control rounded focus:border-gray-600 bg-red-50"
                            />
                        ))}
                        </div>
                    {/* <div id="otp" className="d-flex flex-row justify-center text-center px-2 mt-3">
                        <span>
                            <input id="first" type="number"  min={0} max={9} className="m-2 border h-10 w-custom text-center form-control rounded focus:border-gray-600 bg-red-50" onChange={e => setFirstOtp(e.target.value)}/>
                        </span>
                        <span>
                            <input id="second" type="number" min={0} max={9} className="m-2 border h-10 w-custom text-center form-control rounded focus:border-gray-600 bg-red-50" onChange={e => setSecondOtp(e.target.value)}/>
                        </span>
                        <span>
                            <input id="third" type="number" min={0} max={9} className="m-2 border h-10 w-custom text-center form-control rounded focus:border-gray-600 bg-red-50" onChange={e => setThirdOtp(e.target.value)}/>
                        </span>
                        <span>
                            <input id="fourth" type="number" min={0} max={9} className="m-2 border h-10 w-custom text-center form-control rounded focus:border-gray-600 bg-red-50" onChange={e => setForthOtp(e.target.value)}/>
                        </span>
                    </div> */}
                  
                  <div className="mt-5">
                    <div className="rounded-md bg-sss-primary-500 mx-8">
                        <button className="transition duration-500 ease-in-out bg-sss-primary-500 text-white font-bold py-2 px-4 rounded w-full lg:w-60 inline-flex justify-center w-100 verify-btn">
                            <i className="bi bi-bucket"></i>
                            <span className="mt-0.5 ml-1 text-white verify">
                                Verify OTP
                            </span>
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-center text-center mt-5">
                    <Link href="#" className="d-flex items-center cursor-pointer">
                        <div className="d-flex flex-col items-center space-y-2 text-center">
                            <div className="cursor-pointer inline-flex items-center gap-2 text-green-700 hover:underline font-bold text-xl text-green">
                                <i className="bi bi-whatsapp"></i>
                                <span className="text-green">Get OTP on WhatsApp</span>
                            </div>
                            <div className="text-gray-500">OR</div>
                            <div className="font-bold cursor-pointer text-xl text-blue">
                                Resend OTP via SMS
                            </div>
                        </div>
                    </Link>
                </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}