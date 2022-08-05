describe('Test loading images', () => {
    before(() => {
        cy.visit('http://localhost:5000/iframePage')
        cy.get('#myFrame').its('0.contentDocument.body').then(cy.wrap).as('body')
    })

    it('Waiting image to load and have actual dimensions', () => {
        cy.waitForResource('https://via.placeholder.com/600/771796')

        cy.get('@body').find('[alt="Image"]')
            .should('be.visible')
            .and(($img) => {
                expect(
                    $img[0].naturalWidth,
                    'image has natural width'
                ).to.equal(600)
            })
    })
})