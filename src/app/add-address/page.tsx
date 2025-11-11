'use client';


import { Header, Footer } from '../components/common/';
import AddAddress from '../components/address/AddAddress';

export default function AddAddressPage() {
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
                        <li className="current">Add New Address</li>
                    </ol>
                </nav>
            </div>
        </div>
        <AddAddress />
      </main>
      <Footer />
    </div>
  );
}