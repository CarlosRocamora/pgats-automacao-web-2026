const login = require('../login/index.js')

function visitHomePage() {
    cy.visit('/')

    cy.contains('h2', 'Features Items')
        .should('be.visible')
}

function visitProductsPage() {
    visitHomePage()

    cy.get('a[href="/products"]').click()

    cy.contains('h2', 'All Products', { timeout: 20000 })
        .should('be.visible')
}

function visitCartPage() {
    visitHomePage()

    cy.get('.shop-menu a[href="/view_cart"]')
        .should('be.visible')
        .click()

    cy.contains('.breadcrumbs', 'Shopping Cart', { timeout: 20000 })
        .should('be.visible')
}

function visitSignupLoginPage() {
    visitHomePage()

    cy.get('a[href="/login"]').click()

    login.validateIsOnSignupLoginPage()
}

function validateUserIsLoggedIn(name) {
    cy.contains('a', `Logged in as ${name}`, { timeout: 20000 })
        .should('be.visible')
}

module.exports = {
    visitHomePage,
    visitProductsPage,
    visitCartPage,
    visitSignupLoginPage,
    validateUserIsLoggedIn
}