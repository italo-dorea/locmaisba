import { NextResponse } from 'next/server';

const REPO = 'italo-dorea/locmaisba';
const BRANCH = 'main';

export async function GET() {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_DEPLOY_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Token do GitHub não configurado' }, { status: 500 });
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    };

    // Obter o conteúdo do diretório public/imagens/produtos no GitHub
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/public/imagens/produtos?ref=${BRANCH}`, { headers });
    
    if (!res.ok) {
      // Se a pasta não existir ou der erro
      return NextResponse.json([]);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return NextResponse.json([]);
    }

    const images = data
      .filter((file: any) => file.type === 'file' && file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i))
      .map((file: any) => ({
        name: file.name,
        // Construir a URL bruta do GitHub para exibição, ou URL da aplicação
        // Como o Netlify serve a branch main, podemos usar a URL da aplicação
        url: `/imagens/produtos/${file.name}`
      }));

    return NextResponse.json(images);

  } catch (error: any) {
    console.error('Erro ao listar imagens:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
