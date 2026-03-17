'use client';

import React, { Suspense } from 'react';
import { Typography, Card, Col, Row, Button, Tag, Empty } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, PRODUCTS, getProductsByCategory, getCategoryById } from '@/lib/mockData';

const { Title, Paragraph, Text } = Typography;

function HomeContent() {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get('categoria');

  const selectedCategory = getCategoryById(categoriaParam);
  const productsToDisplay = categoriaParam 
    ? getProductsByCategory(categoriaParam) 
    : PRODUCTS.slice(0, 4); // Featured products if no category

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Banner Hero */}
      {!categoriaParam && (
        <div className="w-full bg-locmaisTeal text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl">
              <Title level={1} className="!text-white !font-black !text-4xl md:!text-5xl mb-4">
                EQUIPAMENTOS DE ALTA PERFORMANCE PARA SUA OBRA
              </Title>
              <Paragraph className="text-gray-200 text-lg mb-8">
                Alugue as melhores marcas do mercado com garantia de manutenção, 
                suporte técnico e entrega rápida na sua obra.
              </Paragraph>
              <Button type="primary" size="large" className="bg-locmaisYellow hover:!bg-[#e5a50c] border-none font-bold text-white px-8 h-12 text-lg shadow-lg">
                Ver Catálogo Completo
              </Button>
            </div>
            {/* Decorative element */}
            <div className="hidden md:block w-72 h-72 bg-white/10 rounded-full border-4 border-locmaisYellow/30 flex items-center justify-center p-4 backdrop-blur-sm">
              <span className="text-6xl">🚧</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 w-full mt-12">
        {/* Categories Grid (if no specific category is selected) */}
        {!categoriaParam && (
          <div className="mb-16">
            <Title level={2} className="text-center !mb-10 text-locmaisTeal !font-bold">Explore por Categoria</Title>
            <Row gutter={[24, 24]} justify="center">
              {CATEGORIES.map(cat => (
                <Col xs={24} sm={12} md={8} lg={4} key={cat.id}>
                  <Link href={`/?categoria=${cat.id}`}>
                    <Card 
                      hoverable 
                      className="text-center h-full border-gray-200 hover:border-locmaisTeal transition-all shadow-sm hover:shadow-md flex items-center justify-center p-4 min-h-[100px]"
                    >
                      <Title level={5} className="!mb-0 text-gray-800 whitespace-nowrap">{cat.name}</Title>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <div>
              <Title level={2} className="!mb-1 !text-gray-800">
                {selectedCategory ? selectedCategory.name : 'Equipamentos em Destaque'}
              </Title>
              {selectedCategory && (
                <Text className="text-gray-500 text-lg">{selectedCategory.description}</Text>
              )}
            </div>
            {categoriaParam && (
              <Link href="/">
                <Button type="link" className="text-locmaisTeal font-medium">Limpar Filtro</Button>
              </Link>
            )}
          </div>

          {productsToDisplay.length > 0 ? (
            <Row gutter={[24, 32]}>
              {productsToDisplay.map(product => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Link href={`/produtos/${product.id}`}>
                    <Card
                      hoverable
                      cover={
                        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                           {/* Using static image loader pattern or unoptimized for export */}
                          <img alt={product.name} src={product.imageUrl} className="object-cover h-full w-full" />
                        </div>
                      }
                      className="h-full flex flex-col border-gray-200"
                      bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px' }}
                    >
                      <Tag color="cyan" className="w-fit mb-2 !border-none !bg-teal-50 !text-locmaisTeal font-semibold">{product.brand}</Tag>
                      <Title level={5} className="!mb-2 !text-gray-800 line-clamp-2">{product.name}</Title>
                      <Paragraph className="text-gray-500 text-sm flex-1 line-clamp-3 mb-4">
                        {product.shortDescription}
                      </Paragraph>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-locmaisTeal font-bold">
                        Ver Detalhes <ArrowRightOutlined />
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="py-20 flex justify-center w-full">
               <Empty description="Nenhum produto encontrado nesta categoria." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="w-full h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-locmaisTeal"></div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </main>
  );
}
