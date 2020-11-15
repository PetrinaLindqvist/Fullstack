describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'P Lindqvist',
      username: 'pLi',
      password: 'lind'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Login')
  })


  describe('succeeds with correct credentials', function () {
    it('user can log in', function() {
      cy.contains('login').click()
      cy.get('#username').type('pLi')
      cy.get('#password').type('lind')
      cy.get('#login-button').click()

      cy.contains('P Lindqvist logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('pLi')
      cy.get('#password').type('qvist')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
})
