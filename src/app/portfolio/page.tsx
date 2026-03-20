import { fetchProducts } from '@/lib/api';
import { PortfolioClient } from './PortfolioClient';

export default async function PortfolioPage() {
  const products = await fetchProducts();

  // Group products by category
  const categoriesMap = new Map<string, any[]>();
  products.forEach(p => {
    if (!categoriesMap.has(p.categoryName)) {
      categoriesMap.set(p.categoryName, []);
    }
    categoriesMap.get(p.categoryName)!.push(p);
  });

  const categories = Array.from(categoriesMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return <PortfolioClient categories={categories} />;
}
