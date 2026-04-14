'use client';

import React from 'react';
import { Typography, Row, Col } from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function SobrePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        {/* Logo como título da página */}
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.png" alt="LOCMAIS" width={220} height={66} priority className="select-none" />
        </div>
        <Paragraph className="text-lg text-gray-500 max-w-3xl mx-auto" style={{ textAlign: 'justify' }}>
          Há mais de 10 anos, a LOCMAIS é referência no mercado de locação de equipamentos
          para construção civil, indústria e comércio em todo o estado da Bahia.
        </Paragraph>
      </div>

      <Row gutter={[48, 48]} className="mb-16">
        <Col xs={24} md={12}>
          <div className="relative h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-xl">
            <Image
              src="/images/image1.jpeg"
              alt="Equipe LOCMAIS"
              fill
              className="object-cover"
            />
          </div>
        </Col>
        <Col xs={24} md={12} className="flex flex-col justify-center">
          <Title level={2} className="!text-locmaisTeal !mb-6">Nossa Missão</Title>
          <Paragraph className="text-base text-gray-600 leading-relaxed mb-6" style={{ textAlign: 'justify' }}>
            Fornecer soluções eficientes em locação de equipamentos, contribuindo com a produtividade e segurança
            nas obras de nossos clientes. Acreditamos que o sucesso do seu projeto
            começa com a ferramenta certa na hora certa.
          </Paragraph>
          <Paragraph className="text-base text-gray-600 leading-relaxed" style={{ textAlign: 'justify' }}>
            Nossa frota é constantemente renovada e submetida a rigorosos processos de manutenção
            preventiva e corretiva, assegurando disponibilidade e confiabilidade.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
