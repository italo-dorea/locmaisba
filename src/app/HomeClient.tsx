'use client';

import React, { useState } from 'react';
import { Typography, Card, Col, Row, Button, Tag, Empty, Collapse } from 'antd';
import { ArrowRightOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product, Category } from '@/lib/api';

const { Title, Paragraph, Text } = Typography;

const FALLBACK_IMG = 'https://placehold.co/600x400/f1f5f9/64748b?text=Imagem+Indispon%C3%ADvel&font=montserrat';
const PRODUCTS_LIMIT = 6;

// Helpers de classificação por businessType
const isLocacao = (p: Product) => {
  const bt = (p.businessType || '').toLowerCase();
  return bt === '' || bt.includes('loca');
};

const isVenda = (p: Product) => {
  const bt = (p.businessType || '').toLowerCase();
  return bt.includes('venda');
};

// Card de produto reutilizável
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produtos/${product.id}`}>
      <Card
        hoverable
        cover={
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              alt={product.name}
              src={product.imageUrl}
              className="object-contain p-2 h-full w-full transition-transform duration-300 hover:scale-105"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
            />
          </div>
        }
        className="h-full flex flex-col border-gray-200"
        styles={{ body: { display: 'flex', flexDirection: 'column', flex: 1, padding: '16px' } }}
      >
        <Tag color="cyan" className="w-fit mb-2 !border-none !bg-teal-50 !text-locmaisTeal font-semibold">
          {product.brand}
        </Tag>
        <Title level={5} className="!mb-2 !text-gray-800 line-clamp-2">{product.name}</Title>
        <Paragraph
          className="text-gray-500 text-sm flex-1 line-clamp-3 mb-4"
          style={{ textAlign: 'justify' }}
        >
          {product.shortDescription}
        </Paragraph>
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-locmaisTeal font-bold">
          <span className="text-lg text-gray-800">
            {product.price && product.condition === 'Usado' ? `R$ ${product.price}` : 'Sob Consulta'}
          </span>
          <ArrowRightOutlined />
        </div>
      </Card>
    </Link>
  );
}

// Grid de produtos com limite e "Ver mais"
function ProductGrid({ products }: { products: Product[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, PRODUCTS_LIMIT);
  const hasMore = products.length > PRODUCTS_LIMIT;
  const remaining = products.length - PRODUCTS_LIMIT;

  return (
    <div>
      <Row gutter={[24, 32]}>
        {displayedProducts.map(product => (
          <Col xs={24} sm={12} md={8} lg={8} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-8">
          <Button
            type="default"
            onClick={() => setShowAll(!showAll)}
            className="!text-locmaisTeal !border-locmaisTeal hover:!bg-teal-50 font-semibold text-base h-10 px-8 rounded-full"
            icon={showAll ? <UpOutlined /> : <DownOutlined />}
          >
            {showAll ? 'Ver menos' : `Ver mais ${remaining} produto${remaining > 1 ? 's' : ''}`}
          </Button>
        </div>
      )}
    </div>
  );
}

// Label customizado do accordion
function AccordionLabel({
  title,
  accentColor,
  count,
  badge,
}: {
  title: string;
  accentColor: string;
  count: number;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className={`w-1.5 h-8 rounded-full ${accentColor}`} />
      <Title level={3} className="!mb-0 !text-gray-800 !text-lg md:!text-xl">
        {title}
      </Title>
      {badge}
      <Tag className="!ml-auto !bg-gray-100 !text-gray-600 !border-none font-medium !rounded-full">
        {count} {count === 1 ? 'produto' : 'produtos'}
      </Tag>
    </div>
  );
}

export default function HomeClient({
  initialProducts,
  initialCategories,
}: {
  initialProducts: Product[];
  initialCategories: Category[];
}) {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get('categoria');

  const selectedCategory = initialCategories.find(c => c.id === categoriaParam);

  // ── Modo: filtro de categoria ativo ──────────────────────────────────────
  const filteredByCategory = categoriaParam
    ? initialProducts.filter(p => p.categoryId === categoriaParam)
    : null;

  // ── Modo: home sem filtro – separar por business type ────────────────────
  const locacaoProducts    = initialProducts.filter(isLocacao);
  const vendaNovosProducts = initialProducts.filter(p => isVenda(p) && p.condition === 'Novo');
  const vendaUsadosProducts = initialProducts.filter(p => isVenda(p) && p.condition === 'Usado');

  // Montar itens do accordion dinamicamente (só exibe seções com produtos)
  const accordionItems = [
    locacaoProducts.length > 0 && {
      key: 'locacao',
      label: (
        <AccordionLabel
          title="Equipamentos para Locação"
          accentColor="bg-locmaisTeal"
          count={locacaoProducts.length}
        />
      ),
      children: <ProductGrid products={locacaoProducts} />,
    },
    vendaNovosProducts.length > 0 && {
      key: 'venda-novos',
      label: (
        <AccordionLabel
          title="Equipamentos à Venda — Novos"
          accentColor="bg-locmaisYellow"
          count={vendaNovosProducts.length}
          badge={<Tag color="gold" className="font-bold !text-xs">NOVO</Tag>}
        />
      ),
      children: <ProductGrid products={vendaNovosProducts} />,
    },
    vendaUsadosProducts.length > 0 && {
      key: 'venda-usados',
      label: (
        <AccordionLabel
          title="Equipamentos à Venda — Usados"
          accentColor="bg-gray-400"
          count={vendaUsadosProducts.length}
          badge={<Tag color="default" className="font-bold !text-xs">USADO</Tag>}
        />
      ),
      children: <ProductGrid products={vendaUsadosProducts} />,
    },
  ].filter(Boolean) as { key: string; label: React.ReactNode; children: React.ReactNode }[];

  // Primeiro item aberto por padrão
  const defaultActiveKey = accordionItems.length > 0 ? [accordionItems[0].key] : [];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Banner Hero (somente sem filtro ativo) */}
      {!categoriaParam && (
        <div
          className="w-full text-white relative overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        >
          {/* overlay teal */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl">
              <Title level={1} className="!text-white !font-black !text-4xl md:!text-5xl mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                EQUIPAMENTOS DE ALTA PERFORMANCE PARA SUA OBRA
              </Title>
              <Paragraph className="text-gray-200 text-lg mb-8">
                Alugue as melhores marcas do mercado com garantia de manutenção,
                suporte técnico e entrega rápida na sua obra.
              </Paragraph>
              <Link href="/portfolio" target="_blank" rel="noopener noreferrer">
                <Button
                  type="primary"
                  size="large"
                  className="bg-locmaisYellow hover:!bg-[#e5a50c] border-none font-bold text-white px-8 h-12 text-lg shadow-lg"
                >
                  Ver Catálogo Completo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 w-full mt-12">

        {/* ── Grid de categorias (somente sem filtro ativo) ── */}
        {!categoriaParam && (
          <div className="mb-16">
            <Title level={2} className="text-center !mb-10 text-locmaisTeal !font-bold">
              Explore por Categoria
            </Title>
            <Row gutter={[24, 24]} justify="center">
              {initialCategories.map(cat => (
                <Col xs={12} sm={8} md={6} lg={4} key={cat.id}>
                  <Link href={`/?categoria=${cat.id}`}>
                    <Card
                      hoverable
                      className="text-center h-full border-gray-200 hover:border-locmaisTeal transition-all shadow-sm hover:shadow-md flex items-center justify-center p-4 min-h-[100px]"
                    >
                      <Title level={5} className="!mb-0 text-gray-800 leading-tight" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>
                        {cat.name}
                      </Title>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* ── Modo: categoria selecionada ── */}
        {filteredByCategory && (
          <div>
            <div className="flex justify-between items-end mb-8 border-b pb-4">
              <div>
                <Title level={2} className="!mb-1 !text-gray-800">
                  {selectedCategory?.name ?? 'Categoria'}
                </Title>
                {selectedCategory && (
                  <Text className="text-gray-500 text-lg">{selectedCategory.description}</Text>
                )}
              </div>
              <Link href="/">
                <Button type="link" className="text-locmaisTeal font-medium">Limpar Filtro</Button>
              </Link>
            </div>

            {filteredByCategory.length > 0 ? (
              <Row gutter={[24, 32]}>
                {filteredByCategory.map(product => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="py-20 flex justify-center w-full">
                <Empty description="Nenhum produto encontrado nesta categoria." />
              </div>
            )}
          </div>
        )}

        {/* ── Modo: home sem filtro – Accordion por tipo de negócio ── */}
        {!categoriaParam && accordionItems.length > 0 && (
          <Collapse
            accordion
            defaultActiveKey={defaultActiveKey}
            expandIconPosition="end"
            className="product-accordion !bg-transparent !border-none"
            items={accordionItems}
          />
        )}
      </div>
    </div>
  );
}
