import { Header, Footer } from '../../components/common/';
import Dashboard from '../../components/dashboard/Dashboard';

export default async function DashboardPage() {
  // Example: Fetch data server-side if needed
  // const res = await fetch(`${process.env.API_URL}/api/user/dashboard`, {
  //   cache: 'no-store', // or 'force-cache' if you want caching
  // });
  // const dashboardData = await res.json();

  return (
    <div className="index-page">
      <Header />
      <main className="main">
        {/* You can pass server-fetched data to Dashboard if needed */}
        <Dashboard /* data={dashboardData} */ />
      </main>
      <Footer />
    </div>
  );
}
