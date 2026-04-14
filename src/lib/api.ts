// src/lib/api.ts
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
  price?: string | null;
  priceObservation?: string | null;
  generalObservations?: string | null;
  businessType?: string | null;
  condition?: string;
  seoKeywords?: string; // Palavras-chave SEO separadas por vírgula
}

export interface RawSheetProduct {
  id: number | string;
  nome: string;
  subdescricao: string;
  descricao: string;
  preco: string;
  Observacao_preco: string;
  informacoes_tecnicas: string;
  observacoes_gerais: string;
  Categoria: string;
  tipo_de_negocio: string;
  imagem: string;
  condicao?: string;
  Condicao?: string;
  seo_keywords?: string;
}

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Convert google drive view links to preview or raw image links if necessary, 
// but for simplicity we'll keep the string.

function formatPrice(preco: string | number | undefined | null): string | null {
  if (!preco) return null;
  const precoStr = preco.toString().trim();
  if (!precoStr) return null;
  
  // Try to parse if it's a standard number format like 125.00 or 125
  const num = Number(precoStr);
  if (!isNaN(num)) {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return precoStr;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    let rawData: RawSheetProduct[] = [];

    if (typeof window === 'undefined') {
      // SERVER-SIDE (next build / SSR): lê o arquivo direto do disco
      // Importação dinâmica para não incluir 'fs' no bundle do cliente
      const fs = (await import('fs')).default;
      const path = (await import('path')).default;
      const filePath = path.join(process.cwd(), 'public', 'api', 'products.json');
      if (fs.existsSync(filePath)) {
        const contents = fs.readFileSync(filePath, 'utf8').trim();
        if (contents) rawData = JSON.parse(contents);
      }
    } else {
      // CLIENT-SIDE (browser): busca o JSON já servido pelo servidor Apache/PHP
      const res = await fetch('/api/products.json', { cache: 'no-store' });
      if (res.ok) rawData = await res.json();
    }

    // Filter empty rows
    const validData = rawData.filter(item => item.nome && item.nome.trim() !== '');
    
    return validData.map(item => {
      // Usa a URL da imagem diretamente da planilha (HostGator, Supabase, etc.)
      // Fallback para placeholder se não houver imagem cadastrada
      const imgUrl = (item.imagem && item.imagem.trim() !== '')
        ? item.imagem.trim()
        : 'https://placehold.co/600x400/f1f5f9/64748b?text=Sem+Imagem&font=montserrat';

      const categoryName = item.Categoria || 'Outros';

      const tnStr = (item.tipo_de_negocio || '').toLowerCase();
      const isVenda = tnStr.includes('venda');

      let condition: string | undefined = undefined;

      if (isVenda) {
        condition = 'Usado'; // default fallback for sales
        const condStr = (item.condicao || item.Condicao || '').toLowerCase();

        if (condStr.includes('novo') || tnStr.includes('novo')) {
          condition = 'Novo';
        } else if (condStr.includes('usado') || tnStr.includes('usado')) {
          condition = 'Usado';
        }
      }

      return {
        id: item.id.toString(),
        categoryId: slugify(categoryName),
        categoryName: categoryName,
        name: item.nome,
        brand: item.subdescricao?.split(' ')[0] || 'Geral', // naive brand
        shortDescription: item.subdescricao || '',
        fullDescription: item.descricao || '',
        features: item.informacoes_tecnicas ? item.informacoes_tecnicas.split(',').map(s => s.trim()) : [],
        imageUrl: imgUrl,
        price: formatPrice(item.preco),
        priceObservation: item.Observacao_preco,
        generalObservations: item.observacoes_gerais,
        businessType: item.tipo_de_negocio,
        condition,
        seoKeywords: item.seo_keywords || '',
      };
    });
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const products = await fetchProducts();
  const map = new Map<string, Category>();
  
  // Base styling for icons
  const colors = [
    'bg-orange-100 text-orange-600',
    'bg-blue-100 text-blue-600',
    'bg-yellow-100 text-yellow-600',
    'bg-teal-100 text-teal-600',
    'bg-gray-100 text-gray-600'
  ];
  
  let i = 0;
  products.forEach(p => {
    if (!map.has(p.categoryId)) {
      map.set(p.categoryId, {
        id: p.categoryId,
        name: p.categoryName,
        description: `Equipamentos da linha de ${p.categoryName}`,
        icon: colors[i % colors.length]
      });
      i++;
    }
  });
  
  return Array.from(map.values());
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
}
