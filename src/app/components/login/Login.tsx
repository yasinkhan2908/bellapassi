'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import { loginAction } from '../../actions/auth-actions';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    toast.loading('Logging in...');

    try {
      const result = await loginAction(formData);
      
      // If we get a result back (instead of redirect), it means there was an error
      if (result?.error) {
        toast.dismiss();
        toast.error(result.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex h-screen mt-20 justify-center">
      <div>
        <div className="z-10">
          <div className="p-4 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-800"> 
                Login <span className="text-gray-500 text-sm">or</span> Signup 
              </h3>
              <form action={handleSubmit} className="p-4 space-y-2">
                <div className="my-4 relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full font-normal absolute text-left text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-20 pl-3 py-3">
                    +91 |
                  </span>
                  <input 
                    type="tel" 
                    name="mobile_number"
                    placeholder="Mobile Number" 
                    maxLength={10} 
                    className="placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-300 outline-none focus:border-gray-600 w-full pl-14 focus:border-sss-primary-500 w-100 login-number" 
                    required
                  />
                  <div className="w-full flex-wrap text-gray-400 text-sm mt-2 mb-4"> 
                    By continuing, I agree to the
                    <Link href="/terms" className="text-sss-primary-500 font-semibold"> Terms of Use</Link>
                    &amp;
                    <Link href="/policy" className="text-sss-primary-500 font-semibold"> Privacy Policy</Link>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-100 transition btn-bg duration-500 ease-in-out bg-sss-primary-500 text-white font-bold py-2 px-4 rounded w-full md:w-3/5 lg:w-60 inline-flex justify-center disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Continue'}
                    </button>
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