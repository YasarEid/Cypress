describe('Intercpt request with integration of iframe', function () {
    before(() => {
        cy.visit('http://localhost:5000/iframePage')
        cy.get('#myFrame').its('0.contentDocument.body').then(cy.wrap).as('body')

    })

    it('Header existence in response', () => {
        cy.intercept("POST", '/posts').as('createPost')
        cy.fixture("user").then((user) => {  
            const title = user.title;
            const body = user.body;
            const userId = user.userId;
            cy.get('@body').find("#title").type(title)
            cy.get('@body').find('#body').type(body)
            cy.get('@body').find('#userId').type(userId)
            cy.get('@body').find('form').submit()

            cy.wait("@createPost").then(({
                response
            }) => {
                expect(response.headers).to.exist
            })
        })
    })
})

