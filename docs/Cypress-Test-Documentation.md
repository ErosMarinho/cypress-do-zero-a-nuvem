Cypress - Documentação do Projeto

Breve descrição
- Este projeto contém uma suíte de testes end-to-end usando Cypress para a aplicação exemplo "Central de Atendimento ao Cliente TAT".
- Testes cobrem validações de formulário, seleção de produtos, interações com radio/checkbox, upload de arquivos, navegação e uso de comandos customizados.

Pré-requisitos
- Node.js (>= 16 recomendado)
- npm (>= 8)
- Git
- Dependências do sistema para execução do Cypress em Linux (por exemplo: xvfb, bibliotecas GTK). Em contêineres Ubuntu, instale com: `sudo apt-get install -y xvfb libgtk-3-0 libgbm1 libnotify4 libnss3 libxss1 libasound2`.

Instalação
1. Clone o repositório:
   - `git clone <repo-url>`
2. Entre na pasta do projeto:
   - `cd cypress-do-zero-a-nuvem`
3. Instale as dependências:
   - `npm install`

Scripts úteis (no `package.json`)
- `npm run cy:open` - Abre o Cypress Test Runner (GUI).
- `npm run cy:open:mobile` - Abre o Test Runner simulando viewport mobile (410x860).
- `npm run test` - Executa os testes em modo headless (padrão).
- `npm run test:mobile` - Executa os testes headless com viewport 410x860.
- `npm run test:mobile:headless` - Mesmo que acima (script adicionado para conveniência).

Configuração do Cypress
- Arquivo de configuração: `cypress.config.js` (configura viewport padrão e `video: true`).
- Vídeos de execução são gerados em `cypress/videos/` quando `video: true` estiver habilitado.

Executando os testes
- Rodar todos os testes em modo headless:
  - `npm test` ou `npx cypress run`

- Rodar os testes simulando um dispositivo mobile (headless):
  - `npm run test:mobile` ou `npm run test:mobile:headless`

- Abrir o Test Runner com viewport mobile (GUI):
  - `npm run cy:open:mobile`

Observações e boas práticas
- Para testes locais em Linux sem ambiente gráfico, instale `xvfb` e bibliotecas de sistema necessárias.
- Use o comando customizado `cy.fillMandatoryFieldsAndSubmit()` presente em `cypress/support/commands.js` para preencher e submeter o formulário em vários testes.
- Mantenha os fixtures em `cypress/fixtures/` para testes de upload e dados estáticos.

Sugestões futuras
- Integrar execução em CI (GitHub Actions) com upload de artefatos (vídeos e screenshots).
- Adicionar testes em múltiplos navegadores (Chrome, Firefox) via Cypress.

Arquivo gerado automaticamente pelo assistente.
