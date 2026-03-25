'use client';

import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const { Title, Text } = Typography;

export const Footer = () => {
  const pathname = usePathname();
  if (pathname === '/portfolio') return null;

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
              Locação de equipamentos de pequeno e grande porte, tudo para sua obra. Reduza os custos e aumente a produtividade.
            </Text>
            <Space size="large" className="text-2xl mt-2">
              <Link href="https://wa.me/5571999454369?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20a%20equipe." target="_blank" rel="noopener noreferrer" className="text-white hover:text-locmaisYellow transition-colors"><WhatsAppOutlined /></Link>
              <Link href="mailto:comercial@locmais.com.br" className="text-white hover:text-locmaisYellow transition-colors"><MailOutlined /></Link>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={5} className="md:ml-auto">
            <Title level={4} className="!text-locmaisYellow !mb-6">Institucional</Title>
            <Space direction="vertical" size="middle">
              <Link href="/sobre" className="text-gray-200 hover:text-white transition-colors block">Sobre Nós</Link>
              <Link href="/servicos" className="text-gray-200 hover:text-white transition-colors block">Nossos Serviços</Link>
              <Link href="/faq" className="text-gray-200 hover:text-white transition-colors block">Dúvidas Frequentes</Link>
              <Link href="/contato?assunto=trabalhe-conosco" className="text-gray-200 hover:text-white transition-colors block">Trabalhe Conosco</Link>
            </Space>
          </Col>

          {/* Categories */}
          <Col xs={24} sm={12} md={5}>
            <Title level={4} className="!text-locmaisYellow !mb-6">Categorias</Title>
            <Space direction="vertical" size="middle">
              <Link href="/?categoria=terraplenagem" className="text-gray-200 hover:text-white transition-colors block">Terraplenagem</Link>
              <Link href="/?categoria=elevacao" className="text-gray-200 hover:text-white transition-colors block">Elevação</Link>
              <Link href="/?categoria=energia" className="text-gray-200 hover:text-white transition-colors block">Geradores de Energia</Link>
              <Link href="/?categoria=andaimes" className="text-gray-200 hover:text-white transition-colors block">Andaimes e Escoras</Link>
            </Space>
          </Col>

          {/* Contact Details */}
          <Col xs={24} md={6}>
            <Title level={4} className="!text-locmaisYellow !mb-6">Onde Estamos</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex items-start">
                <EnvironmentOutlined className="text-xl mr-3 text-locmaisYellow mt-1" />
                <Text className="text-gray-200 block">
                  <strong className="text-white">Sede (Bahia)</strong><br />
                  Av. Ayrton Senna, n° 831, SL 01<br />
                  Petrópolis, Dias d'Ávila/BA<br />
                  CEP: 42.850-000
                </Text>
              </div>
              <div className="flex items-start">
                <EnvironmentOutlined className="text-xl mr-3 text-locmaisYellow mt-1" />
                <Text className="text-gray-200 block">
                  <strong className="text-white">Filial (Paraíba)</strong><br />
                  Agostinho C. J. Justo, n° 51<br />
                  Quadra Lote 42, Patos/PB<br />
                  CEP: 58.706-580
                </Text>
              </div>
              <div className="flex items-center mt-2">
                <PhoneOutlined className="text-xl mr-3 text-locmaisYellow" />
                <Text className="text-gray-200">(71) 3625-6693</Text>
              </div>
              <div className="flex items-center">
                <WhatsAppOutlined className="text-xl mr-3 text-locmaisYellow" />
                <Text className="text-gray-200">(71) 99945-4369</Text>
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
