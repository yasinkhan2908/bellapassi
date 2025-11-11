'use client';


import { Header, Footer } from '../components/common/';
import Address from '../components/address/Address';

export default function AddressPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <div className="page-title light-background">
            <div className="container d-lg-flex justify-content-between align-items-center">
                <h1 className="mb-2 mb-lg-0">Address</h1>
                <nav className="breadcrumbs">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li className="current">Address</li>
                    </ol>
                </nav>
            </div>
        </div>
        <Address />
      </main>
      <Footer />
    </div>
  );
}