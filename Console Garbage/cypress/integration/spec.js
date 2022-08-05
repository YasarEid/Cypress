describe('Testing that there is no garbage in the console and logs', function() {
    before(() => {
        cy.visit('http://localhost:5000', {
            onBeforeLoad(win) {
                cy.spy(win.console, 'log').as('log')
            },
        })
    })

    it('Testing output of the console', () => {
        cy.get('@log').should(
            spy => {
                const spyCalls = spy["getCalls"]();
                spyCalls.forEach(spyCall => {
                    expect(spyCall.args[1]).not.to.contain("library.js")
                });
            })
    })
})