'use client';

import React from 'react';
import { Typography, Breadcrumb, Divider } from 'antd';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function TermosPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb className="mb-8" items={[
        { title: <Link href="/">Home</Link> },
        { title: 'Termos e Privacidade' }
      ]} />

      <Title level={1} className="!text-3xl !text-gray-800 !mb-8">Política de Privacidade e Termos de Uso</Title>
      
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
        <Typography>
          <Title level={3} className="!text-xl !text-locmaisTeal !mb-4">1. Informações Gerais</Title>
          <Paragraph className="text-gray-600 text-base mb-6">
            A presente Política de Privacidade e Termos de Uso contém informações sobre coleta, uso, armazenamento, tratamento e proteção dos dados pessoais dos usuários e visitantes do site da LOCMAIS, com a finalidade de demonstrar absoluta transparência quanto ao assunto e esclarecer a todos interessados sobre os tipos de dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas informações pessoais.
          </Paragraph>

          <Title level={3} className="!text-xl !text-locmaisTeal !mb-4">2. Coleta de Dados e Cookies</Title>
          <Paragraph className="text-gray-600 text-base mb-6">
            O site da LOCMAIS faz o uso de Cookies. Eles são arquivos de texto enviados pelo nosso servidor ao computador/smartphone do usuário para melhorar sua experiência de navegação e para fins estatísticos de visitação.
            <br/><br/>
            Ao continuar navegando em nosso site, você concorda com a utilização destas tecnologias para a coleta de dados de navegação anonimizados. Informações fornecidas voluntariamente através do formulário de "Fale Conosco" ou "Orçamento" serão utilizadas exclusivamente para o retorno do contato comercial solicitado, não sendo repassadas a terceiros.
          </Paragraph>

          <Title level={3} className="!text-xl !text-locmaisTeal !mb-4">3. Termos de Uso e Conteúdo</Title>
          <Paragraph className="text-gray-600 text-base mb-6">
            Todo o conteúdo presente neste site (textos, imagens, logotipos e catálogos) é de propriedade exclusiva da LOCMAIS ou de seus respectivos fabricantes (no caso de fotos de equipamentos). A reprodução, cópia ou distribuição do material sem autorização prévia é estritamente proibida.
            <br/><br/>
            Os dados técnicos e especificações dos equipamentos apresentados no site são referenciais baseados nos manuais dos fabricantes e podem sofrer alterações sem aviso prévio. Para dados precisos na locação, consulte nosso departamento comercial.
          </Paragraph>

          <Title level={3} className="!text-xl !text-locmaisTeal !mb-4">4. Contato e Dúvidas</Title>
          <Paragraph className="text-gray-600 text-base">
            Se você tiver dúvidas sobre esta Política de Privacidade, sobre os dados que mantemos sobre você ou se desejar exercer seus direitos de proteção de dados, por favor não hesite em nos contatar através do e-mail: <Text strong>comercial@locmais.com.br</Text>.
          </Paragraph>
        </Typography>
      </div>
      
      <Divider className="my-12" />
      <div className="text-center text-gray-500 text-sm">
        Última atualização: Março de 2026.
      </div>
    </div>
  );
}
