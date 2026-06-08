describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@example.com')
    cy.get('#open-text-area').type('Gostei muito do curso! Este é um texto mais longo para demonstrar o comportamento do delay. Com delay 0, a digitação acontece de forma imediata!', { delay: 0 })
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('emailinvalido')
    cy.get('#open-text-area').type('Algum feedback para nós.')
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('valida que campo de telefone só aceita números', () => {
    cy.get('#phone').type('abcdefg')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@example.com')
    cy.get('#open-text-area').type('Teste: telefone obrigatório mas não preenchido')
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Fulano')
      .should('have.value', 'Fulano')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('da Silva')
      .should('have.value', 'da Silva')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('fulano@example.com')
      .should('have.value', 'fulano@example.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .then(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('h1#title').should('contain', 'Política de Privacidade')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.title().should('include', 'Política de Privacidade')
    cy.get('h1#title').should('contain', 'Política de Privacidade')
    cy.contains('Não salvamos dados').should('be.visible')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]').check().should('have.value', 'feedback').and('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio).check().should('be.checked')
    })
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('envia o formulário múltiplas vezes com Cypress._.times()', () => {
    cy.clock()
    const messages = ['Primeira mensagem de teste', 'Segunda mensagem de teste', 'Terceira mensagem de teste']
    
    Cypress._.times(3, (index) => {
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('da Silva')
      cy.get('#email').type('fulano@example.com')
      cy.get('#open-text-area').type(messages[index])
      cy.contains('Enviar').click()
      cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })
})
