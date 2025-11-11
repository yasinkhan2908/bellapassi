'use client';


import { Header, Footer } from '../../components/common/';
import Dashboard from '../../components/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}