'use client';

import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { SafetyOutlined, EnvironmentOutlined, ThunderboltOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function SobrePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <Title level={1} className="!text-4xl !text-gray-800 !mb-4">Sobre a LOCMAIS</Title>
        <Paragraph className="text-lg text-gray-500 max-w-3xl mx-auto">
          Há mais de 10 anos, a LOCMAIS é referência no mercado de locação de equipamentos 
          para construção civil, indústria e comércio em todo o estado da Bahia.
        </Paragraph>
      </div>

      <Row gutter={[48, 48]} className="mb-16">
        <Col xs={24} md={12}>
          <div className="relative h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-xl">
             <img src="https://placehold.co/800x600/eeeeee/888888?text=Nossa+Frota" alt="Frota LOCMAIS" className="w-full h-full object-cover" />
          </div>
        </Col>
        <Col xs={24} md={12} className="flex flex-col justify-center">
          <Title level={2} className="!text-locmaisTeal !mb-6">Nossa Missão</Title>
          <Paragraph className="text-base text-gray-600 leading-relaxed mb-6">
            Fornecer soluções eficientes em locação de equipamentos, garantindo a produtividade 
            e segurança nas obras de nossos clientes. Acreditamos que o sucesso do seu projeto 
            começa com a ferramenta certa na hora certa.
          </Paragraph>
          <Paragraph className="text-base text-gray-600 leading-relaxed">
            Nossa frota é constantemente renovada e submetida a rigorosos processos de manutenção 
            preventiva e corretiva, assegurando disponibilidade e confiabilidade.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mb-16">
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50">
            <SafetyOutlined className="text-4xl text-locmaisTeal mb-4" />
            <Statistic title="Equipamentos Revisados" value="100%" valueStyle={{ color: '#127184', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50">
            <EnvironmentOutlined className="text-4xl text-locmaisTeal mb-4" />
             <Statistic title="Cidades Atendidas" value={45} suffix="+" valueStyle={{ color: '#127184', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50">
            <ThunderboltOutlined className="text-4xl text-locmaisTeal mb-4" />
             <Statistic title="Agilidade na Entrega" value="24h" valueStyle={{ color: '#127184', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50">
            <TeamOutlined className="text-4xl text-locmaisTeal mb-4" />
             <Statistic title="Clientes Satisfeitos" value="5.000+" valueStyle={{ color: '#127184', fontWeight: 'bold' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
