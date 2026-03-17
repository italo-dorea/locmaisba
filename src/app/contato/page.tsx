'use client';

import React from 'react';
import { Typography, Row, Col, Form, Input, Button, Card, notification } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ContatoPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Aqui seria implementada a chamada para EmailJS, Formspree ou outro serviço Client-Side.
    console.log('Form values:', values);
    notification.success({
      message: 'Mensagem Enviada!',
      description: 'Recebemos seu contato. Nossa equipe retornará em breve.',
      placement: 'bottomRight',
    });
    form.resetFields();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Title level={1} className="!text-4xl !text-gray-800 !mb-4">Fale Conosco</Title>
        <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto">
          Precisa de um orçamento especial, tem dúvidas técnicas ou quer trabalhar conosco? 
          Envie sua mensagem e responderemos o mais rápido possível.
        </Paragraph>
      </div>

      <Row gutter={[48, 48]}>
        <Col xs={24} md={10}>
          <div className="bg-locmaisTeal rounded-xl p-8 text-white h-full shadow-lg">
            <Title level={3} className="!text-white !mb-8">Informações de Contato</Title>
            
            <div className="flex items-start mb-8">
              <EnvironmentOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">Endereço Principal</Text>
                <Text className="text-gray-300">
                  Av. das Indústrias, 1000<br/>
                  Galpão 5 - Distrito Industrial<br/>
                  Salvador - BA, 40000-000
                </Text>
              </div>
            </div>

            <div className="flex items-start mb-8">
              <PhoneOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">Telefones</Text>
                <Text className="text-gray-300 block">(71) 3333-4444 (Fixo)</Text>
                <Text className="text-gray-300 block">(71) 99999-8888 (WhatsApp)</Text>
              </div>
            </div>

            <div className="flex items-start">
              <MailOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">E-mail</Text>
                <Text className="text-gray-300 block">comercial@locmais.com.br</Text>
                <Text className="text-gray-300 block">suporte@locmais.com.br</Text>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} md={14}>
          <Card className="shadow-sm border-gray-200" bodyStyle={{ padding: '32px' }}>
            <Title level={3} className="!text-gray-800 !mb-6">Envie sua Mensagem</Title>
            <Form 
              layout="vertical" 
              form={form}
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    name="name" 
                    label="Nome Completo" 
                    rules={[{ required: true, message: 'Por favor, insira seu nome.' }]}
                  >
                    <Input size="large" placeholder="Seu nome" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    name="phone" 
                    label="Telefone / WhatsApp" 
                    rules={[{ required: true, message: 'Por favor, insira seu telefone.' }]}
                  >
                    <Input size="large" placeholder="(00) 00000-0000" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item 
                name="email" 
                label="E-mail" 
                rules={[
                  { required: true, message: 'Por favor, insira seu e-mail.' },
                  { type: 'email', message: 'Insira um e-mail válido.' }
                ]}
              >
                <Input size="large" placeholder="seu.email@empresa.com.br" />
              </Form.Item>

              <Form.Item 
                name="subject" 
                label="Assunto" 
                rules={[{ required: true, message: 'Qual o assunto da mensagem?' }]}
              >
                <Input size="large" placeholder="Ex: Solicitação de Orçamento - Geradores" />
              </Form.Item>

              <Form.Item 
                name="message" 
                label="Mensagem" 
                rules={[{ required: true, message: 'Por favor, escreva sua mensagem.' }]}
              >
                <TextArea rows={6} placeholder="Detalhe sua necessidade..." />
              </Form.Item>

              <Form.Item className="mb-0 text-right">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  icon={<SendOutlined />}
                  className="bg-locmaisYellow hover:!bg-[#e5a50c] border-none font-bold text-white px-8"
                >
                  Enviar Mensagem
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
