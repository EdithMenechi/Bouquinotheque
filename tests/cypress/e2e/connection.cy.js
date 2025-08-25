describe('Connection', () => {
  it('Connect user, display books', () => {
    // Charger la fixture de l'utilisateur
    cy.fixture('user_profil.json').then((user) => {
      // Mocker la connexion POST
      cy.intercept('POST', '/api/login', {
        statusCode: 200,
        body: {
          token: 'fake-jwt-token',
          user: user,
        },
      }).as('login')

      // Charger la fixture des livres
      cy.fixture('books.json').then((books) => {
        // Mocker la requête GET books
        cy.intercept('GET', '/api/books', {
          statusCode: 200,
          body: books,
        }).as('getBooks')
      })

      // Visiter la page
      cy.visit('http://localhost:3000/')
      cy.wait(500)

      // Vérifier le titre et le résumé
      cy.get('[data-cy=appli_title]').should(
        'contain',
        'Bienvenue dans la bouquinothèque'
      )
      cy.get('[data-cy=appli_summary]').should(
        'contain',
        'Gérez facilement les livres de votre bibliothèque.'
      )

      // Ouvrir la carte de connexion
      cy.get('[data-cy=connection_button]')
        .should('contain', 'Se connecter')
        .click()
      cy.get('[data-cy=connection_card]').should('be.visible')

      // Remplir le formulaire de connexion
      cy.get('[data-cy=connection_email]').type('judy@police.zoo')
      cy.get('[data-cy=connection_password]').type('carotte')
      cy.get('[data-cy=connection_button]')
        .should('contain', 'Connexion')
        .click()

      // Attendre le mock login et la redirection
      cy.wait('@login')
      cy.url().should('include', '/books')

      // Attendre le mock GET books
      cy.wait('@getBooks')

      // Vérifier le nombre et le contenu des livres
      cy.get('[data-cy=books]').children().should('have.length', 2)
      cy.get('[data-cy=books]')
        .eq(0)
        .within(() => {
          cy.get('[data-cy=book_title]').should(
            'contain',
            'Réussir dans la police'
          )
          cy.get('[data-cy=book_authors]').should(
            'contain',
            'Benjamin Clawhauser, Chef Bogo'
          )
        })
      cy.get('[data-cy=book_volume]').should('contain', 'Tome 3')
      cy.get('[data-cy=book_subtitle]').should(
        'contain',
        'Apprendre à mettre des contraventions'
      )
    })
  })
})
