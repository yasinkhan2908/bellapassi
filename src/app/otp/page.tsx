'use client';

import { Header, Footer } from '../components/common';
import Otp from '../components/login/Otp';

export default function OtpPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <Otp />
      </main>
      <Footer />
    </div>
  );
}