import { Header, Footer } from '../../components/common';
import Addresses from '../../components/dashboard/Addresses';

export default async function AddressesPage() {
  // Optional: Fetch user addresses server-side
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses`, {
  //   cache: 'no-store', // or 'force-cache' if you want caching
  // });
  // const addresses = await res.json();

  return (
    <div className="index-page">
      <Header />
      <main className="main">
        {/* You can pass fetched data into Addresses if needed */}
        <Addresses /* data={addresses} */ />
      </main>
      <Footer />
    </div>
  );
}
