'use client';


import { Header, Footer } from '../../components/common';
import Addresses from '../../components/dashboard/Addresses';

export default function AddressesPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <Addresses />
      </main>
      <Footer />
    </div>
  );
}