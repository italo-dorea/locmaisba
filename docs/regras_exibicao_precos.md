# Regras de Negócio e Exibição - Catálogo Loc Mais

Este documento registra as definições comerciais e de regras de UI (Interface do Usuário) aplicadas ao catálogo do site, documentadas a partir de decisões passadas pela equipe.

Utilize este documento para manter o alinhamento com as expectativas do cliente e justificar o comportamento do sistema perante solicitações futuras divergentes.

---

## 1. Exibição de Preços e Botões de Cotação

**Data da Decisão:** Abril / 2026
**Motivação:** A equipe comercial definiu regras de discrição de mercado para locações e equipamentos novos, priorizando o contato consultivo via WhatsApp para geração de cotação formal, evitando que preços fiquem expostos e possam afastar o locatário sem uma negociação. 

Portanto, o sistema aplica a seguinte conduta automaticamente com base no campo "Condição" e "Tipo de Negócio" dos equipamentos:.

### A. Equipamentos para Locação
- **Preço Visualmente Exibido:** Ocultado.
- **Botão / Ação do Usuário:** O espaço onde seria o preço apresenta destacadamente um botão de "Solicitar Cotação / Cotar Este Equipamento" que direciona para o comercial via WhatsApp.
- **Listagens (Home & Portfólio):** Exibe a flag "Sob Consulta" ou não informa valor.

### B. Venda de Equipamentos Novos
- **Preço Visualmente Exibido:** Ocultado.
- **Botão / Ação do Usuário:** Comporta-se de maneira idêntica à Locação. Botão "Solicitar Cotação" assume foco primário.
- **Listagens (Home & Portfólio):** Exibe "Sob Consulta" ou oculta o valor no card.

### C. Venda de Equipamentos Usados
- **Preço Visualmente Exibido:** Exibido normalmente em toda a plataforma.
- **Botão / Ação do Usuário:** Exibe preço cheio e/ou observações de preço (ex: "A partir de..."), porém ainda permite o clique no botão para entrar em contato/negociar no WhatsApp.

---

## Arquivos com as Regras Aplicadas

As verificações lógicas no código (Frontend) estão presentes nos arquivos principais de visualização para assegurar essa decisão:

- `src/app/produtos/[id]/ProductClient.tsx`: Gerencia a tela final individual do produto (oculta as labels textuais de reais - `R$`).
- `src/app/HomeClient.tsx`: Oculta os preços diretamente nas prateleiras e destaques de promoções.
- `src/app/portfolio/PortfolioClient.tsx`: Assegura que o menu e o descritivo de "Imprimir Catálogo PDF" sigam restritamente as regras de omissão acima para que propostas não vazem em orçamentos impressos offline.
