'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Typography, Row, Col, Form, Input, Button, Card, notification, Upload } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

function ContactContent() {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const [isTrabalheConosco, setIsTrabalheConosco] = useState(false);

  useEffect(() => {
    const assuntoStr = searchParams.get('assunto');
    if (assuntoStr === 'trabalhe-conosco') {
      setIsTrabalheConosco(true);
      form.setFieldsValue({
        subject: 'Trabalhe Conosco / Envio de Currículo'
      });
    } else {
      setIsTrabalheConosco(false);
      form.setFieldsValue({
        subject: ''
      });
    }
  }, [searchParams, form]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('form-name', 'contato');
      formData.append('name', values.name || '');
      formData.append('phone', values.phone || '');
      formData.append('email', values.email || '');
      formData.append('subject', values.subject || '');
      formData.append('message', values.message || '');

      // Anexar arquivo se for Trabalhe Conosco
      if (isTrabalheConosco && values.curriculo && values.curriculo.length > 0) {
        const file = values.curriculo[0].originFileObj;
        if (file) {
          formData.append('curriculo', file);
        }
      }

      const response = await fetch('/', {
        method: 'POST',
        body: formData,
        // O Netlify reconhece o body como multipart/form-data automaticamente quando usamos FormData nativo
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }

      notification.success({
        message: 'Mensagem Enviada!',
        description: 'Recebemos seu contato. Nossa equipe retornará em breve.',
        placement: 'bottomRight',
      });
      form.resetFields();
      if (isTrabalheConosco) {
        form.setFieldsValue({ subject: 'Trabalhe Conosco / Envio de Currículo' });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Erro no Envio',
        description: 'Ocorreu um erro ao enviar a mensagem. Tente novamente.',
        placement: 'bottomRight',
      });
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Title level={1} className="!text-4xl !text-gray-800 !mb-4">
          {isTrabalheConosco ? 'Trabalhe Conosco' : 'Fale Conosco'}
        </Title>
        <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto">
          {isTrabalheConosco
            ? 'Faça parte da nossa equipe! Preencha os dados abaixo e anexe seu currículo.'
            : 'Precisa de um orçamento especial, tem dúvidas técnicas ou quer trabalhar conosco? Envie sua mensagem e responderemos o mais rápido possível.'}
        </Paragraph>
      </div>

      <Row gutter={[48, 48]}>
        <Col xs={24} md={10}>
          <div className="bg-locmaisTeal rounded-xl p-8 text-white h-full shadow-lg">
            <Title level={3} className="!text-white !mb-8">Informações de Contato</Title>

            <div className="flex items-start mb-8">
              <EnvironmentOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">Unidades</Text>
                <div className="mb-4">
                  <Text className="text-locmaisYellow font-semibold block">Sede (Bahia)</Text>
                  <Text className="text-gray-300">
                    <a href="https://maps.google.com/?q=Av.+Ayrton+Senna,+831+-+Petrópolis,+Dias+d'Ávila+-+BA,+42850-000" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                      Av. Ayrton Senna, n° 831, SL 01<br />
                      Petrópolis, Dias d'Ávila/BA<br />
                      CEP: 42.850-000
                    </a>
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex items-start mb-8">
              <PhoneOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">Telefones</Text>
                <Text className="text-gray-300 block">(71) 3625-6693 (Fixo)</Text>
                <Text className="text-gray-300 block">(71) 99945-4369 (WhatsApp Comercial 1)</Text>
                <Text className="text-gray-300 block">(71) 9256-3118 (WhatsApp Comercial 2)</Text>
              </div>
            </div>

            <div className="flex items-start">
              <MailOutlined className="text-2xl mr-4 text-locmaisYellow mt-1" />
              <div>
                <Text className="text-gray-200 block text-lg font-bold mb-1">E-mail</Text>
                <Text className="text-gray-300 block">comercial@locmaisba.com.br</Text>
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
                <Input size="large" placeholder="Ex: Solicitação de Orçamento - Geradores" readOnly={isTrabalheConosco} disabled={isTrabalheConosco} />
              </Form.Item>

              {isTrabalheConosco && (
                <Form.Item
                  name="curriculo"
                  label="Anexe seu Currículo (PDF, DOC)"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true, message: 'Por favor, anexe o seu currículo.' }]}
                >
                  <Upload
                    name="curriculo"
                    beforeUpload={() => false}
                    maxCount={1}
                    accept=".pdf,.doc,.docx"
                  >
                    <Button icon={<UploadOutlined />} size="large">Clique para selecionar o arquivo</Button>
                  </Upload>
                </Form.Item>
              )}

              <Form.Item
                name="message"
                label={isTrabalheConosco ? "Apresentação / Resumo Profissional" : "Mensagem"}
                rules={[{ required: true, message: 'Por favor, escreva sua mensagem.' }]}
              >
                <TextArea rows={6} placeholder={isTrabalheConosco ? "Fale um pouco sobre você..." : "Detalhe sua necessidade..."} />
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

      {/* Formulário oculto para o Netlify detectar os campos no build */}
      <form
        name="contato"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
        style={{ display: 'none' }}
      >
        <input type="text" name="name" />
        <input type="text" name="phone" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
        <input type="file" name="curriculo" />
      </form>
    </div>
  );
}

export default function ContatoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Carregando formulário...</div>}>
      <ContactContent />
    </Suspense>
  );
}
