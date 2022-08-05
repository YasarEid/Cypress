describe('Paste Detection with an iframe integration', () => {

    before(() => {
        cy.visit('http://localhost:5000/iframePage')
        cy.get('#myFrame').its('0.contentDocument.body').then(cy.wrap).as('body')
    })

    it('detecting paste event in email and password fields', () => {
        cy.get('@body').find("[type='email']").paste()
        cy.get('@body').find('#emailDetection').should('include.text', 'Paste is detected in email')
        cy.get('@body').find("[type='password']").paste()
        cy.get('@body').find('#passwordDetection').should('include.text', 'Paste is detected in password')
    })

});