describe('Books gestion', () => {
  it('Create a new book', () => {
    // Charger la fixture pour l'utilisateur
    cy.fixture('user_profil.json').then((user) => {
      // Mocker la création d'un nouveau livre POST
      cy.intercept('POST', '/api/books', {
        statusCode: 200,
        body: {
          success: true,
          id: 42,
        },
      }).as('createBook')

      // Mocker la requête GET d'un livre avec id
      let callCount = 0

      cy.fixture('new_book.json').then((new_book) => {
        cy.intercept('GET', '/api/books/42', (req) => {
          callCount++

          if (callCount === 1) {
            // Première visite → avant édition
            req.reply({
              statusCode: 200,
              body: {
                id: 42,
                title: 'La vengeance des agneaux',
              },
            })
          } else {
            // Appels suivants → après édition
            req.reply({
              statusCode: 200,
              body: new_book,
            })
          }
        }).as('getBook')
      })

      // Mocker la requête PUT d'un livre avec id
      cy.intercept('PUT', '/api/books/42', {
        statusCode: 200,
        body: {
          success: true,
          id: 42,
        },
      }).as('updateBook')

      // Simuler un token et user déjà connectés
      cy.visit('http://localhost:3000/books/add', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', 'fake-token')
          win.localStorage.setItem('user', JSON.stringify(user))
        },
      })
      cy.wait(500)

      // Enregistrer un nouveau livre
      cy.get('[data-cy=page_title]').should('contain', "Ajout d'un livre")
      cy.get('[data-cy=new_book_title]').type('La vengeance des agneaux')
      cy.get('[data-cy=save_new_book]').click()

      // Attendre le mock POST
      cy.wait('@createBook')

      // Vérifier le toast
      cy.get('[data-cy=toast_success]', { timeout: 3000 })
        .should('be.visible')
        .and('contain', 'Livre ajouté avec succès')

      // Vérifier la redirection vers le livre créé (id = 42 dans le mock)
      cy.url().should('include', '/books/42')

      //Vérifier la description du livre
      cy.get('[data-cy=book_title]').should(
        'contain',
        'La vengeance des agneaux'
      )
      cy.get('[data-cy=book_subtitle]').should('not.exist')

      // Editer un livre
      cy.get('[data-cy=edit_book_button]').click()
      cy.url().should('include', '/books/42-edit')

      cy.get('[data-cy=page_title]').should('contain', "Edition d'un livre")
      cy.get('[data-cy=book_subtitle]').type('Une histoire de myrtilles')
      cy.get('[data-cy=save_book]').click()

      cy.wait('@updateBook')

      // Vérifier le toast
      cy.get('[data-cy=toast_success]', { timeout: 3000 })
        .should('be.visible')
        .and('contain', 'Livre modifié avec succès')

      // Vérifier la redirection vers le livre modifié (id = 42 dans le mock)
      cy.url().should('include', '/books/42')

      //Vérifier la description du livre
      cy.wait('@getBook')
      cy.get('[data-cy=book_subtitle]').should(
        'contain',
        'Une histoire de myrtilles'
      )
    })
  })
  //TODO : séparer création et édition d'un livre
  //TODO : suppression d'un livre
})
