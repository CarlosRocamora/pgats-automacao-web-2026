function fillPaymentAndConfirm(payment) {
    cy.contains('h2', 'Payment').should('be.visible')

    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard)
    cy.get('[data-qa="card-number"]').type(payment.cardNumber)
    cy.get('[data-qa="cvc"]').type(payment.cvc)
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear)

    cy.get('[data-qa="pay-button"]')
        .should('be.visible')
        .click()
}

function validateOrderConfirmation() {
    cy.url().should('include', '/payment_done')

    cy.get('[data-qa="order-placed"]', { timeout: 20000})
        .should('be.visible')
        .and('contain', 'Order Placed!')

    cy.contains('p', 'Congratulations! Your order has been confirmed!')
        .should('be.visible')

    cy.contains('a', 'Download Invoice')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', '/download_invoice')

    cy.get('[data-qa="continue-button"]')
        .should('be.visible')
        .and('contain', 'Continue')
        .and('have.attr', 'href', '/')
}

module.exports = {
    fillPaymentAndConfirm,
    validateOrderConfirmation
}