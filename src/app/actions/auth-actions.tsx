'use server';

import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { post } from "jquery";

export async function logoutAction() {
    // Remove token from cookies
    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    // Redirect to home
    redirect('/');
}

export async function loginAction(formData: FormData) {
  const mobile_number = formData.get('mobile_number') as string;
  
  try {
    // 1️⃣ Get CSRF cookie first
    const csrfResponse = await fetch(`${process.env.API_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });

    if (!csrfResponse.ok) {
      throw new Error('Failed to get CSRF token');
    }

    // 2️⃣ Then register/login
    const response = await post(`${process.env.API_URL}/api/user/user-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ mobile_number }),
    });

    const result = await response.json();

    if (!result.success) {
      // Return error message that can be handled by the client
      return { error: result.message || 'Login failed' };
    }

    // Store mobile number and OTP in cookies
    const cookieStore = await cookies();
    cookieStore.set('mobile', mobile_number, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });

    cookieStore.set('otp', result.otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });

    // ✅ redirect to OTP page
    redirect('/otp');

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed. Please try again.' };
  }
}