'use client';


import { Header, Footer } from '../components/common/';
import Checkout from '../components/checkout/Checkout';

export default function CheckoutPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <div className="page-title light-background">
            <div className="container d-lg-flex justify-content-between align-items-center">
                <h1 className="mb-2 mb-lg-0">Checkout</h1>
                <nav className="breadcrumbs">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li className="current">Checkout</li>
                    </ol>
                </nav>
            </div>
        </div>
        <Checkout />
      </main>
      <Footer /> 
    </div>
  );
}