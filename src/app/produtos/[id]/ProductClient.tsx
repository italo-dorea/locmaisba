'use client';

import React from 'react';
import { Typography, Row, Col, Button, Tag, Divider, Breadcrumb } from 'antd';
import { CheckCircleFilled, FilePdfOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Product, getCategoryById } from '@/lib/mockData';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export function ProductClient({ product }: { product: Product }) {
  const category = getCategoryById(product.categoryId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-8" items={[
        { title: <Link href="/">Home</Link> },
        { title: <Link href={`/?categoria=${category?.id}`}>{category?.name}</Link> },
        { title: product.name }
      ]} />

      <Row gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative aspect-[4/3]">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Tag color="cyan" className="!bg-white !text-locmaisTeal font-bold px-3 py-1 shadow-sm border-gray-200">
                {product.brand}
              </Tag>
            </div>
          </div>
          <div className="flex mt-4 gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded cursor-pointer border-2 border-locmaisTeal/50 overflow-hidden">
               <img src={product.imageUrl} alt="thumb" className="w-full h-full object-cover"/>
            </div>
            <div className="w-24 h-24 bg-gray-100 rounded cursor-not-allowed hidden md:block"></div>
            <div className="w-24 h-24 bg-gray-100 rounded cursor-not-allowed hidden md:block"></div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Title level={1} className="!text-3xl !font-bold !text-gray-800 !mb-2">
            {product.name}
          </Title>
          <Text className="text-gray-500 text-lg block mb-6">{product.shortDescription}</Text>
          
          <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100 mb-8 max-w-sm">
            <Title level={5} className="!uppercase !text-xs !tracking-widest !text-gray-500 !mb-4">Solicite uma Cotação</Title>
            <Button type="primary" size="large" className="w-full bg-locmaisYellow hover:!bg-[#e5a50c] border-none font-bold text-white shadow-md mb-3">
              Alugar Este Equipamento
            </Button>
            <Button size="large" className="w-full border-locmaisTeal text-locmaisTeal hover:!bg-teal-50 hover:!border-locmaisTeal font-semibold">
              Falar Via WhatsApp
            </Button>
          </div>

          <Divider />

          <Title level={4} className="!text-gray-800 !mb-4">Descrição Geral</Title>
          <Paragraph className="text-base text-gray-600 mb-8 leading-relaxed">
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
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <FilePdfOutlined className="text-2xl text-red-500 mb-2" />
                <Text className="font-semibold text-gray-700">Baixar Manual</Text>
              </div>
            </Col>
            <Col span={12}>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <SafetyCertificateOutlined className="text-2xl text-locmaisTeal mb-2" />
                <Text className="font-semibold text-gray-700">Normas NRs</Text>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
