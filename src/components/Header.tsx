'use client';

import React from 'react';
import { Layout, Input, Button, Dropdown, Space, Typography, MenuProps, AutoComplete } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, DownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export type MenuProduct = { id: string; name: string };
export type MenuCategory = { key: string; label: string; products: MenuProduct[] };

export const Header = ({ 
  locacaoCategories, 
  vendaCategories,
  allProducts
}: { 
  locacaoCategories: MenuCategory[]; 
  vendaCategories: MenuCategory[]; 
  allProducts: MenuProduct[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/portfolio') return null;

  const categoryItems: MenuProps['items'] = locacaoCategories.length > 0 ? locacaoCategories.map(c => ({
    key: c.key,
    label: <Link href={`/?categoria=${c.key}`} className="font-medium hover:text-locmaisTeal">{c.label}</Link>,
    children: c.products.map(p => ({
      key: `loc-${p.id}`,
      label: <Link href={`/produtos/${p.id}`} className="hover:text-locmaisTeal">{p.name}</Link>
    }))
  })) : [{ key: 'empty-loc', label: <span className="text-gray-400">Nenhum equipamento</span> }];

  const vendaItems: MenuProps['items'] = vendaCategories.length > 0 ? vendaCategories.map(c => ({
    key: `venda-${c.key}`,
    label: <Link href={`/?categoria=${c.key}`} className="font-medium hover:text-locmaisTeal">{c.label}</Link>,
    children: c.products.map(p => ({
      key: `vend-${p.id}`,
      label: <Link href={`/produtos/${p.id}`} className="hover:text-locmaisTeal">{p.name}</Link>
    }))
  })) : [{ key: 'empty-vend', label: <span className="text-gray-400">Nenhum produto à venda</span> }];

  return (
    <div className="w-full flex justify-center bg-white shadow-sm border-b border-gray-100 z-50 sticky top-0">
      <div className="w-full flex flex-col">
        {/* Topbar: Contatos */}
        <div className="flex justify-between items-center py-1 px-4 md:px-8 lg:px-12 text-xs bg-gray-50 text-gray-600 border-b border-gray-200">
          <Space className="w-full max-w-7xl mx-auto flex justify-between">
            <Space>
              <span className="hidden md:flex items-center gap-1"><PhoneOutlined /> (71) 3625-6693 | (71) 99945-4369 | (71) 9256-3118</span>
              <span className="flex items-center gap-1"><MailOutlined /> comercial@locmaisba.com.br</span>
            </Space>
            <Space>
              <Link href="/sobre" className="hover:text-locmaisTeal transition-colors">Sobre a Locmais</Link>
              <span className="hidden md:inline">|</span>
              <Link href="/contato" className="hidden md:inline hover:text-locmaisTeal transition-colors">Fale Conosco</Link>
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
              <AutoComplete
                options={allProducts.map(p => ({ value: p.name, id: p.id }))}
                onSelect={(val, option) => router.push(`/produtos/${option.id}`)}
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                className="w-full"
                popupMatchSelectWidth={true}
              >
                <Input
                  size="large"
                  placeholder="Qual equipamento você precisa?"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="rounded-full !border-gray-300 hover:!border-locmaisTeal focus:!border-locmaisTeal"
                />
              </AutoComplete>
            </div>

            <Space>
              <Link href="https://wa.me/5571999454369?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento!" target="_blank" rel="noopener noreferrer">
                <Button type="primary" size="large" className="font-semibold bg-locmaisYellow hover:!bg-[#e5a50c] border-none text-white shadow-md">
                  Solicitar Orçamento
                </Button>
              </Link>
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
              <Dropdown menu={{ items: [
                { key: 'fornecedores', label: <Link href="/parceiros?aba=fornecedores" className="hover:text-locmaisTeal">Fornecedores</Link> },
                { key: 'clientes', label: <Link href="/parceiros?aba=clientes" className="hover:text-locmaisTeal">Clientes</Link> }
              ] }} placement="bottomLeft">
                <a onClick={(e) => e.preventDefault()} className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1 cursor-pointer">
                  Parceiros <DownOutlined className="text-[10px] text-locmaisTeal" />
                </a>
              </Dropdown>
              <Link href="/contato?assunto=trabalhe-conosco" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Trabalhe Conosco <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
              <Link href="/contato" className="hover:text-locmaisTeal text-gray-800 transition-colors flex items-center gap-1">Fale Conosco <ArrowRightOutlined className="text-[10px] text-locmaisTeal" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
