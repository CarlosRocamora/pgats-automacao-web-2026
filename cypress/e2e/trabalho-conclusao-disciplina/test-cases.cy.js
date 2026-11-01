const header = require('../../modules/header/index.js')
const footer = require('../../modules/footer/index.js')
const register = require('../../modules/register/index.js')
const login = require('../../modules/login/index.js')
const products = require('../../modules/products/index.js')
const cart = require('../../modules/cart/index.js')
const checkout = require('../../modules/checkout/index.js')
const payment = require('../../modules/payment/index.js')

const user = require('../../fixtures/register.json')
const productDetails = require('../../fixtures/productDetails.json')
const checkoutAddresses = require('../../fixtures/loginCheckoutAddresses.json')
const checkoutProducts = require('../../fixtures/checkoutProducts.json')
const paymentData = require('../../fixtures/payment.json')


describe('Register', () => {

    beforeEach(() => {
        header.visitSignupLoginPage()
    })

    it('Test Case 1: Register User', () => {
        const userRegister = {
            ...user,
            email: `carlos.santos.${Date.now()}@test.com`
        }

        register.startRegistration(userRegister.name, userRegister.email)

        register.fillAndSubmitRegistrationForm(userRegister)

        register.validateAccountCreatedSuccessfullyAndLoggedIn(userRegister.name)
    })

    it('Test Case 5: Register User with existing email', () => {
        const userRegister = {
            ...user,
            email: Cypress.env('userEmail')
        }

        register.startRegistration(userRegister.name, userRegister.email)

        register.validateEmailAlreadyExistsMessage()
    })

})

describe('Login', () => {

    beforeEach(() => {
        header.visitSignupLoginPage()
    })

    it('Test Case 2: Login User with correct email and password', () => {
        login.performLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))

        header.validateUserIsLoggedIn(Cypress.env('userName'))
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
        login.performLogin('404@test.com', 'BUG')

        login.validateLoginFormErrorMessage()
    })

})

describe('Logout', () => {

    it('Test Case 4: Logout User', () => {
        header.visitSignupLoginPage()
        login.performLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))
        header.validateUserIsLoggedIn(Cypress.env('userName'))

        cy.get('a[href="/logout"]').click()

        login.validateIsOnSignupLoginPage()
    })

})

describe('Product', () => {

    beforeEach(() => {
        header.visitSignupLoginPage()
        login.performLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))
        header.visitProductsPage()
    })

    it('Test Case 8: Verify All Products and product detail page', () => {
        products.validateAllProductsAreVisible()

        products.clickViewProductOfFirstProduct()

        products.validateProductDetailsAreVisible(productDetails)
    })

    it('Test Case 9: Search Product', () => {
        products.searchProduct(productDetails.name)

        products.validateAllProductsRelatedToSearchAreVisible(productDetails.name)
    })

})

describe('Subscription', () => {

    it('Test Case 10: Verify Subscription in home page', () => {
        header.visitHomePage()
        footer.scrollToSubscription()

        footer.submitSubscription(Cypress.env('userEmail'))

        footer.validateSubscriptionSuccessMessageIsVisible()
    })

})

describe('Place Order', () => {

    it('Test Case 15: Place Order: Register before Checkout', () => {
        const userRegister = {
            ...user,
            email: `carlos.santos.${Date.now()}@test.com`
        }

        header.visitSignupLoginPage()
        register.registerUser(userRegister)

        products.addProductsToCart()

        header.visitCartPage()
        cart.proceedToCheckout()

        checkout.validateCheckoutAddresses(userRegister)
        checkout.validateCheckoutProducts(checkoutProducts)

        const text = 'Pedido de teste automatizado. Por favor, entregar em horário comercial.'
        checkout.fillCommentAndPlaceOrder(text)

        payment.fillPaymentAndConfirm(paymentData)
        payment.validateOrderConfirmation()
    })

    it('Test Case 16: Place Order: Login before Checkout', () => {
        header.visitSignupLoginPage()
        login.performLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))
        header.validateUserIsLoggedIn(Cypress.env('userName'))

        header.visitCartPage()
        cart.deleteAllCartItems()
        header.visitHomePage()

        products.addProductsToCart()

        header.visitCartPage()
        cart.proceedToCheckout()

        checkout.validateCheckoutAddresses(checkoutAddresses)
        checkout.validateCheckoutProducts(checkoutProducts)

        const text = 'Pedido de teste automatizado. Por favor, entregar em horário comercial.'
        checkout.fillCommentAndPlaceOrder(text)

        payment.fillPaymentAndConfirm(paymentData)
        payment.validateOrderConfirmation()
    })

})

