# Smart Host

Bem-vindo ao **Smart Host** — uma plataforma moderna para descobrir, pesquisar e reservar acomodações de temporada ao redor do mundo. Este aplicativo é construído com Next.js e TypeScript, oferecendo uma experiência ágil tanto para hóspedes quanto para anfitriões.

## Como Funciona

O Smart Host permite que usuários naveguem por uma seleção de propriedades para temporada, desde vilas à beira-mar até cabanas aconchegantes nas montanhas e apartamentos modernos em grandes cidades. Os hóspedes podem:

- **Pesquisar e Filtrar Anúncios:** Utilize a busca na página inicial para filtrar propriedades por localização, datas e outros critérios, com formulários interativos e fáceis de usar.
- **Explorar Propriedades em Destaque:** Veja um carrossel dinâmico com anúncios premium, que se adapta ao tamanho do dispositivo e à interação do usuário, graças ao hook responsivo de carrossel.
- **Visualizar Detalhes das Propriedades:** Cada anúncio traz descrição detalhada, galeria de fotos, comodidades e informações para reserva.
- **Experiência de Reserva Simples:** A interface foi desenvolvida para ser clara, rápida e transmitir confiança ao reservar.

Os dados das propriedades são gerenciados e populados via Prisma ORM, incluindo diversos tipos de comodidades e propriedades. O código inclui hooks para carrossel automático, layouts responsivos e formulários de busca intuitivos.

## Estrutura do Projeto

- `.gitignore` — Arquivos e pastas ignorados pelo controle de versão.
- `README.md` — Documentação do projeto.
- `components.json` — Configuração ou listagem de componentes de UI.
- `eslint.config.mjs` — Configuração do ESLint para garantir qualidade do código.
- `next.config.ts` — Configuração do framework Next.js.
- `package.json` & `package-lock.json` — Gerenciamento de dependências e scripts.
- `postcss.config.mjs` — Configuração do processamento de CSS.
- `prisma/` — Esquema e migrações do banco de dados (Prisma ORM). Scripts de seed fornecem exemplos de propriedades e comodidades.
- `public/` — Arquivos estáticos (imagens, fontes, etc.).
- `src/` — Código fonte principal da aplicação. Destaques:
  - `src/hooks/useCarousel.ts`: Implementa um carrossel responsivo e automático para exibir propriedades em destaque.
  - `src/components/HeroSection.tsx` & `src/components/SearchHero.tsx`: UI principal da página inicial e formulário de busca.
- `tsconfig.json` — Configuração do TypeScript.

## Tecnologias Utilizadas

- **TypeScript** — JavaScript tipado para desenvolvimento escalável.
- **Next.js** — Framework baseado em React para renderização no servidor e geração de sites estáticos.
- **Prisma** — ORM para gerenciamento de dados de forma segura e tipada.
- **ESLint** — Ferramenta para manter a qualidade e consistência do código.
- **PostCSS** — Processamento moderno de CSS.
- **CSS/JavaScript** — Estilização e scripts da interface.

## Primeiros Passos

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
3. **Faça o build para produção:**
   ```bash
   npm run build
   ```

Abra [http://localhost:3000](http://localhost:3000) para visualizar o app. Edite os arquivos em `src/` para personalizar; a página será atualizada automaticamente durante o desenvolvimento.

## Configuração do Projeto

- Ajuste configurações do TypeScript em `tsconfig.json`.
- Modifique parâmetros do Next.js em `next.config.ts`.
- Gerencie o esquema do banco de dados na pasta `prisma/`.
- Adicione arquivos estáticos na pasta `public/`.
- Coloque o código principal da aplicação na pasta `src/`.

## Contribua

Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto!

## Licença

Este projeto está licenciado sob a Licença MIT.

---

Para mais detalhes, veja a documentação existente no `README.md` ou explore o código!
