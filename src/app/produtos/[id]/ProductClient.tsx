'use client';

import React from 'react';
import { Typography, Row, Col, Button, Tag, Divider, Breadcrumb } from 'antd';
import { CheckCircleFilled, FilePdfOutlined, SafetyCertificateOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Product } from '@/lib/api';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export function ProductClient({ product }: { product: Product }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-8" items={[
        { title: <Link href="/">Home</Link> },
        { title: <Link href={`/?categoria=${product.categoryId}`}>{product.categoryName}</Link> },
        { title: product.name }
      ]} />

      <Row gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative aspect-[4/3]">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain p-4 bg-white"
            />
            <div className="absolute top-4 left-4">
              <Tag color="cyan" className="!bg-white !text-locmaisTeal font-bold px-3 py-1 shadow-sm border-gray-200">
                {product.brand}
              </Tag>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Title level={1} className="!text-3xl !font-bold !text-gray-800 !mb-2">
            {product.name}
          </Title>
          <Text className="text-gray-500 text-lg block mb-2" style={{ textAlign: 'justify', display: 'block' }}>{product.shortDescription}</Text>
          {product.price && product.condition === 'Usado' && (
            <div className="mb-4">
               <Text className="text-3xl font-bold text-locmaisTeal">R$ {product.price}</Text>
               {product.priceObservation && <Text className="block text-gray-500 text-sm mt-1">{product.priceObservation}</Text>}
            </div>
          )}
          
          <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100 mb-8 max-w-sm">
            <Title level={5} className="!uppercase !text-xs !tracking-widest !text-gray-500 !mb-4">Solicite uma Cotação</Title>
            <a 
              href={`https://wa.me/5571999454369?text=${encodeURIComponent(`Olá! Gostaria de cotar o equipamento: ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button size="large" className="w-full border-2 border-locmaisTeal text-locmaisTeal hover:!bg-teal-50 hover:!border-locmaisTeal hover:!text-locmaisTeal font-bold shadow-sm flex items-center justify-center gap-2">
                <WhatsAppOutlined className="text-xl" />
                Cotar Este Equipamento
              </Button>
            </a>
          </div>

          <Divider />

          <Title level={4} className="!text-gray-800 !mb-4">Descrição Geral</Title>
          <Paragraph className="text-base text-gray-600 mb-8 leading-relaxed" style={{ textAlign: 'justify' }}>
            {product.fullDescription}
          </Paragraph>

          <Title level={4} className="!text-gray-800 !mb-4">Especificações e Vantagens</Title>
          <div className="flex flex-col gap-3 mb-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircleFilled className="text-locmaisTeal mt-1 mr-3" />
                <Text className="text-base font-medium text-gray-700">{feature}</Text>
              </div>
            ))}
          </div>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <a 
                href="/portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded text-center hover:bg-gray-50 cursor-pointer transition-colors block"
              >
                <FilePdfOutlined className="text-2xl text-red-500 mb-2" />
                <Text className="font-semibold text-gray-700">Portfólio de Equipamentos</Text>
              </a>
            </Col>
            <Col span={12}>
              <a href="/sobre" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded text-center hover:bg-gray-50 cursor-pointer transition-colors block">
                <SafetyCertificateOutlined className="text-2xl text-locmaisTeal mb-2" />
                <Text className="font-semibold text-gray-700">Normas NRs</Text>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
