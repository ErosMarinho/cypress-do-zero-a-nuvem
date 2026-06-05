// Comandos personalizados de exemplo
Cypress.Commands.add('login', (email = 'test@example.com') => {
  cy.visit('/')
  // adicionar passos de login conforme necessário
})

// Preenche os campos obrigatórios e submete o formulário
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Fulano')
  cy.get('#lastName').type('da Silva')
  cy.get('#email').type('fulano@example.com')
  cy.get('#open-text-area').type('Mensagem via comando customizado')
  cy.contains('Enviar').click()
})
