function fillCommentAndPlaceOrder(text) {
    cy.get('#ordermsg textarea[name="message"]')
        .should('be.visible')
        .type(text)

    cy.contains('a.check_out', 'Place Order')
        .should('be.visible')
        .click()

    cy.url().should('include', '/payment')
}

function validateCheckoutAddresses(userRegister) {
    cy.contains('h2', 'Address Details').should('be.visible')

    const addresses = [
        { selector: '#address_delivery', title: 'Your delivery address' },
        { selector: '#address_invoice', title: 'Your billing address' }
    ]

    addresses.forEach(({ selector, title }) => {
        cy.get(selector).within(() => {
            cy.contains('h3', title).should('be.visible')

            cy.contains('li', `${userRegister.firstName} ${userRegister.lastName}`)
                .should('be.visible')

            cy.contains('li', userRegister.company).should('be.visible')
            cy.contains('li', userRegister.address).should('be.visible')
            cy.contains('li', userRegister.address2).should('be.visible')

            cy.contains(
                'li',
                `${userRegister.city} ${userRegister.state} ${userRegister.zipcode}`
            ).should('be.visible')

            cy.contains('li', userRegister.country).should('be.visible')
            cy.contains('li', userRegister.mobileNumber).should('be.visible')
        })
    })
}

function validateCheckoutProducts({ products, totalAmount }) {
    cy.get('#cart_info tbody tr[id^="product-"]')
        .should('have.length', products.length)

    products.forEach(({ item, description, price, quantity, total }) => {
        cy.contains('tr', item).within(() => {
            cy.get('.cart_description p').should('have.text', description)
            cy.get('.cart_price p').should('have.text', price)
            cy.get('.cart_quantity button').should('have.text', quantity)
            cy.get('.cart_total_price').should('have.text', total)
        })
    })

    cy.contains('h4', 'Total Amount')
        .closest('tr')
        .find('.cart_total_price')
        .should('have.text', totalAmount)
}

module.exports = {
    fillCommentAndPlaceOrder,
    validateCheckoutAddresses,
    validateCheckoutProducts,
}