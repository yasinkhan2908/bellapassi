'use client';


import { Header, Footer } from '../../components/common';
import AccountSetting from '../../components/dashboard/AccountSetting';

export default function AccountSettingPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <AccountSetting />
      </main>
      <Footer />
    </div>
  );
}