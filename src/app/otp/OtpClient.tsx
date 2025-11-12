'use client';
import Image from "next/image";
import toast from 'react-hot-toast';
import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function OtpClient() {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ otp?: string; general?: string }>({});
    
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get mobile from URL params or session storage
    useEffect(() => {
        const urlMobile = searchParams.get('mobile');
        const storedMobile = sessionStorage.getItem('mobile');
        
        if (urlMobile) {
            setMobile(urlMobile);
            sessionStorage.setItem('mobile', urlMobile);
        } else if (storedMobile) {
            setMobile(storedMobile);
        }
    }, [searchParams]);

    // Get stored OTP
    useEffect(() => {
        const storedOtp = localStorage.getItem('otp');
        if (storedOtp) {
            setOtp(storedOtp);
        }
    }, []);

    // OTP input management
    const length = 4;
    const [otps, setOtps] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // Client-side validation
    const validateForm = (): boolean => {
        const newErrors: { otp?: string } = {};
        
        const otpValue = otps.join('');
        if (otpValue.length !== length) {
            newErrors.otp = 'Please enter complete OTP';
        }
        
        if (!/^\d+$/.test(otpValue)) {
            newErrors.otp = 'OTP must contain only numbers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, "");
        if (!value) return;

        const newOtp = [...otps];
        newOtp[index] = value[0];
        setOtps(newOtp);
        setErrors({}); // Clear errors on change

        if (index < length - 1 && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otps[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, length);
        const newOtp = pasteData.split("");
        setOtps(newOtp.concat(new Array(length - newOtp.length).fill("")));
        setErrors({}); // Clear errors on paste
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Client-side validation
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            toast.loading('Verifying OTP...');

            // Get CSRF cookie first
            await fetch(`${process.env.API_URL}/sanctum/csrf-cookie`, {
                cache: 'no-store', // ensures fresh data each time
            });

            // OTP verification
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/otp-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    mobile: mobile, 
                    otps: otps
                }),
            });

            const result = await response.json();

            if (!result.success) {
                toast.dismiss();
                toast.error(result.message || 'OTP verification failed!');
                setErrors({ general: result.message || 'OTP verification failed' });
                return;
            }

            toast.dismiss();
            toast.success(result.message || 'OTP successfully verified!');

            // Store authentication data
            if (result.data?.token) {
                localStorage.setItem("token", result.data.token);
            }

            // Redirect to dashboard
            setTimeout(() => {
                router.push('/user/dashboard');
            }, 500);
            
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.dismiss();
            toast.error('Verification failed. Please try again.');
            setErrors({ general: 'Verification failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        if (!mobile) {
            toast.error('Mobile number not found');
            return;
        }

        try {
            toast.loading('Resending OTP...');
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile }),
            });

            const result = await response.json();

            toast.dismiss();
            
            if (result.success) {
                toast.success('OTP resent successfully!');
                if (result.data?.otp) {
                    setOtp(result.data.otp);
                    localStorage.setItem('otp', result.data.otp);
                }
                setOtps(new Array(length).fill("")); // Clear OTP inputs
                setErrors({});
            } else {
                toast.error(result.message || 'Failed to resend OTP');
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to resend OTP');
        }
    };

    return (
        <div className="d-flex h-screen mt-20 justify-center">
            <div>
                <div className="z-10">
                    <div className="p-4 bg-white mx-auto rounded-2xl w-100">
                        <div className="mb-4">
                            <div className="d-flex justify-center">
                                <Image 
                                    src="/img/sms_icon.png"  
                                    width={40} 
                                    height={40}   
                                    alt="SMS icon" 
                                    className="w-40" 
                                    loading="lazy"
                                />
                            </div>
                            <div className="d-flex flex-col mt-4 text-blue text-center">
                                <span>
                                    OTP has been sent via SMS to {mobile} 
                                    {otp && <strong> Otp - ({otp})</strong>}
                                </span>
                            </div>
                            
                            {errors.general && (
                                <div className="text-red-500 text-center mt-2">
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="p-4 space-y-2">
                                <div className="my-4 relative flex w-full flex-wrap items-stretch">
                                    <div className="d-flex gap-2 justify-center mt-6">
                                        {otps.map((digit, i) => (
                                            <input
                                                key={i}
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
                                                className={`m-2 border h-10 w-12 text-center form-control rounded focus:border-gray-600 bg-red-50 ${
                                                    errors.otp ? 'border-red-500' : ''
                                                }`}
                                                disabled={isSubmitting}
                                            />
                                        ))}
                                    </div>
                                    
                                    {errors.otp && (
                                        <div className="text-red-500 text-center mt-2 text-sm">
                                            {errors.otp}
                                        </div>
                                    )}

                                    <div className="mt-5">
                                        <div className="rounded-md bg-sss-primary-500 mx-8">
                                            <button 
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`transition duration-500 ease-in-out bg-sss-primary-500 text-white font-bold py-2 px-4 rounded w-full inline-flex justify-center verify-btn ${
                                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                <i className="bi bi-bucket"></i>
                                                <span className="mt-0.5 ml-1 text-white verify">
                                                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex justify-center text-center mt-5">
                                        <div className="d-flex flex-col items-center space-y-2 text-center">
                                            <button
                                                type="button"
                                                className="cursor-pointer inline-flex items-center gap-2 text-green-700 hover:underline font-bold text-xl text-green bg-transparent border-none"
                                            >
                                                <i className="bi bi-whatsapp"></i>
                                                <span className="text-green">Get OTP on WhatsApp</span>
                                            </button>
                                            <div className="text-gray-500">OR</div>
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={isSubmitting}
                                                className="font-bold cursor-pointer text-xl text-blue bg-transparent border-none hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Resend OTP via SMS
                                            </button>
                                        </div>
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