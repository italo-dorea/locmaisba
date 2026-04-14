'use client';

import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { MenuCategory } from './Header';

const { Title, Text } = Typography;

export const Footer = ({ locacaoCategories = [], vendaNovosCategories = [], vendaUsadosCategories = [] }: {
  locacaoCategories?: MenuCategory[];
  vendaNovosCategories?: MenuCategory[];
  vendaUsadosCategories?: MenuCategory[];
}) => {
  const pathname = usePathname();
  if (pathname === '/portfolio') return null;

  const allCatsMap = new Map<string, string>();
  [...locacaoCategories, ...vendaNovosCategories, ...vendaUsadosCategories].forEach(c => {
    if (c.key !== 'empty-loc' && !c.key.startsWith('empty-')) {
      allCatsMap.set(c.key, c.label);
    }
  });
  const uniqueCategories = Array.from(allCatsMap.entries()).map(([key, label]) => ({ key, label })).slice(0, 8);

  return (
    <footer className="bg-locmaisTeal pt-12 pb-6 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[32, 32]}>
          {/* Brand & About */}
          <Col xs={24} md={8}>
            <div className="mb-6 bg-white inline-block px-4 py-3 rounded-lg shadow-sm">
              <Image src="/images/logo.png" alt="Locmais Logo" width={160} height={50} className="select-none" />
            </div>
            <Text className="text-gray-300 block mb-4">
              A LOCMAIS é uma empresa fundada em 16/07/2014, criada para atender clientes públicos e privados em serviços de construção e locação de equipamentos.<br/><br/>
              Locação de equipamentos de pequeno e grande porte para sua obra. Reduza os custos e aumente a produtividade.
            </Text>
            <Space size="middle" direction="vertical" className="mt-2">
              <Space className="flex items-center gap-2 mt-2">
                <Link href="mailto:comercial@locmaisba.com.br" className="text-white text-xl hover:text-locmaisYellow transition-colors"><MailOutlined /></Link>
                <Text className="text-white">comercial@locmaisba.com.br</Text>
              </Space>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={5} className="md:ml-auto">
            <Title level={4} className="!text-locmaisYellow !mb-6">Institucional</Title>
            <Space direction="vertical" size="middle">
              <Link href="/sobre" className="text-gray-200 hover:text-white transition-colors block">Sobre Nós</Link>
              <Link href="/servicos" className="text-gray-200 hover:text-white transition-colors block">Nossos Serviços</Link>
              <Link href="/parceiros" className="text-gray-200 hover:text-white transition-colors block">Clientes e Fornecedores</Link>
              <Link href="/contato?assunto=trabalhe-conosco" className="text-gray-200 hover:text-white transition-colors block">Trabalhe Conosco</Link>
            </Space>
          </Col>

          {/* Categories */}
          <Col xs={24} sm={12} md={5}>
            <Title level={4} className="!text-locmaisYellow !mb-6">Categorias</Title>
            <Space direction="vertical" size="middle">
              {uniqueCategories.map(c => (
                <Link key={c.key} href={`/?categoria=${c.key}`} className="text-gray-200 hover:text-white transition-colors block">
                  {c.label}
                </Link>
              ))}
              {uniqueCategories.length === 0 && (
                <Text className="text-gray-400">Nenhuma categoria</Text>
              )}
            </Space>
          </Col>

          {/* Contact Details */}
          <Col xs={24} md={6}>
            <Title level={4} className="!text-locmaisYellow !mb-6">Onde Estamos</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-start">
                  <EnvironmentOutlined className="text-xl mr-3 text-locmaisYellow mt-1" />
                  <Text className="text-gray-200 block">
                    <strong className="text-white">Sede (Bahia)</strong><br />
                    Av. Ayrton Senna, n° 831, SL 01<br />
                    Petrópolis, Dias d'Ávila/BA<br />
                    CEP: 42.850-000
                  </Text>
                </div>
                <div className="w-full h-[180px] rounded-lg overflow-hidden border border-[#0a4f5c] shadow-sm">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.4099970421375!2d-38.2931877249295!3d-12.621086537662993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7165de426517fa5%3A0x3de7d857dac59106!2sLOCMAIS!5e0!3m2!1spt-BR!2sbr!4v1774985657980!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <PhoneOutlined className="text-xl mr-3 text-locmaisYellow" />
                <Text className="text-gray-200">(71) 3625-6693</Text>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <WhatsAppOutlined className="text-xl mr-3 text-locmaisYellow" />
                  <Text className="text-gray-200">(71) 99945-4369</Text>
                </div>
                <div className="flex items-center">
                  <WhatsAppOutlined className="text-xl mr-3 text-locmaisYellow" />
                  <Text className="text-gray-200">(71) 99256-3118</Text>
                </div>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider className="border-gray-500 my-8 opacity-30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} LOCMAIS - Locação de Equipamentos. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
