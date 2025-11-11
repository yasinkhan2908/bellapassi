import EditAddress from "../../../components/dashboard/EditAddress";
import { notFound } from "next/navigation";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // Fetch all product slugs from your API
  const res = await fetch(`${process.env.API_URL}/api/user/allAddress`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const AllAddress = await res.json();

  // Adjust based on your API response structure
  const addressList = AllAddress.data.address || AllAddress;

  return addressList.map((address: any) => ({
    id: address.id,
  }));
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  if (!id) return notFound();

  // ✅ pass the ID
  return <EditAddress id={id} />;
}
