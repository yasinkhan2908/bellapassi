'use server';

import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { revalidatePath } from "next/cache";

export async function logoutAction() {
    // Remove token from cookies
    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    // Redirect to home
    redirect('/');
}

export async function loginUser(prevState: { error: string | null }, formData: FormData) {
  const mobile_number = formData.get('mobile_number') as string;
  
  // try {
    // 1️⃣ Get CSRF cookie first
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      cache: 'no-store', // ensures fresh data each time
    });
    
    // 2️⃣ Then login
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // ensures fresh data each time
      body: JSON.stringify({ mobile_number }),
    });

    const result = await response.json();
    //console.log("result",result);
    if (!result.success) {
      return { error: result.message || 'Login failed' };
    }

    // Store data in cookies
    const cookieStore = await cookies();
    cookieStore.set('mobile', mobile_number, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    cookieStore.set('otp', result.otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 300
    });
    console.log("redirect otp");
    redirect('/otp');

  // } catch (error) {
  //   console.error('Login failed:', error);
  //   return { error: 'Login failed. Please try again.' };
  // }
}


export async function verifyOtp(formData: FormData) {
  const mobile = formData.get('mobile') as string;
  const otpDigits = [0, 1, 2, 3].map(i => formData.get(`otp-${i}`) as string);
  const otp = otpDigits.join('');

  try {
    // Your OTP verification logic here
    const response = await verifyOtpOnServer(mobile, otp);
    
    if (response.success) {
      // Set auth cookie
      (await
            // Set auth cookie
            cookies()).set('token', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      // Clear demo OTP
      (await
            // Clear demo OTP
            cookies()).set('demoOtp', '', { maxAge: 0 });
      
      redirect('/user/dashboard');
    } else {
      // Handle error - you might want to show error message
      redirect('/otp?error=invalid_otp');
    }
  } catch (error) {
    redirect('/otp?error=verification_failed');
  }
}

async function verifyOtpOnServer(mobile: string, otp: string) {
  // Your API call to verify OTP
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/otp-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mobile, otp }),
  });
  
  return await response.json();
}

export async function resendOtp() {
  const cookieStore = await cookies();
  const mobile = cookieStore.get('mobile')?.value;
  
  if (!mobile) {
    return { error: 'Mobile number not found' };
  }
  
  try {
    // Your resend OTP logic here
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Update demo OTP if needed
      if (result.demoOtp) {
        (await cookies()).set('demoOtp', result.demoOtp, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 10 // 10 minutes
        });
      }
      
      revalidatePath('/otp');
      return { success: true, message: result.message };
    }
    
    return { error: result.message };
  } catch (error) {
    return { error: 'Failed to resend OTP' };
  }
}