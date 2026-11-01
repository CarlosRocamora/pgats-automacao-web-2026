function proceedToCheckout() {
    cy.contains('Proceed To Checkout')
        .should('be.visible')
        .click()

    cy.contains('.breadcrumbs', 'Checkout', { timeout: 20000 })
        .should('be.visible')
}

function deleteAllCartItems() {
    cy.get('body').then(($body) => {
        const productIds = $body
            .find('.cart_quantity_delete')
            .toArray()
            .map((button) => button.dataset.productId)

        productIds.forEach((id) => {
            cy.get(`.cart_quantity_delete[data-product-id="${id}"]`).click()
            cy.get(`#product-${id}`).should('not.exist')
        })
    })

    cy.get('#empty_cart')
        .should('be.visible')
        .and('contain', 'Cart is empty!')
}

module.exports = {
    proceedToCheckout,
    deleteAllCartItems
}