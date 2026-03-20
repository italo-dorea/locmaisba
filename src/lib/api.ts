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
}

export interface RawSheetProduct {
  id: number;
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
const URL = 'https://script.google.com/macros/s/AKfycbzPn3onhdIgelp4LaKbhCakG70l9U0OvrNiT6pRmV54QmzIfOZtdA_uWSuPsqPBm48v/exec';

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
    const res = await fetch(URL, {
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch from Google App Script');
      return [];
    }
    
    const rawData: RawSheetProduct[] = await res.json();
    
    // Filter empty rows
    const validData = rawData.filter(item => item.nome && item.nome.trim() !== '');
    
    return validData.map(item => {
      const isDriveImg = item.imagem && item.imagem.includes('drive.google.com/file/d/');
      // Trying to get thumbnail url from drive link if needed, but we keep original.
      let imgUrl = item.imagem || 'https://placehold.co/600x400/eeeeee/888888?text=Sem+Imagem';
      if (isDriveImg) {
        // optionally convert drive link to direct image link (thumbnail format)
        const fileId = item.imagem.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
        if (fileId) {
          imgUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        }
      }

      return {
        id: item.id.toString(),
        categoryId: slugify(item.Categoria || 'outros'),
        categoryName: item.Categoria || 'Outros',
        name: item.nome,
        brand: item.subdescricao?.split(' ')[0] || 'Geral', // naive brand
        shortDescription: item.subdescricao || '',
        fullDescription: item.descricao || '',
        features: item.informacoes_tecnicas ? item.informacoes_tecnicas.split(',').map(s => s.trim()) : [],
        imageUrl: imgUrl,
        price: formatPrice(item.preco),
        priceObservation: item.Observacao_preco,
        generalObservations: item.observacoes_gerais,
        businessType: item.tipo_de_negocio
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
