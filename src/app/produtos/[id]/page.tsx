import { Metadata } from 'next';
import { fetchProducts, getProductById } from '@/lib/api';
import { ProductClient } from './ProductClient';
import Link from 'next/link';

const SITE_URL = 'https://locmaisba.com.br'; // ajuste para o domínio real

// ─── Gera HTML estático para cada produto ─────────────────────────────────
export async function generateStaticParams() {
  const products = await fetchProducts();
  if (!products || products.length === 0) return [{ id: 'dummy' }];
  return products.map((p) => ({ id: String(p.id) }));
}

// ─── Metadata dinâmica por produto (title, description, og, keywords) ─────
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Produto não encontrado | LOCMAIS',
      description: 'O produto que você procura não está disponível.',
    };
  }

  // Título: Nome do produto + categoria + marca
  const title = `${product.name} | ${product.categoryName} | LOCMAIS`;

  // Descrição enriquecida para os snippets do Google
  const description = product.shortDescription
    ? `${product.shortDescription} — ${product.categoryName}. Locação e venda de equipamentos em Salvador (BA). Solicite cotação via WhatsApp.`
    : `${product.name} disponível para locação e venda. Equipamento de qualidade na categoria ${product.categoryName}. LOCMAIS, Salvador – BA.`;

  // Keywords: campo editável + fallbacks automáticos
  const keywordsArray = [
    product.name,
    product.categoryName,
    product.brand,
    'locação de equipamentos',
    'Salvador',
    'Bahia',
    'construção civil',
    ...(product.seoKeywords ? product.seoKeywords.split(',').map((k) => k.trim()) : []),
  ].filter(Boolean);

  const ogImage = product.imageUrl.startsWith('http')
    ? product.imageUrl
    : `${SITE_URL}${product.imageUrl}`;

  return {
    title,
    description,
    keywords: keywordsArray,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/produtos/${product.id}`,
      siteName: 'LOCMAIS',
      images: [{ url: ogImage, width: 800, height: 600, alt: product.name }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/produtos/${product.id}`,
    },
  };
}

// ─── Página do Produto ─────────────────────────────────────────────────────
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

  // JSON-LD Schema — Google interpreta e exibe Rich Results (imagem, preço, condição)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.fullDescription,
    image: product.imageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'LOCMAIS',
    },
    category: product.categoryName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.price ? product.price.replace(/\./g, '').replace(',', '.') : '0',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/produtos/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'LOCMAIS',
        url: SITE_URL,
      },
    },
    ...(product.condition && {
      itemCondition:
        product.condition === 'Novo'
          ? 'https://schema.org/NewCondition'
          : 'https://schema.org/UsedCondition',
    }),
  };

  return (
    <>
      {/* JSON-LD embutido no HTML estático — lido pelos crawlers do Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} />
    </>
  );
}
