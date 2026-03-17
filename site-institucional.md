# Projeto Site Institucional Estático

## Overview
Criação de um site institucional utilizando Next.js com exportação estática (`output: 'export'`), otimizado para hospedagem compartilhada no HostGator. O projeto não utilizará API Routes ou SSR (Server-Side Rendering).

## Project Type
WEB

## Success Criteria
- [ ] Build estático (`npm run build`) gerando a pasta `out/` com sucesso.
- [ ] Imagens otimizadas (usando a tag `<img>` padrão ou `next/image` custom loader, desativando a otimização de servidor).
- [ ] Roteamento funcionando perfeitamente (incluindo trailing slashes se necessário para o HostGator).
- [ ] Formulário de contato funcional via Client-Side (usando serviços como Formspree, EmailJS, etc.).

## Tech Stack
- **Framework:** Next.js (com TypeScript e App Router).
- **Styling:** CSS Vanilla ou Tailwind (a depender do design system).
- **Hospedagem:** HostGator (servidor estático Apache/cPanel).

## File Structure (Draft)
```text
/
├── public/                 # Imagens estáticas, favicon, robots.txt, sitemap.xml
├── src/
│   ├── app/                # App Router (page.tsx, layout.tsx, globas.css)
│   │   ├── sobre/
│   │   │   └── page.tsx    # Rota "Sobre Nós" (/sobre)
│   │   ├── servicos/
│   │   │   └── page.tsx    # Rota "Serviços" (/servicos)
│   │   └── contato/
│   │       └── page.tsx    # Rota "Contato" (/contato)
│   ├── components/         # Componentes reutilizáveis (Header, Footer, Button, Card)
│   ├── lib/                # Utilitários e hooks customizados
│   └── styles/             # Variáveis de design, CSS global (se não usar app/globals.css)
├── next.config.ts          # Configuração CRÍTICA: output: 'export'
└── package.json            # Scripts de build "next build"
```

## Task Breakdown
- **Task 1: Setup e Configuração do Next.js Estático**
  - **Agent:** `frontend-specialist`
  - **Skills:** `nextjs-react-expert`, `clean-code`
  - **Priority:** P1
  - **INPUT:** `npx create-next-app`
  - **OUTPUT:** Projeto base limpo com `next.config.ts` definido para export estático e otimização de imagem manual.
  - **VERIFY:** Executar `npm run build` deve gerar a pasta `/out` sem erros.

- **Task 2: Criação de Layout e Navegação (UI Base)**
  - **Agent:** `frontend-specialist`
  - **Skills:** `frontend-design`
  - **Priority:** P2
  - **Dependencies:** Task 1
  - **INPUT:** Definição de cores, tipografia (Google Fonts exportadas), Header e Footer.
  - **OUTPUT:** Layout principal responsivo.
  - **VERIFY:** Navegação fluida entre rotas vazias sem reload de página.

- **Task 3: Desenvolvimento de Conteúdo Institucional (Páginas)**
  - **Agent:** `frontend-specialist`
  - **Skills:** `seo-fundamentals`, `clean-code`
  - **Priority:** P2
  - **Dependencies:** Task 2
  - **INPUT:** Textos institucionais.
  - **OUTPUT:** Páginas Home, Sobre, Serviços estilizadas.
  - **VERIFY:** Responsividade móvel e desktop validadas (Lighthouse Audit UI).

- **Task 4: Implementação de Formulário Client-Side e SEO**
  - **Agent:** `frontend-specialist`
  - **Skills:** `frontend-design`, `seo-fundamentals`
  - **Priority:** P3
  - **Dependencies:** Task 3
  - **INPUT:** Chaves do EmailJS/Formspree + Meta Tags SEO.
  - **OUTPUT:** Contato funcionando sem API local + Meta Tags dinâmicas.
  - **VERIFY:** Formulário envia e-mail com sucesso. `seo_checker.py` passa.

- **Task 5: Validação Final e Preparação para o HostGator**
  - **Agent:** `orchestrator`
  - **Skills:** `performance-profiling`, `deployment-procedures`
  - **Priority:** P4
  - **Dependencies:** Task 4
  - **INPUT:** `npm run build` final.
  - **OUTPUT:** Pasta `/out` compactada ou pronta para FTP.
  - **VERIFY:** Checklist local do HostGator (trailing slashes configuradas, arquivos `.html` acessíveis).

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ⬜ Pendente
- Build: ✅ Pass (out package generated)
- UX Audit: ✅ Pass
- Date: 16 de março de 2026
