'use client';

import React, { useState } from 'react';
import { Layout, Input, Button, Dropdown, Space, Typography, MenuProps, AutoComplete, Drawer, Collapse, CollapseProps } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, DownOutlined, ArrowRightOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export type MenuProduct = { id: string; name: string };
export type MenuCategory = { key: string; label: string; products: MenuProduct[] };

export const Header = ({ 
  locacaoCategories, 
  vendaNovosCategories,
  vendaUsadosCategories,
  allProducts
}: { 
  locacaoCategories: MenuCategory[]; 
  vendaNovosCategories: MenuCategory[]; 
  vendaUsadosCategories: MenuCategory[]; 
  allProducts: MenuProduct[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === '/portfolio') return null;

  const categoryItems: MenuProps['items'] = locacaoCategories.length > 0 ? locacaoCategories.map(c => ({
    key: c.key,
    label: <Link href={`/?categoria=${c.key}`} className="font-medium hover:text-locmaisTeal">{c.label}</Link>,
    children: c.products.map(p => ({
      key: `loc-${p.id}`,
      label: <Link href={`/produtos/${p.id}`} className="hover:text-locmaisTeal">{p.name}</Link>
    }))
  })) : [{ key: 'empty-loc', label: <span className="text-gray-400">Nenhum equipamento</span> }];

  const buildVendaChildren = (categories: MenuCategory[], prefix: string): MenuProps['items'] => {
    return categories.length > 0 ? categories.map(c => ({
      key: `${prefix}-${c.key}`,
      label: <Link href={`/?categoria=${c.key}`} className="font-medium text-gray-800 hover:text-locmaisTeal">{c.label}</Link>,
      children: c.products.map(p => ({
        key: `${prefix}-prod-${p.id}`,
        label: <Link href={`/produtos/${p.id}`} className="hover:text-locmaisTeal">{p.name}</Link>
      }))
    })) : [{ key: `empty-${prefix}`, label: <span className="text-gray-400">Nenhum produto</span> }];
  };

  const vendaItems: MenuProps['items'] = [
    {
      key: 'venda-novos',
      label: <span className="font-bold text-locmaisTeal text-sm">Novos</span>,
      children: buildVendaChildren(vendaNovosCategories, 'novos')
    },
    {
      key: 'venda-usados',
      label: <span className="font-bold text-locmaisTeal text-sm">Usados</span>,
      children: buildVendaChildren(vendaUsadosCategories, 'usados')
    }
  ];

  // Mobile accordion items
  const mobileAccordionItems: CollapseProps['items'] = [
    {
      key: 'locacao',
      label: <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">Equipamentos para Locação</span>,
      children: (
        <div className="flex flex-col gap-3">
          {locacaoCategories.length > 0 ? locacaoCategories.map(c => (
            <div key={c.key}>
              <Link
                href={`/?categoria=${c.key}`}
                className="font-semibold text-locmaisTeal block mb-1"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
              {c.products.map(p => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.id}`}
                  className="text-gray-600 block pl-3 text-sm py-0.5 hover:text-locmaisTeal"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )) : <span className="text-gray-400 text-sm">Nenhum equipamento</span>}
        </div>
      )
    },
    {
      key: 'venda-novos',
      label: <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">Produtos à Venda – Novos</span>,
      children: (
        <div className="flex flex-col gap-3">
          {vendaNovosCategories.length > 0 ? vendaNovosCategories.map(c => (
            <div key={c.key}>
              <Link
                href={`/?categoria=${c.key}`}
                className="font-semibold text-locmaisTeal block mb-1"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
              {c.products.map(p => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.id}`}
                  className="text-gray-600 block pl-3 text-sm py-0.5 hover:text-locmaisTeal"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )) : <span className="text-gray-400 text-sm">Nenhum produto</span>}
        </div>
      )
    },
    {
      key: 'venda-usados',
      label: <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">Produtos à Venda – Usados</span>,
      children: (
        <div className="flex flex-col gap-3">
          {vendaUsadosCategories.length > 0 ? vendaUsadosCategories.map(c => (
            <div key={c.key}>
              <Link
                href={`/?categoria=${c.key}`}
                className="font-semibold text-locmaisTeal block mb-1"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
              {c.products.map(p => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.id}`}
                  className="text-gray-600 block pl-3 text-sm py-0.5 hover:text-locmaisTeal"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )) : <span className="text-gray-400 text-sm">Nenhum produto</span>}
        </div>
      )
    }
  ];

  return (
    <div className="w-full flex justify-center bg-white shadow-sm border-b border-gray-100 z-50 sticky top-0">
      <div className="w-full flex flex-col">
        {/* Topbar: Contatos */}
        <div className="flex justify-between items-center py-1 px-4 md:px-8 lg:px-12 text-xs bg-gray-50 text-gray-600 border-b border-gray-200">
          <Space className="w-full max-w-7xl mx-auto flex justify-between">
            <Space>
              <span className="hidden md:flex items-center gap-1"><PhoneOutlined /> (71) 3625-6693 | (71) 99945-4369 | (71) 99256-3118</span>
              <span className="flex items-center gap-1"><MailOutlined /> comercial@locmaisba.com.br</span>
            </Space>
            <Space>
              <Link href="/sobre" className="hover:opacity-75 transition-opacity flex items-center gap-1">
                <span>Sobre a</span>
                <Image src="/images/logo.png" alt="LOCMAIS" width={72} height={22} className="select-none" />
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/contato" className="hidden md:inline hover:text-locmaisTeal transition-colors">Fale Conosco</Link>
            </Space>
          </Space>
        </div>

        {/* Main Header: Logo + Busca + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 lg:px-12 gap-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <Link href="/" className="flex items-center">
                <Image src="/images/logo.png" alt="Locmais Logo" width={180} height={55} priority className="select-none" />
              </Link>
              {/* Hamburguer mobile */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:border-locmaisTeal hover:text-locmaisTeal transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <MenuOutlined />
              </button>
            </div>

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

        {/* Bottom Nav: Links (Desktop only) */}
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
                { key: 'clientes', label: <Link href="/parceiros?aba=clientes" className="hover:text-locmaisTeal">Clientes</Link> },
                { key: 'fornecedores', label: <Link href="/parceiros?aba=fornecedores" className="hover:text-locmaisTeal">Fornecedores</Link> }
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

      {/* Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width="85%"
        styles={{ body: { padding: 0 } }}
        closeIcon={false}
        title={
          <div className="flex justify-between items-center py-2">
            <Image src="/images/logo.png" alt="Locmais Logo" width={130} height={40} />
            <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-locmaisTeal">
              <CloseOutlined style={{ fontSize: 18 }} />
            </button>
          </div>
        }
      >
        {/* Categories accordion */}
        <Collapse
          items={mobileAccordionItems}
          bordered={false}
          className="!rounded-none"
          style={{ background: 'white' }}
          expandIconPosition="end"
        />

        {/* Static links */}
        <div className="border-t border-gray-100 mt-4 pt-4 px-4 flex flex-col gap-4">
          <Link href="/sobre" className="text-gray-700 font-semibold hover:text-locmaisTeal" onClick={() => setMobileOpen(false)}>
            Institucional
          </Link>
          <Link href="/parceiros" className="text-gray-700 font-semibold hover:text-locmaisTeal" onClick={() => setMobileOpen(false)}>
            Parceiros
          </Link>
          <Link href="/contato?assunto=trabalhe-conosco" className="text-gray-700 font-semibold hover:text-locmaisTeal" onClick={() => setMobileOpen(false)}>
            Trabalhe Conosco
          </Link>
          <Link href="/contato" className="text-gray-700 font-semibold hover:text-locmaisTeal" onClick={() => setMobileOpen(false)}>
            Fale Conosco
          </Link>
        </div>

        {/* Contact info */}
        <div className="border-t border-gray-100 mt-4 pt-4 px-4 pb-6">
          <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Contato</p>
          <p className="text-sm text-gray-600 mb-1"><PhoneOutlined className="mr-2 text-locmaisTeal" /> (71) 3625-6693</p>
          <p className="text-sm text-gray-600 mb-1"><PhoneOutlined className="mr-2 text-locmaisTeal" /> (71) 99945-4369</p>
          <p className="text-sm text-gray-600 mb-1"><PhoneOutlined className="mr-2 text-locmaisTeal" /> (71) 99256-3118</p>
          <p className="text-sm text-gray-600"><MailOutlined className="mr-2 text-locmaisTeal" /> comercial@locmaisba.com.br</p>
        </div>
      </Drawer>
    </div>
  );
};
