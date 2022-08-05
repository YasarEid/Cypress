// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("paste", { prevSubject: true }, (selector, pastePayload) => {
    cy.wrap(selector).then($destination => {
        const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
            clipboardData: {
                getData: () => pastePayload
            }
        });
        $destination[0].dispatchEvent(pasteEvent);
    });
});

Cypress.Commands.add('waitForResource', (name, options = {}) => {
    let foundResource
    cy.window().then(win => {
        foundResource = win.performance
            .getEntriesByType('resource')
            .find(item => item.name.endsWith(name))
        console.log(foundResource)
    })
})