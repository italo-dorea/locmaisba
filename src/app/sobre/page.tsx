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
             <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Equipe LOCMAIS" className="w-full h-full object-cover" />
          </div>
        </Col>
        <Col xs={24} md={12} className="flex flex-col justify-center">
          <Title level={2} className="!text-locmaisTeal !mb-6">Nossa Missão</Title>
          <Paragraph className="text-base text-gray-600 leading-relaxed mb-6">
            Fornecer soluções eficientes em locação de equipamentos, contribuindo com a produtividade e segurança 
            nas obras de nossos clientes. Acreditamos que o sucesso do seu projeto 
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
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50 flex flex-col justify-center py-6">
            <SafetyOutlined className="text-4xl text-locmaisTeal mb-4" />
            <Title level={5} className="!text-gray-700 !m-0">Equipamentos Revisados</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50 flex flex-col justify-center py-6">
            <EnvironmentOutlined className="text-4xl text-locmaisTeal mb-4" />
            <Title level={5} className="!text-gray-700 !m-0">Cidades Atendidas</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50 flex flex-col justify-center py-6">
            <ThunderboltOutlined className="text-4xl text-locmaisTeal mb-4" />
            <Title level={5} className="!text-gray-700 !m-0">Agilidade na Entrega</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center h-full border-t-4 border-t-locmaisTeal bg-gray-50 flex flex-col justify-center py-6">
            <TeamOutlined className="text-4xl text-locmaisTeal mb-4" />
            <Title level={5} className="!text-gray-700 !m-0">Clientes Satisfeitos</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
