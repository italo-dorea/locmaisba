export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // we'll map this to Antd Icons in components
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
}

export const CATEGORIES: Category[] = [
  { id: 'terraplenagem', name: 'Terraplenagem', description: 'Equipamentos pesados para movimentação de terra.', icon: 'bg-orange-100 text-orange-600' },
  { id: 'elevacao', name: 'Elevação', description: 'Plataformas e elevadores para trabalho em altura.', icon: 'bg-blue-100 text-blue-600' },
  { id: 'energia', name: 'Energia', description: 'Geradores e compressores para fornecimento contínuo.', icon: 'bg-yellow-100 text-yellow-600' },
  { id: 'ferramentas', name: 'Ferramentas', description: 'Ferramentas elétricas manuais para uso geral.', icon: 'bg-gray-100 text-gray-600' },
  { id: 'andaimes', name: 'Andaimes', description: 'Estruturas tubulares e de acesso seguro.', icon: 'bg-teal-100 text-teal-600' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'retroescavadeira-jd-310l',
    categoryId: 'terraplenagem',
    name: 'Retroescavadeira John Deere 310L',
    brand: 'John Deere',
    shortDescription: 'Ideal para abertura de valas, carregamento e uso geral em obras urbanas.',
    fullDescription: 'A Retroescavadeira 310L oferece excelente força de desagregação e tempos de ciclo rápidos. Com tração 4x4, é versátil para lidar com os terrenos mais desafiadores, garantindo produtividade desde o início até o fim do projeto.',
    features: ['Potência Líquida: 93 HP', 'Profundidade Máxima de Escavação: 4,3 M', 'Peso Operacional: 6.800 kg'],
    imageUrl: 'https://placehold.co/600x400/eeeeee/888888?text=Retroescavadeira',
  },
  {
    id: 'mini-escavadeira-cat-303',
    categoryId: 'terraplenagem',
    name: 'Mini Escavadeira CAT 303',
    brand: 'Caterpillar',
    shortDescription: 'Compacta, forte e exímia em espaços confinados.',
    fullDescription: 'Desempenho máximo em tamanho reduzido. A CAT 303 foi projetada para trabalhar em ambientes onde espaço é limitado sem perder a potência de escavação necessária para finalizar o trabalho.',
    features: ['Potência Líquida: 24.8 HP', 'Peso Operacional: 3.200 kg', 'Giro Zero traseiro'],
    imageUrl: 'https://placehold.co/600x400/eeeeee/888888?text=Mini+Escavadeira',
  },
  {
    id: 'plataforma-tesoura-12m',
    categoryId: 'elevacao',
    name: 'Plataforma Tesoura Elétrica 12m',
    brand: 'Genie',
    shortDescription: 'Eficiência elétrica, zero emissões e operação silenciosa.',
    fullDescription: 'A plataforma tipo tesoura GS-3246 é ideal para trabalhos internos e externos onde se precisa ter o máximo de espaço de deck possível com zero emissões, graças aos motores de corrente alternada.',
    features: ['Altura de Trabalho: 11.78 M', 'Capacidade: 318 kg', 'Ocupantes Máximos: 2'],
    imageUrl: 'https://placehold.co/600x400/eeeeee/888888?text=Plataforma+Tesoura',
  },
  {
    id: 'gerador-cummins-100kva',
    categoryId: 'energia',
    name: 'Gerador de Energia 100 kVA C100D2R',
    brand: 'Cummins',
    shortDescription: 'Gerador supersilenciado para uso prolongado em obras críticas.',
    fullDescription: 'Esse conjunto gerador da Cummins é integrado de fábrica e proporciona desempenho ideal, confiabilidade e versatilidade em aplicações estáticas e contínuas de emergência.',
    features: ['Potência Standby: 100 kVA', 'Tipo: Carenado / Supersilenciado', 'Tanque autônomo de mais de 12 horas'],
    imageUrl: 'https://placehold.co/600x400/eeeeee/888888?text=Gerador+100kVA',
  },
  {
    id: 'martelo-rompedor-30kg',
    categoryId: 'ferramentas',
    name: 'Martelo Rompedor Bosch 30kg GSH 27',
    brand: 'Bosch',
    shortDescription: 'O mais potente demolidor elétrico do mercado.',
    fullDescription: 'Altíssima taxa de remoção devido aos 62 Joules de força de impacto. Design focado não só no desempenho, como no conforto e sistema antichoque (Vibration Control) para operadores.',
    features: ['Potência absorvida: 2.000 W', 'Energia de impacto: 62 J', 'Taxa de impacto: 1.000 ipm'],
    imageUrl: 'https://placehold.co/600x400/eeeeee/888888?text=Martelo+Rompedor',
  }
];

// Helper functions for mock data
export const getCategoryById = (id: string | null) => CATEGORIES.find(c => c.id === id);
export const getProductsByCategory = (categoryId: string) => PRODUCTS.filter(p => p.categoryId === categoryId);
export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
