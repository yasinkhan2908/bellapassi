// app/user/add-address/page.tsx
'use client';

import { AccountSidebar } from '../../components/dashboard/AccountSidebar';
import { AddAddressForm } from '../../components/dashboard/AddAddresses';
import { Header, Footer } from '../../components/common';
export default function AddAddressPage() {
  return (
    <main className="main">
      <Header />
      <section id="account" className="account section">
        <div className='container'>
          <div className="row g-4">
            <div className="col-lg-3">
              <AccountSidebar />
            </div>
            <div className="col-lg-9">
              <div className="content-area">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="addresses" role="tabpanel">
                    <div className="section-header">
                      <h2>Add New Address</h2>
                    </div>
                    <div className="addresses-grid">
                      <div className="address-card active mb-3">
                        <AddAddressForm />
                      </div>
                    </div>
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}