'use client';

import React, { Suspense } from 'react';
import { Typography, Tabs, Carousel, Row, Col } from 'antd';
import { useSearchParams } from 'next/navigation';

const { Title, Paragraph } = Typography;

function ParceirosContent() {
  const searchParams = useSearchParams();
  const abaKey = searchParams.get('aba') || 'clientes';

  // Placeholder arrays for the carousels
  const clientesImages = [
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+A",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+B",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+C",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+D",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+E",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Cliente+F",
  ];

  const fornecedoresImages = [
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Um",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Dois",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Tres",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Quatro",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Cinco",
    "https://placehold.co/200x100/f8fafc/94a3b8?text=Marca+Seis",
  ];

  const contentClientes = (
    <div className="animate-fadeIn">
      <Row gutter={[48, 48]} className="mb-16 mt-8 items-center">
        <Col xs={24} md={12}>
          <img src="https://imgs.search.brave.com/VmRUIhtWUXXwMVAA1tiKEpDwjvEDJvs_2devyvIvTbU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96ZW52/aWEuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzAzL0lN/QUdFTS1aRU5WSUEu/anBnPzE" alt="Clientes e Parcerias B2B Loc Mais" className="w-full h-96 object-cover rounded-xl shadow-lg border-2 border-white" />
        </Col>
        <Col xs={24} md={12}>
           <Title level={2} className="!text-locmaisTeal !mb-6">Construindo Juntos</Title>
           <Paragraph className="text-lg text-gray-600 leading-relaxed mb-6">
             Temos orgulho de construir relacionamentos duradouros e fornecer soluções que maximizam a eficiência dos projetos de nossos clientes em toda a região.
           </Paragraph>
           <Paragraph className="text-base text-gray-600">
             Nossa prioridade é atuar como um verdadeiro parceiro estratégico da sua empresa, fornecendo maquinários e equipamentos precisos, revisados e prontos para elevar o nível das suas operações. 
           </Paragraph>
        </Col>
      </Row>

      <div className="mb-16">
        <Title level={3} className="text-center !text-gray-800 !mb-8">Empresas que confiam na Loc Mais</Title>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
          <Carousel autoplay dots={false} slidesToShow={3} slidesToScroll={1}>
            {clientesImages.map((src, i) => (
              <div key={i} className="px-4">
                <div className="h-32 flex items-center justify-center border border-gray-50 rounded bg-gray-50/50 hover:bg-white transition-colors cursor-pointer group">
                  <img src={src} alt={`Logo Cliente ${i}`} className="h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );

  const contentFornecedores = (
    <div className="animate-fadeIn">
       <Row gutter={[48, 48]} className="mb-16 mt-8 items-center flex-row-reverse">
        <Col xs={24} md={12}>
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Fornecedores Loc Mais" className="w-full h-96 object-cover rounded-xl shadow-lg border-2 border-white" />
        </Col>
        <Col xs={24} md={12}>
           <Title level={2} className="!text-locmaisTeal !mb-6">Nossos Fornecedores</Title>
           <Paragraph className="text-lg text-gray-600 leading-relaxed mb-6">
             Uma frota de excelência só é possível graças a fabricantes e parceiros confiáveis. Trabalhamos lado a lado com as melhores marcas globais do mercado para garantir a máxima segurança, eficiência e robustez.
           </Paragraph>
           <Paragraph className="text-base text-gray-600">
             Buscamos sempre alinhar inovação e performance, aliando-nos a distribuidores que nos fornecem as mais avançadas tecnologias em equipamentos, peças e insumos, assegurando disponibilidade máxima para qualquer demanda.
           </Paragraph>
        </Col>
      </Row>

      <div className="mb-16">
        <Title level={3} className="text-center !text-gray-800 !mb-8">Grandes marcas lado a lado conosco</Title>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
          <Carousel autoplay dots={false} slidesToShow={3} slidesToScroll={1}>
            {fornecedoresImages.map((src, i) => (
              <div key={i} className="px-4">
                <div className="h-32 flex items-center justify-center border border-gray-50 rounded bg-gray-50/50 hover:bg-white transition-colors cursor-pointer group">
                  <img src={src} alt={`Logo Fornecedor ${i}`} className="h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
      <div className="text-center mb-12">
        <Title level={1} className="!text-4xl !text-gray-800 !mb-4">Nossos Parceiros</Title>
        <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto">
          Conheça aqueles que caminham conosco: as empresas que confiam no nosso trabalho e as grandes marcas que constroem nossa frota.
        </Paragraph>
      </div>

      <Tabs 
        defaultActiveKey={abaKey}
        centered
        size="large"
        className="parceiros-tabs"
        items={[
          { key: 'clientes', label: 'Nossos Clientes', children: contentClientes },
          { key: 'fornecedores', label: 'Nossos Fornecedores', children: contentFornecedores }
        ]}
      />
    </div>
  );
}

export default function ParceirosPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Aguarde, carregando parceiros...</div>}>
      <ParceirosContent />
    </Suspense>
  );
}
