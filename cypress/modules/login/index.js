function performLogin(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })

    cy.get('[data-qa="login-button"]').click()
}

function validateLoginFormErrorMessage() {
    cy.get('.login-form p')
        .should('be.visible')
        .and('have.text', 'Your email or password is incorrect!')
}

function validateIsOnSignupLoginPage() {
    cy.contains('h2', 'Login to your account', { timeout: 20000 })
        .should('be.visible')

    cy.contains('h2', 'New User Signup!', { timeout: 20000 })
        .should('be.visible')
}

module.exports = {
    performLogin,
    validateLoginFormErrorMessage,
    validateIsOnSignupLoginPage
}