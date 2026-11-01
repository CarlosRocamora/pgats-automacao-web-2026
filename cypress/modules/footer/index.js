function submitSubscription(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
}

function scrollToSubscription() {
    cy.contains('h2', 'Subscription')
        .scrollIntoView()
        .should('be.visible')
}

function validateSubscriptionSuccessMessageIsVisible() {
    cy.get('.alert-success')
        .should('be.visible')
        .and('have.text', 'You have been successfully subscribed!')
}

module.exports = {
    submitSubscription,
    scrollToSubscription,
    validateSubscriptionSuccessMessageIsVisible
}