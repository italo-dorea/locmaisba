import { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { locmaisTheme } from '@/lib/theme';
import ptBR from 'antd/locale/pt_BR';
import './globals.css';

export const metadata: Metadata = {
  title: 'LOCMAIS | Locação de Equipamentos',
  description: 'Há mais de 10 anos oferecendo locação de equipamentos para construção civil e indústria com segurança e qualidade.',
  keywords: ['locação', 'equipamentos', 'construção civil', 'andaimes', 'geradores', 'retroescavadeira'],
};

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { fetchProducts } from '@/lib/api';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const produtos = await fetchProducts();

  // Helper to build menu categories
  const buildMenu = (filterFn: (p: any) => boolean) => {
    const filteredProducts = produtos.filter(filterFn);
    
    // Group by category
    const catsMap = new Map<string, any>();
    filteredProducts.forEach(p => {
      if (!catsMap.has(p.categoryId)) {
        catsMap.set(p.categoryId, {
          key: p.categoryId,
          label: p.categoryName,
          products: []
        });
      }
      catsMap.get(p.categoryId).products.push({ id: p.id, name: p.name });
    });
    
    return Array.from(catsMap.values());
  };

  // Locação: missing businessType is assumed locação, or explicitly has 'locacao'
  const locacaoCategories = buildMenu(p => {
    const bt = (p.businessType || '').toLowerCase();
    return bt === '' || bt.includes('locacao');
  });

  const vendaNovosCategories = buildMenu(p => {
    const bt = (p.businessType || '').toLowerCase();
    return bt.includes('venda') && p.condition?.toLowerCase() === 'novo';
  });

  const vendaUsadosCategories = buildMenu(p => {
    const bt = (p.businessType || '').toLowerCase();
    return bt.includes('venda') && p.condition?.toLowerCase() === 'usado';
  });

  const allProducts = produtos.map(p => ({ id: p.id, name: p.name }));

  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <AntdRegistry>
          <ConfigProvider theme={locmaisTheme} locale={ptBR}>
            <Header locacaoCategories={locacaoCategories} vendaNovosCategories={vendaNovosCategories} vendaUsadosCategories={vendaUsadosCategories} allProducts={allProducts} />
            <main className="flex-1 w-full bg-white min-h-[60vh]">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
