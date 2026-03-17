'use client';

import React from 'react';
import { Layout, Input, Button, Dropdown, Space, Typography, MenuProps } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, DownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const categories = [
  { key: 'terraplenagem', label: 'Terraplenagem', tipos: ['Retroescavadeiras', 'Rolos Compactadores', 'Mini Carregadeiras'] },
  { key: 'elevacao', label: 'Elevação', tipos: ['Plataformas Tesoura', 'Plataformas Articuladas'] },
  { key: 'energia', label: 'Energia', tipos: ['Geradores a Diesel', 'Torres de Iluminação'] },
  { key: 'ferramentas', label: 'Ferramentas', tipos: ['Furadeiras', 'Serras', 'Marteletes'] },
  { key: 'andaimes', label: 'Andaimes', tipos: ['Andaimes Tubulares', 'Acessórios'] },
];

const categoryItems: MenuProps['items'] = categories.map(c => ({
  key: c.key,
  label: <Link href={`/?categoria=${c.key}`} className="font-medium hover:text-locmaisTeal">{c.label}</Link>,
  children: c.tipos.map(t => ({
    key: `${c.key}-${t}`,
    label: <Link href={`/?categoria=${c.key}&tipo=${encodeURIComponent(t.toLowerCase().replace(' ', '-'))}`} className="hover:text-locmaisTeal">{t}</Link>
  }))
}));

const vendaItems: MenuProps['items'] = [
  { key: 'venda-andaimes', label: <Link href="/vendas?categoria=andaimes" className="hover:text-locmaisTeal">Andaimes e Acessórios</Link> },
  { key: 'venda-ferramentas', label: <Link href="/vendas?categoria=ferramentas" className="hover:text-locmaisTeal">Ferramentas Elétricas</Link> },
  { key: 'venda-epis', label: <Link href="/vendas?categoria=epis" className="hover:text-locmaisTeal">EPIs e Segurança</Link> },
];

export const Header = () => {
  return (
    <div className="w-full flex justify-center bg-white shadow-sm border-b border-gray-100 z-50 sticky top-0">
      <div className="w-full flex flex-col">
        {/* Topbar: Contatos */}
        <div className="flex justify-between items-center py-1 px-4 md:px-8 lg:px-12 text-xs bg-gray-50 text-gray-600 border-b border-gray-200">
          <Space className="w-full max-w-7xl mx-auto flex justify-between">
            <Space>
              <span className="flex items-center gap-1"><PhoneOutlined /> (71) 3625-6693 | (71) 99945-4369</span>
              <span className="flex items-center gap-1"><MailOutlined /> comercial@locmais.com.br</span>
            </Space>
            <Space>
              <Link href="/sobre" className="hover:text-locmaisTeal transition-colors">Sobre a Locmais</Link>
              <span>|</span>
              <Link href="/contato" className="hover:text-locmaisTeal transition-colors">Fale Conosco</Link>
            </Space>
          </Space>
        </div>

        {/* Main Header: Logo + Busca + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 lg:px-12 gap-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
        </div>

        {/* Bottom Nav: Links */}
        <div className="hidden md:flex flex-row justify-between px-4 md:px-8 lg:px-12 py-3 border-t border-gray-100 uppercase text-[11px] font-bold w-full">
          <div className="flex gap-8 items-center w-full max-w-7xl mx-auto justify-between">
            <div className="flex gap-8 items-center">
              <Dropdown menu={{ items: categoryItems }} placement="bottomLeft">
                <a onClick={(e) => e.preventDefault()} className="hover:text-locmaisTeal text-gray-800 cursor-pointer flex items-center gap-1 transition-colors">
                  Equipamentos para Locação <DownOutlined className="text-[10px]" />
                </a>
              </Dropdown>
              <Dropdown menu={{ items: vendaItems }} placement="bottomLeft">
                <a onClick={(e) => e.preventDefault()} className="hover:text-locmaisTeal text-gray-800 cursor-pointer flex items-center gap-1 transition-colors">
                  Produtos à Venda <DownOutlined className="text-[10px]" />
                </a>
              </Dropdown>
            </div>
            <div className="flex gap-8 items-center">
              <Link href="/sobre" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Institucional <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
              <Link href="/blog" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Blog <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
              <Link href="/contato?assunto=trabalhe-conosco" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Trabalhe Conosco <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
              <Link href="/contato" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Fale Conosco <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
