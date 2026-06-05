describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@example.com')
    cy.get('#open-text-area').type('Gostei muito do curso! Este é um texto mais longo para demonstrar o comportamento do delay. Com delay 0, a digitação acontece de forma imediata!', { delay: 0 })
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('emailinvalido')
    cy.get('#open-text-area').type('Algum feedback para nós.')
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
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

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })
})
