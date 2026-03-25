import { fetchProducts, getProductById } from '@/lib/api';
import { ProductClient } from './ProductClient';
import Link from 'next/link';

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <Link href="/">
          <button className="bg-[#127184] text-white px-4 py-2 rounded">Voltar para a Home</button>
        </Link>
      </div>
    );
  }

  return <ProductClient product={product} />;
}
