'use client';


import { Header, Footer } from '../components/common/';
import Login from '../components/login/Login';

export default function LoginPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <Login />
      </main>
      <Footer />
    </div>
  );
}