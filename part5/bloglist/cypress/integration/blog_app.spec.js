describe('Note app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('#username').parent().should('contain', 'username')
        cy.get('#password').parent().should('contain', 'password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen successfully logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Matti Luukkainen successfully logged-in')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('a note created by cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('www.cypress.com')
            cy.get('#create-button').click()
            cy.contains('a note created by cypress')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another note cypress',
                    author: 'Not Cypress',
                    url: 'www.not-cypress.com'
                })
            })

            it('it can be liked', function () {
                cy.contains('another note cypress')
                cy.contains('view').click()
                cy.get('.likeButton').click()
                cy.get('.likesContainer').contains('likes 1')
            })
        })

        describe('A user created a blog', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another note cypress',
                    author: 'Not Cypress',
                    url: 'www.not-cypress.com',
                    likes: 0
                })
            })

            it('and can delete it', function () {
                cy.contains('another note cypress')
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'another note cypress')
            })
        })
        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Blog 1',
                    author: 'Not Cypress',
                    url: 'www.not-cypress.com',
                    likes: 0
                })
                cy.createBlog({
                    title: 'Blog 2',
                    author: 'Not Cypress',
                    url: 'www.not-cypress.com',
                    likes: 11
                })
                cy.createBlog({
                    title: 'Blog 3',
                    author: 'Not Cypress',
                    url: 'www.not-cypress.com',
                    likes: 6
                })
            })

            it('and are sorted by most likes', function () {
                cy.get('#blog-container>.blog').should((items) => {
                    expect(items[0]).to.contain('Blog 2')
                    expect(items[1]).to.contain('Blog 3')
                    expect(items[2]).to.contain('Blog 1')
                })
            })
        })
    })
})