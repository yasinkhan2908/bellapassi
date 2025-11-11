'use server';

import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export async function logoutAction() {
    // Remove token from cookies
    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    // Redirect to home
    redirect('/');
}