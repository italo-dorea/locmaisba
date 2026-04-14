import { fetchProducts } from '@/lib/api';

const SITE_URL = 'https://locmaisba.com.br';

export default async function sitemap() {
  const products = await fetchProducts();

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/parceiros`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const productPages = products
    .filter((p) => p.name)
    .map((p) => ({
      url: `${SITE_URL}/produtos/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...productPages];
}
