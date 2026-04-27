import { NextResponse } from 'next/server';

const REPO = 'italo-dorea/locmaisba';
const BRANCH = 'main'; // Assumindo que a branch principal é main

export async function POST(req: Request) {
  try {
    const { products, categories, images, user, pass } = await req.json();

    // Verificação de segurança simples
    if (user !== 'locmais' || pass !== 'locmais2026') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const token = process.env.NEXT_PUBLIC_GITHUB_DEPLOY_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Token do GitHub não configurado no servidor' }, { status: 500 });
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    // 1. Obter o SHA do commit mais recente da branch
    const refRes = await fetch(`https://api.github.com/repos/${REPO}/git/ref/heads/${BRANCH}`, { headers });
    if (!refRes.ok) throw new Error('Falha ao obter ref da branch');
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2. Obter a árvore do commit mais recente
    const commitRes = await fetch(`https://api.github.com/repos/${REPO}/git/commits/${latestCommitSha}`, { headers });
    if (!commitRes.ok) throw new Error('Falha ao obter commit');
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Preparar o novo array da árvore (Tree)
    const tree: any[] = [
      {
        path: 'public/api/products.json',
        mode: '100644',
        type: 'blob',
        content: JSON.stringify(products, null, 2),
      },
      {
        path: 'public/api/categories.json',
        mode: '100644',
        type: 'blob',
        content: JSON.stringify(categories, null, 2),
      }
    ];

    // 4. Criar Blobs para imagens e adicioná-las à árvore
    for (const img of images) {
      // Extrair o base64 real removendo o prefixo "data:image/...;base64,"
      const base64Content = img.base64.split(',')[1];
      
      const blobRes = await fetch(`https://api.github.com/repos/${REPO}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: base64Content,
          encoding: 'base64'
        })
      });
      
      if (!blobRes.ok) throw new Error(`Falha ao criar blob para imagem ${img.name}`);
      const blobData = await blobRes.json();

      tree.push({
        path: `public/imagens/produtos/${img.name}`,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      });
    }

    // 5. Criar a nova árvore no GitHub
    const createTreeRes = await fetch(`https://api.github.com/repos/${REPO}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: tree
      })
    });
    if (!createTreeRes.ok) throw new Error('Falha ao criar nova árvore');
    const newTreeData = await createTreeRes.json();
    const newTreeSha = newTreeData.sha;

    // 6. Criar o novo commit
    const createCommitRes = await fetch(`https://api.github.com/repos/${REPO}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: 'Atualização via Painel de Admin (Produtos e Categorias)',
        tree: newTreeSha,
        parents: [latestCommitSha]
      })
    });
    if (!createCommitRes.ok) throw new Error('Falha ao criar novo commit');
    const newCommitData = await createCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // 7. Atualizar a referência (branch) para apontar para o novo commit
    const updateRefRes = await fetch(`https://api.github.com/repos/${REPO}/git/refs/heads/${BRANCH}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitSha
      })
    });
    if (!updateRefRes.ok) throw new Error('Falha ao atualizar a referência da branch');

    return NextResponse.json({ success: true, message: 'Alterações publicadas com sucesso!' });

  } catch (error: any) {
    console.error('Erro no publish:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
