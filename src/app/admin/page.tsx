"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Tabs, Table, Button, Modal, Form, Input, Select, Upload,
  message, Card, Space, Popconfirm, Tag, Typography
} from 'antd';
import {
  UploadOutlined, PlusOutlined, EditOutlined,
  DeleteOutlined, AppstoreOutlined, TagsOutlined
} from '@ant-design/icons';

const { Title } = Typography;

interface Category {
  id: string;
  name: string;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (user: string, pass: string) => void }) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (values.user === 'locmais' && values.pass === 'locmais2026') {
      onLogin(values.user, values.pass);
    } else {
      message.error('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-gray-100">
      <Card
        title={
          <div className="text-center py-2">
            <Title level={4} className="!mb-0 !text-[#127184]">⚙️ Administração Locmais</Title>
            <p className="text-gray-400 text-xs mt-1">Acesso restrito</p>
          </div>
        }
        className="w-[380px] shadow-lg rounded-xl"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="user" label="Usuário" rules={[{ required: true, message: 'Informe o usuário' }]}>
            <Input size="large" placeholder="locmais" />
          </Form.Item>
          <Form.Item name="pass" label="Senha" rules={[{ required: true, message: 'Informe a senha' }]}>
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block style={{ background: '#127184' }}>
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
}

// ─── Categories CRUD Tab ────────────────────────────────────────────────────
function CategoriesTab({ authHeaders }: { authHeaders: Record<string, string> }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories.json', { cache: 'no-store' });
      if (res.ok) setCategories(await res.json());
    } catch { message.error('Erro ao buscar categorias.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openModal = (cat?: Category) => {
    setEditing(cat || null);
    form.setFieldsValue(cat ? { name: cat.name } : { name: '' });
    setIsModalOpen(true);
  };

  const handleSave = async (values: any) => {
    const url = editing ? `/api/categories.php?id=${editing.id}` : '/api/categories.php';
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, name: values.name } : { name: values.name };

    try {
      const res = await fetch(url, { method, headers: { ...authHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (res.ok) {
        message.success(editing ? 'Categoria atualizada!' : 'Categoria criada!');
        setIsModalOpen(false);
        fetchCategories();
      } else {
        message.error(data.error || 'Erro ao salvar.');
      }
    } catch { message.error('Erro de conexão.'); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories.php?id=${id}`, { method: 'DELETE', headers: authHeaders });
      const data = await res.json();
      if (res.ok) { message.success('Categoria excluída.'); fetchCategories(); }
      else message.error(data.error || 'Erro ao excluir.');
    } catch { message.error('Erro de conexão.'); }
  };

  const columns = [
    { title: 'ID (Slug)', dataIndex: 'id', key: 'id', render: (v: string) => <Tag>{v}</Tag> },
    { title: 'Nome', dataIndex: 'name', key: 'name', className: 'font-medium' },
    {
      title: 'Ações', key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm title="Excluir esta categoria?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">{categories.length} categorias cadastradas</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ background: '#127184' }}>
          Nova Categoria
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="id" loading={loading} size="middle" />

      <Modal
        title={editing ? 'Editar Categoria' : 'Nova Categoria'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="mt-4">
          <Form.Item name="name" label="Nome da Categoria" rules={[{ required: true, message: 'Informe o nome' }]}>
            <Input size="large" placeholder="Ex: Equipamentos Elétricos" />
          </Form.Item>
          {editing && (
            <p className="text-xs text-gray-400 -mt-2 mb-4">
              ⚠️ O ID (slug) da categoria não será alterado, apenas o nome exibido.
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit" style={{ background: '#127184' }}>Salvar</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

// ─── Products CRUD Tab ──────────────────────────────────────────────────────
function ProductsTab({
  authHeaders,
  categories,
}: {
  authHeaders: Record<string, string>;
  categories: Category[];
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products.json', { cache: 'no-store' });
      if (res.ok) setProducts(await res.json());
      else setProducts([]);
    } catch { message.error('Erro ao buscar produtos.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openModal = (record?: any) => {
    setEditing(record || null);
    if (record) {
      form.setFieldsValue({
        ...record,
        imageUpload: record.imagem ? [{ uid: '-1', name: 'imagem', status: 'done', url: record.imagem }] : [],
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin.php?id=${id}`, { method: 'DELETE', headers: authHeaders });
      const data = await res.json();
      if (res.ok) { message.success('Produto excluído.'); fetchProducts(); }
      else message.error(data.error || 'Erro ao excluir.');
    } catch { message.error('Erro de conexão.'); }
  };

  const customUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        headers: { 'X-Admin-User': authHeaders['X-Admin-User'], 'X-Admin-Pass': authHeaders['X-Admin-Pass'] },
        body: formData,
      });
      if (res.ok) { onSuccess(await res.json()); }
      else { const err = await res.json(); onError(new Error(err.error)); message.error(err.error); }
    } catch (err) { onError(err); }
  };

  const handleSave = async (values: any) => {
    // Resolve image URL
    let imageUrl = '';
    const uploadField = values.imageUpload;
    if (uploadField && uploadField.length > 0) {
      const f = uploadField[0];
      imageUrl = f.response?.url || f.url || '';
    }

    const payload: any = { ...values, imagem: imageUrl };
    delete payload.imageUpload;

    if (editing) payload.id = editing.id;

    const url = editing ? `/api/admin.php?id=${editing.id}` : '/api/admin.php';
    const method = editing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        message.success(editing ? 'Produto atualizado!' : 'Produto cadastrado!');
        setIsModalOpen(false);
        fetchProducts();
      } else {
        message.error(data.error || 'Erro ao salvar.');
      }
    } catch { message.error('Erro de conexão.'); }
  };

  const columns = [
    {
      title: 'Imagem', dataIndex: 'imagem', key: 'imagem', width: 70,
      render: (v: string) => v
        ? <img src={v} alt="prod" className="w-12 h-12 object-cover rounded" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        : <span className="text-gray-300 text-xs">Sem foto</span>,
    },
    { title: 'Nome', dataIndex: 'nome', key: 'nome', ellipsis: true },
    { title: 'Categoria', dataIndex: 'Categoria', key: 'Categoria', render: (v: string) => <Tag color="cyan">{v}</Tag> },
    { title: 'Tipo', dataIndex: 'tipo_de_negocio', key: 'tipo_de_negocio', ellipsis: true },
    {
      title: 'Ações', key: 'actions', width: 100,
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm title="Excluir este produto?" onConfirm={() => handleDelete(String(record.id))}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Category options for Select
  const categoryOptions = categories.map(c => ({ label: c.name, value: c.name }));

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">{products.filter(p => p.nome).length} produtos cadastrados</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ background: '#127184' }}>
          Novo Produto
        </Button>
      </div>

      <Table columns={columns} dataSource={products.filter(p => p.nome)} rowKey="id" loading={loading} size="middle" scroll={{ x: 600 }} />

      <Modal
        title={editing ? `Editar: ${editing.nome}` : 'Novo Produto'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={820}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="nome" label="Nome do Equipamento" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="Categoria" label="Categoria" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Selecione uma categoria"
                options={categoryOptions}
                filterOption={(input, option) =>
                  (option?.label as string).toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item name="subdescricao" label="Marca / Subdescrição">
              <Input />
            </Form.Item>

            <Form.Item name="tipo_de_negocio" label="Tipo de Negócio">
              <Select placeholder="Selecione">
                <Select.Option value="locacao">Locação</Select.Option>
                <Select.Option value="venda">Venda</Select.Option>
                <Select.Option value="venda e locacao">Venda e Locação</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="condicao" label="Condição">
              <Select allowClear placeholder="Selecione">
                <Select.Option value="novo">Novo</Select.Option>
                <Select.Option value="usado">Usado</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="preco" label="Preço (ex: 1540.00)">
              <Input type="number" step="0.01" min="0" />
            </Form.Item>

            <Form.Item name="Observacao_preco" label="Obs. do Preço (ex: /diária)">
              <Input />
            </Form.Item>

            <Form.Item name="observacoes_gerais" label="Observações Gerais">
              <Input />
            </Form.Item>
          </div>

          <Form.Item name="descricao" label="Descrição Completa">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="informacoes_tecnicas" label="Informações Técnicas (separe por vírgula)">
            <Input.TextArea rows={3} placeholder="110v, Potência 1500W, Peso 5kg" />
          </Form.Item>

          <Form.Item
            name="imageUpload"
            label="Imagem do Produto"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload customRequest={customUpload} listType="picture-card" maxCount={1} accept="image/*">
              <div>
                <UploadOutlined />
                <div className="mt-1 text-xs">Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit" style={{ background: '#127184' }}>
              Salvar Produto
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

// ─── Main Admin Page ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [credentials, setCredentials] = useState<{ user: string; pass: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const authHeaders = credentials
    ? { 'X-Admin-User': credentials.user, 'X-Admin-Pass': credentials.pass }
    : {};

  // Load categories once authenticated (used by Products tab Select)
  useEffect(() => {
    if (!credentials) return;
    fetch('/api/categories.json', { cache: 'no-store' })
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, [credentials]);

  if (!credentials) {
    return <LoginScreen onLogin={(user, pass) => setCredentials({ user, pass })} />;
  }

  const tabItems = [
    {
      key: 'products',
      label: <span><AppstoreOutlined /> Produtos</span>,
      children: <ProductsTab authHeaders={authHeaders as Record<string, string>} categories={categories} />,
    },
    {
      key: 'categories',
      label: <span><TagsOutlined /> Categorias</span>,
      children: (
        <CategoriesTab
          authHeaders={authHeaders as Record<string, string>}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div>
          <Title level={4} className="!mb-0 !text-[#127184]">⚙️ Painel Administrativo</Title>
          <span className="text-gray-400 text-xs">Locmais — Gerenciamento de Produtos</span>
        </div>
        <Button size="small" danger onClick={() => setCredentials(null)}>Sair</Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Card className="shadow-sm rounded-xl">
          <Tabs defaultActiveKey="products" items={tabItems} size="large" />
        </Card>
      </div>
    </div>
  );
}
