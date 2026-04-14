"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Upload, message, Card, Space, Popconfirm } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [form] = Form.useForm();

  // Login Handle
  const handleLogin = (values: any) => {
    if (values.user === 'locmais' && values.pass === 'locmais2026') {
      setCredentials(values);
      setIsAuthenticated(true);
      fetchProductsData();
      message.success('Login efetuado com sucesso!');
    } else {
      message.error('Usuário ou senha incorretos.');
    }
  };

  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'X-Admin-User': credentials.user,
      'X-Admin-Pass': credentials.pass
    };
  };

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      // In development or production, API is relative
      const res = await fetch('/api/products.json', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        message.warning('Arquivo JSON não encontrado ou vazio. Será criado no primeiro cadastro.');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Erro ao buscar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin.php?id=${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        message.success('Produto excluído.');
        fetchProductsData();
      } else {
        const data = await res.json();
        message.error(data.error || 'Erro ao excluir.');
      }
    } catch (error) {
       message.error('Erro de conexão.');
    }
  };

  const handleOpenModal = (record?: any) => {
    if (record) {
      setEditingProduct(record);
      form.setFieldsValue({
        ...record,
        // Adjust for Antd Upload format if there's already an image
        imageUpload: record.imagem ? [
          {
            uid: '-1',
            name: 'imagem.jpg',
            status: 'done',
            url: record.imagem,
          }
        ] : []
      });
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSave = async (values: any) => {
    // Handle image specifically
    let imageUrl = '';
    
    // Check if new image was uploaded
    const uploadField = values.imageUpload;
    if (uploadField && uploadField.length > 0) {
      const fileStatus = uploadField[0];
      if (fileStatus.response && fileStatus.response.url) {
        // Just uploaded via /api/upload.php
        imageUrl = fileStatus.response.url;
      } else if (fileStatus.url) {
        // Pre-existing image
        imageUrl = fileStatus.url;
      }
    }

    const payload = {
      ...values,
      imagem: imageUrl
    };

    // Remove Ant design specific extra fields
    delete payload.imageUpload;

    try {
      const url = '/api/admin.php' + (editingProduct ? `?id=${editingProduct.id}` : '');
      const method = editingProduct ? 'PUT' : 'POST';
      
      if (editingProduct) {
        payload.id = editingProduct.id;
      }

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        message.success(`Produto ${editingProduct ? 'atualizado' : 'cadastrado'}!`);
        setIsModalOpen(false);
        fetchProductsData();
      } else {
        const data = await res.json();
        message.error(data.error || 'Erro ao salvar o produto.');
      }
    } catch (error) {
      message.error('Erro de conexão ao salvar.');
    }
  };

  // Image upload custom request
  const customUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        headers: {
          'X-Admin-User': credentials.user,
          'X-Admin-Pass': credentials.pass
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        onSuccess(data);
      } else {
        const err = await res.json();
        onError(new Error(err.error));
        message.error(err.error || 'Erro no upload.');
      }
    } catch (err) {
      onError(err);
      message.error('Falha de conexão.');
    }
  };

  const uploadProps = {
    customRequest: customUpload,
    listType: "picture-card" as const,
    maxCount: 1,
  };

  const columns = [
    {
      title: 'Imagem',
      dataIndex: 'imagem',
      key: 'imagem',
      render: (text: string) => text ? <img src={text} alt="prod" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }} /> : 'Sem foto',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Categoria',
      dataIndex: 'Categoria',
      key: 'Categoria',
    },
    {
      title: 'Marca (Subdescrição)',
      dataIndex: 'subdescricao',
      key: 'subdescricao',
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
    },
    {
      title: 'Tipo Negócio',
      dataIndex: 'tipo_de_negocio',
      key: 'tipo_de_negocio',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleOpenModal(record)} />
          <Popconfirm title="Certeza que deseja excluir?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card title="Restrito - Administração Locmais" className="w-[400px]">
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item name="user" label="Usuário" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="pass" label="Senha" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-[#127184]">Entrar</Button>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Produtos</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => handleOpenModal()}
          className="bg-[#127184]"
        >
          Novo Produto
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="id" 
        loading={loading}
        className="bg-white rounded-lg shadow-sm"
      />

      <Modal
        title={editingProduct ? "Editar Produto" : "Novo Produto"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="nome" label="Nome do Equipamento" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="Categoria" label="Categoria (Ex: Andaimes, Linha Leve)" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="subdescricao" label="Marca / Subdescrição">
              <Input />
            </Form.Item>

            <Form.Item name="tipo_de_negocio" label="Tipo de Negócio (ex: Venda ou Locação)">
              <Select mode="tags" placeholder="Selecione ou digite">
                <Select.Option value="Locação">Locação</Select.Option>
                <Select.Option value="Venda">Venda</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="condicao" label="Condição (Se for venda)">
              <Select allowClear placeholder="Novo, Usado...">
                <Select.Option value="Novo">Novo</Select.Option>
                <Select.Option value="Usado">Usado</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="preco" label="Preço (Apenas número ex: 1540.00)">
              <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item name="Observacao_preco" label="Observação do Preço (Ex: Unidade, diária)">
              <Input />
            </Form.Item>
            
            <Form.Item name="observacoes_gerais" label="Observações Gerais">
              <Input />
            </Form.Item>
          </div>

          <Form.Item name="descricao" label="Descrição Completa">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="informacoes_tecnicas" label="Informações Técnicas (Separe por vírgulas)">
            <Input.TextArea rows={3} placeholder="110v, Potência 1500W, Peso 5kg" />
          </Form.Item>

          <Form.Item name="imageUpload" label="Imagem do Produto" valuePropName="fileList" getValueFromEvent={(e: any) => Array.isArray(e) ? e : e?.fileList}>
            <Upload {...uploadProps}>
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload da Foto</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="mt-4 flex justify-end">
             <Space>
               <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
               <Button type="primary" htmlType="submit" className="bg-[#127184]">Salvar Produto</Button>
             </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
