import React, { Suspense } from 'react';
import HomeClient from './HomeClient';
import { fetchProducts, fetchCategories } from '@/lib/api';

export default async function Home() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="w-full h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-locmaisTeal"></div>
        </div>
      }>
        <HomeClient initialProducts={products} initialCategories={categories} />
      </Suspense>
    </main>
  );
}
