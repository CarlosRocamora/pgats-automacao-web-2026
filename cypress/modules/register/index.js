const header = require('../header/index.js')

function startRegistration(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
}

function fillAndSubmitRegistrationForm(userSignup) {
    cy.contains('h2', 'Enter Account Information', {
        timeout: 20000
    }).should('be.visible')

    cy.get('#id_gender1').check()

    cy.get('[data-qa="name"]')
        .should('be.visible')
        .and('have.value', userSignup.name)

    cy.get('[data-qa="email"]')
        .should('be.visible')
        .and('have.value', userSignup.email)

    cy.get('[data-qa="password"]').type(userSignup.password)

    cy.get('[data-qa="days"]').select(userSignup.dateOfBirth.day)
    cy.get('[data-qa="months"]').select(userSignup.dateOfBirth.month)
    cy.get('[data-qa="years"]').select(userSignup.dateOfBirth.year)

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type(userSignup.firstName)
    cy.get('[data-qa="last_name"]').type(userSignup.lastName)
    cy.get('[data-qa="company"]').type(userSignup.company)
    cy.get('[data-qa="address"]').type(userSignup.address)
    cy.get('[data-qa="address2"]').type(userSignup.address2)
    cy.get('[data-qa="country"]').select(userSignup.country)
    cy.get('[data-qa="state"]').type(userSignup.state)
    cy.get('[data-qa="city"]').type(userSignup.city)
    cy.get('[data-qa="zipcode"]').type(userSignup.zipcode)
    cy.get('[data-qa="mobile_number"]').type(userSignup.mobileNumber)

    cy.get('[data-qa="create-account"]').click()
}

function registerUser(userRegister) {
    startRegistration(userRegister.name, userRegister.email)

    fillAndSubmitRegistrationForm(userRegister)

    validateAccountCreatedSuccessfullyAndLoggedIn(userRegister.name)
}

function validateAccountCreatedSuccessfullyAndLoggedIn(name) {
    cy.contains('h2', 'Account Created!')
        .should('be.visible')

    cy.contains(
        'p',
        'Congratulations! Your new account has been successfully created!'
    ).should('be.visible')

    cy.get('[data-qa="continue-button"]').click()

    header.validateUserIsLoggedIn(name)
}

function validateSignupLoginPage() {
    cy.contains('h2', 'Login to your account', {
        timeout: 20000
    }).should('be.visible')

    cy.contains('h2', 'New User Signup!', {
        timeout: 20000
    }).should('be.visible')
}

function validateEmailAlreadyExistsMessage() {
    cy.get('.signup-form p')
        .should('be.visible')
        .and('have.text', 'Email Address already exist!')
}

module.exports = {
    startRegistration,
    fillAndSubmitRegistrationForm,
    registerUser,
    validateAccountCreatedSuccessfullyAndLoggedIn,
    validateSignupLoginPage,
    validateEmailAlreadyExistsMessage
}