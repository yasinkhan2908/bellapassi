import ProductDetail from "../../components/products/ProductDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";



// If you need generateMetadata, add it like this:
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // You can fetch product data here for metadata if needed
  const res = await fetch(`${process.env.API_URL}/api/user/product-detail/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = await res.json();
  //console.log('product detail',product.data.productdetails);
  return {
    title: product.data.productdetails.product_name || 'Product Details',
    description: product.data.productdetails.product_description || product.data.productdetails.product_description || 'Product details page',
    openGraph: {
      title: product.data.productdetails.product_name || 'Product Details',
      description: product.data.productdetails.product_description || product.data.productdetails.product_description || 'Product details page',
      images: product.data?.images || product.images || [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // 👈 Await the params

  const res = await fetch(`${process.env.API_URL}/api/user/product-detail/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) return notFound();

  const product = await res.json();

  return <ProductDetail product={product} />;
}