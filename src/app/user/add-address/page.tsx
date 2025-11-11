'use client';


import { Header, Footer } from '../../components/common';
import AddAddresses from '../../components/dashboard/AddAddresses';

export default function AddAddressPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <AddAddresses />
      </main>
      <Footer />
    </div>
  );
}