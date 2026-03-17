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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <AntdRegistry>
          <ConfigProvider theme={locmaisTheme} locale={ptBR}>
            <Header />
            <main className="flex-1 w-full bg-white min-h-[60vh]">
              {children}
            </main>
            <Footer />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
