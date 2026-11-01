function clickViewProductOfFirstProduct() {
    cy.get('.features_items', { timeout: 20000 })
        .should('be.visible')
        .find('.product-image-wrapper')
        .first()
        .contains('View Product')
        .should('be.visible')
        .click()
}

function searchProduct(productName) {
    cy.get('#search_product').type(productName)
    cy.get('#submit_search').click()

    cy.contains('h2', 'Searched Products', { timeout: 20000 })
        .should('be.visible')
}

function addProductsToCart(maxProducts = 5) {
    cy.get('.features_items', { timeout: 20000 })
        .should('be.visible')
        .find('.product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($product, index) => {
            if (index >= maxProducts) return false

            cy.wrap($product)
                .contains('Add to cart')
                .should('be.visible')
                .click()

            cy.contains('h4', 'Added!')
                .should('be.visible')

            cy.contains('p', 'Your product has been added to cart.')
                .should('be.visible')

            cy.get('a[href="/view_cart"]')
                .should('be.visible')
                .and('contain', 'View Cart')

            cy.contains('button', 'Continue Shopping')
                .should('be.visible')
                .click()
        })
}

function validateAllProductsAreVisible() {
    cy.get('.features_items', { timeout: 20000 })
        .should('be.visible')
        .find('.product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($product) => {
            cy.wrap($product).should('be.visible')
        })
}

function validateProductDetailsAreVisible(product) {
    const productDetails = [
        { selector: 'h2', text: product.name },
        { selector: 'p', text: `Category: ${product.category}` },
        { selector: 'span', text: `Rs. ${product.price}` },
        { selector: 'p', text: `Availability: ${product.availability}` },
        { selector: 'p', text: `Condition: ${product.condition}` },
        { selector: 'p', text: `Brand: ${product.brand}` }
    ]

    cy.get('.product-information').within(() => {
        productDetails.forEach(({ selector, text }) => {
            cy.contains(selector, text).should('be.visible')
        })
    })
}

function validateAllProductsRelatedToSearchAreVisible(productName) {
    cy.get('.features_items', { timeout: 20000 })
        .should('be.visible')
        .find('.product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($product) => {
            cy.wrap($product)
                .should('be.visible')
                .and('contain', productName)
        })
}

module.exports = {
    clickViewProductOfFirstProduct,
    searchProduct,
    addProductsToCart,
    validateAllProductsAreVisible,
    validateProductDetailsAreVisible,
    validateAllProductsRelatedToSearchAreVisible
}