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
    cy.contains('login')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('pLi')
      cy.get('#password').type('lind')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Sunday blog')
      cy.get('#author').type('Liam L')
      cy.get('#url').type('www.sundayBlog.fi')
      cy.get('#createBlog').click()

      cy.contains('Sunday blog')
      cy.contains('www.sundayBlog.fi')
      cy.contains('A new blog "Sunday blog" by Liam L is added')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Sunday blog')
      cy.get('#author').type('Liam L')
      cy.get('#url').type('www.sundayBlog.fi')
      cy.get('#createBlog').click()
      cy.contains('view').click()

      cy.get('#likeButton').click()
      cy.get('#likes').contains(1)

      cy.get('#likeButton').click()
      cy.get('#likes').contains(2)

      cy.get('#likeButton').click()
      cy.get('#likes').contains(3)

      cy.get('#likeButton').click()
      cy.get('#likes').contains(4)
    })


    it('A blog can be removed', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Sunday blog')
      cy.get('#author').type('Liam L')
      cy.get('#url').type('www.sundayBlog.fi')
      cy.get('#createBlog').click()
      cy.contains('view').click()

      cy.contains('Sunday blog')
      cy.get('#removeButton').click()
      cy.get('html').should('not.have.value', 'Sunday blog')

    })
  })

})
