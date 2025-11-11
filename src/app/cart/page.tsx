'use client';


import { Header, Footer } from '../components/common/';
import Cart from '../components/cart/Cart';

export default function CartPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <div className="page-title light-background">
            <div className="container d-lg-flex justify-content-between align-items-center">
                <h1 className="mb-2 mb-lg-0">Cart</h1>
                <nav className="breadcrumbs">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li className="current">Cart</li>
                    </ol>
                </nav>
            </div>
        </div>
        <Cart />
      </main>
      <Footer />
    </div>
  );
}