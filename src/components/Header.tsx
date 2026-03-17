'use client';

import React from 'react';
import { Layout, Input, Button, Menu, Space, Typography } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const categories = [
  { key: 'terraplenagem', label: 'Terraplenagem' },
  { key: 'elevacao', label: 'Elevação' },
  { key: 'energia', label: 'Energia' },
  { key: 'ferramentas', label: 'Ferramentas' },
  { key: 'andaimes', label: 'Andaimes' },
];

export const Header = () => {
  return (
    <div className="w-full flex justify-center bg-white shadow-sm border-b border-gray-100 z-50 sticky top-0">
      <div className="w-full max-w-7xl flex flex-col">
        {/* Topbar: Contatos */}
        <div className="flex justify-between items-center py-1 px-4 text-xs bg-gray-50 text-gray-600 border-b border-gray-200">
          <Space>
            <span className="flex items-center gap-1"><PhoneOutlined /> (11) 9999-9999</span>
            <span className="flex items-center gap-1"><MailOutlined /> contato@locmais.com.br</span>
          </Space>
          <Space>
            <Link href="/sobre" className="hover:text-locmaisTeal transition-colors">Sobre a Locmais</Link>
            <span>|</span>
            <Link href="/contato" className="hover:text-locmaisTeal transition-colors">Fale Conosco</Link>
          </Space>
        </div>

        {/* Main Header: Logo + Busca + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Locmais Logo" width={180} height={55} priority className="select-none" />
          </Link>

          <div className="flex-1 w-full md:max-w-xl mx-4">
            <Input
              size="large"
              placeholder="Qual equipamento você precisa?"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full !border-gray-300 hover:!border-locmaisTeal focus:!border-locmaisTeal"
            />
          </div>

          <Space>
            <Button type="primary" size="large" className="font-semibold bg-locmaisYellow hover:!bg-[#e5a50c] border-none text-white shadow-md">
              Solicitar Orçamento
            </Button>
          </Space>
        </div>

        {/* Bottom Nav: Categorias */}
        <div className="hidden md:flex px-4 items-center">
          <Button type="text" icon={<MenuOutlined />} className="font-bold flex items-center hover:!text-locmaisTeal mr-2">
            Todas as Categorias
          </Button>
          <Menu
            mode="horizontal"
            items={categories.map(c => ({
              key: c.key,
              label: <Link href={`/?categoria=${c.key}`} className="font-medium hover:text-locmaisTeal transition-colors">{c.label}</Link>
            }))}
            className="flex-1 border-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};
