"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Tabs, Table, Button, Modal, Form, Input, Select, Upload,
  message, Card, Space, Popconfirm, Tag, Typography, Drawer, Spin, Empty, Tooltip, Badge
} from 'antd';
import {
  UploadOutlined, PlusOutlined, EditOutlined,
  DeleteOutlined, AppstoreOutlined, TagsOutlined, CloudSyncOutlined,
  PictureOutlined, CheckCircleFilled
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
function CategoriesTab({ 
  categories, 
  setCategories,
  setPendingChanges 
}: { 
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setPendingChanges: (v: boolean) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const openModal = (cat?: Category) => {
    setEditing(cat || null);
    form.setFieldsValue(cat ? { name: cat.name } : { name: '' });
    setIsModalOpen(true);
  };

  const handleSave = async (values: any) => {
    if (editing) {
      setCategories(cats => cats.map(c => c.id === editing.id ? { ...c, name: values.name } : c));
      message.success('Categoria atualizada localmente!');
    } else {
      const newId = values.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-');
      setCategories(cats => [...cats, { id: newId, name: values.name }]);
      message.success('Categoria criada localmente!');
    }
    setPendingChanges(true);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories(cats => cats.filter(c => c.id !== id));
    setPendingChanges(true);
    message.success('Categoria excluída localmente.');
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
        <span className="text-gray-500 text-sm">{categories.length} categorias em memória</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ background: '#127184' }}>
          Nova Categoria
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="id" size="middle" />

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
            <Button type="primary" htmlType="submit" style={{ background: '#127184' }}>Salvar na Memória</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

// ─── Products CRUD Tab ──────────────────────────────────────────────────────
function ProductsTab({
  products,
  setProducts,
  categories,
  setPendingChanges,
  setPendingImages
}: {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  categories: Category[];
  setPendingChanges: (v: boolean) => void;
  setPendingImages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  // ── Gallery state ──
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<{name: string; url: string}[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  const fetchGalleryImages = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch('/api/images');
      if (res.ok) setGalleryImages(await res.json());
    } catch { message.error('Erro ao carregar galeria.'); }
    finally { setGalleryLoading(false); }
  };

  const openGallery = () => {
    const currentImg = form.getFieldValue('imageUpload');
    if (currentImg && currentImg.length > 0) {
      setSelectedGalleryImage(currentImg[0]?.url || currentImg[0]?.response?.url || null);
    } else {
      setSelectedGalleryImage(null);
    }
    setGalleryOpen(true);
    fetchGalleryImages();
  };

  const selectGalleryImage = (url: string) => {
    setSelectedGalleryImage(url);
  };

  const confirmGallerySelection = () => {
    if (selectedGalleryImage) {
      form.setFieldsValue({
        imageUpload: [{ uid: '-gallery', name: selectedGalleryImage.split('/').pop(), status: 'done', url: selectedGalleryImage }],
      });
      setGalleryOpen(false);
      message.success('Imagem selecionada da galeria!');
    }
  };

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

  const handleDelete = (id: string | number) => {
    setProducts(prods => prods.filter(p => p.id !== id));
    setPendingChanges(true);
    message.success('Produto excluído localmente.');
  };

  const customUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const previewUrl = URL.createObjectURL(file); // Preview local
      
      setPendingImages(prev => [...prev, { name: file.name, base64 }]);
      setPendingChanges(true);
      
      // Simula o sucesso com a URL futura da imagem no site
      onSuccess({ url: `/imagens/produtos/${file.name}`, name: file.name, preview: previewUrl });
    };
    reader.onerror = () => {
      onError(new Error('Erro ao ler a imagem'));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (values: any) => {
    let imageUrl = '';
    const uploadField = values.imageUpload;
    if (uploadField && uploadField.length > 0) {
      const f = uploadField[0];
      imageUrl = f.response?.url || f.url || f.preview || '';
    }

    const payload: any = { ...values, imagem: imageUrl };
    delete payload.imageUpload;

    if (editing) {
      payload.id = editing.id;
      setProducts(prods => prods.map(p => p.id === editing.id ? payload : p));
      message.success('Produto atualizado localmente!');
    } else {
      payload.id = Date.now(); // ID provisório gerado em memória
      setProducts(prods => [...prods, payload]);
      message.success('Produto adicionado localmente!');
    }
    
    setPendingChanges(true);
    setIsModalOpen(false);
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
          <Popconfirm title="Excluir este produto?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const categoryOptions = categories.map(c => ({ label: c.name, value: c.name }));

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">{products.filter(p => p.nome).length} produtos em memória</span>
        <div className="flex gap-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ background: '#127184' }}>
            Novo Produto
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={products.filter(p => p.nome)} rowKey="id" size="middle" scroll={{ x: 600 }} />

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
            name="seo_keywords"
            label="Palavras-chave SEO (separadas por vírgula)"
            extra="Ajuda o Google a encontrar este produto. Ex: compressor de ar, locação compressor Salvador, compressor diesel"
          >
            <Input.TextArea
              rows={2}
              placeholder="Ex: compressor de ar, locação compressor Salvador BA, compressor diesel 150PCM"
            />
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

          <Button
            icon={<PictureOutlined />}
            onClick={openGallery}
            className="mb-6"
            style={{ borderColor: '#127184', color: '#127184' }}
          >
            Escolher da Galeria (GitHub)
          </Button>

          {/* ── Drawer de Galeria ── */}
          <Drawer
            title="Galeria de Imagens (Servidor)"
            open={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            width={520}
            footer={
              <div className="flex justify-end gap-2">
                <Button onClick={() => setGalleryOpen(false)}>Cancelar</Button>
                <Button
                  type="primary"
                  disabled={!selectedGalleryImage}
                  onClick={confirmGallerySelection}
                  style={{ background: '#127184' }}
                >
                  Usar Imagem Selecionada
                </Button>
              </div>
            }
          >
            {galleryLoading ? (
              <div className="flex justify-center py-12"><Spin size="large" /></div>
            ) : galleryImages.length === 0 ? (
              <Empty description="Nenhuma imagem encontrada no repositório." />
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img) => (
                  <div
                    key={img.url}
                    onClick={() => selectGalleryImage(img.url)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                      selectedGalleryImage === img.url
                        ? 'border-[#127184] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-24 object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    {selectedGalleryImage === img.url && (
                      <div className="absolute top-1 right-1 bg-[#127184] text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <CheckCircleFilled className="text-xs" />
                      </div>
                    )}
                    <div className="px-1 py-0.5 text-[10px] text-gray-500 truncate">{img.name}</div>
                  </div>
                ))}
              </div>
            )}
          </Drawer>

          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit" style={{ background: '#127184' }}>
              Salvar na Memória
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
  
  // Estado global da aplicação
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  // Controle de alterações
  const [pendingChanges, setPendingChanges] = useState(false);
  const [pendingImages, setPendingImages] = useState<{name: string, base64: string}[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!credentials) return;
    
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories.json', { cache: 'no-store' }),
          fetch('/api/products.json', { cache: 'no-store' })
        ]);
        
        if (catRes.ok) setCategories(await catRes.json());
        if (prodRes.ok) setProducts(await prodRes.json());
        setDataLoaded(true);
      } catch (err) {
        message.error("Erro ao carregar dados iniciais.");
      }
    };
    
    loadData();
  }, [credentials]);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: credentials?.user,
          pass: credentials?.pass,
          products,
          categories,
          images: pendingImages
        })
      });

      const data = await res.json();
      if (res.ok) {
        message.success('✅ ' + data.message + ' O Netlify começou o deploy.');
        setPendingChanges(false);
        setPendingImages([]);
      } else {
        message.error(`❌ Erro: ${data.error}`);
      }
    } catch (e: any) {
      message.error('❌ Erro crítico: ' + e.message);
    } finally {
      setPublishing(false);
    }
  };

  if (!credentials) {
    return <LoginScreen onLogin={(user, pass) => setCredentials({ user, pass })} />;
  }

  const tabItems = [
    {
      key: 'products',
      label: <span><AppstoreOutlined /> Produtos</span>,
      children: (
        <ProductsTab 
          products={products} setProducts={setProducts} 
          categories={categories} 
          setPendingChanges={setPendingChanges}
          setPendingImages={setPendingImages}
        />
      ),
    },
    {
      key: 'categories',
      label: <span><TagsOutlined /> Categorias</span>,
      children: (
        <CategoriesTab
          categories={categories} setCategories={setCategories}
          setPendingChanges={setPendingChanges}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div>
          <Title level={4} className="!mb-0 !text-[#127184]">⚙️ Painel Administrativo</Title>
          <span className="text-gray-400 text-xs">Modo Rascunho / Git-CMS</span>
        </div>
        
        <div className="flex items-center gap-4">
          {pendingChanges && (
            <Badge dot color="red">
              <span className="text-red-500 font-medium text-sm">Alterações pendentes</span>
            </Badge>
          )}
          
          <Tooltip title={pendingChanges ? "Salvar tudo no GitHub e acionar deploy" : "Nenhuma alteração pendente"}>
            <Button 
              type={pendingChanges ? "primary" : "default"}
              icon={<CloudSyncOutlined />} 
              loading={publishing}
              onClick={handlePublish}
              disabled={!pendingChanges && pendingImages.length === 0}
              style={pendingChanges ? { background: '#127184' } : {}}
            >
              Publicar no Site
            </Button>
          </Tooltip>
          
          <Button size="small" danger onClick={() => setCredentials(null)}>Sair</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {!dataLoaded ? (
          <div className="flex justify-center mt-20"><Spin size="large" /></div>
        ) : (
          <Card className="shadow-sm rounded-xl">
            <Tabs defaultActiveKey="products" items={tabItems} size="large" />
          </Card>
        )}
      </div>
    </div>
  );
}
