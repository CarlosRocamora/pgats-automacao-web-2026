/// <reference types="cypress"/>

const cadastro = require('../modules/cadastro/index')

describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('/login')

        cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)

        cadastro.preencherCadastro()

        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    })

    it('Efetuar Login de Usuário com email e senha corretos', () => {
        cy.visit('/login')

        preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345')

        verificarSeLoginFoiEfetuadoComSucesso()
    })

    it('Efetuar Login de Usuário com email e senha INCORRETOS', () => {
        cy.visit('/login')

        preencherLogin('pgats-aut-test-1791030872114@mail.com', '54321')

        verificarSeMensagemDeErroFoiExibidaNoLogin()
    })

    it('Efetuar Logout', () => {
        cy.visit('/login')

        preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345')

        efetuarLogout()

        verificarSeOUsuarioFoiDeslogado()
    })

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('/login')

        cadastro.iniciarCadastro('PGATS Aut', 'pgats-aut-test-1791030872114@mail.com')

        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
    })

})

// Cadastro

// function iniciarCadastro(nome, email) {
//     cy.get('[data-qa="signup-name"]').type(nome)
//     cy.get('[data-qa="signup-email"]').type(email)

//     cy.get('[data-qa="signup-button"]').click()
// }

// function preencherCadastro() {
//     cy.get('#id_gender2').check()

//     cy.get('[data-qa="password"]').type('12345')

//     cy.get('[data-qa="days"]').select('1')
//     cy.get('[data-qa="months"]').select('September')
//     cy.get('[data-qa="years"]').select('1990')

//     cy.get('#newsletter').check()
//     cy.get('#optin').check()

//     cy.get('[data-qa="first_name"]').type('PGATS')
//     cy.get('[data-qa="last_name"]').type('Aut')
//     cy.get('[data-qa="company"]').type('PGATS')
//     cy.get('[data-qa="address"]').type('Example Address')

//     cy.get('[data-qa="country"]').select('United States')

//     cy.get('[data-qa="state"]').type('California')

//     cy.get('[data-qa="city"]').type('San Francisco')

//     cy.get('[data-qa="zipcode"]').type('12345')

//     cy.get('[data-qa="mobile_number"]').type('13999999999')

//     cy.get('[data-qa="create-account"]').click()
// }

// function verificarSeCadastroFoiEfetuadoComSucesso() {
//     cy.get('[data-qa="account-created"]')
//         .should('be.visible')
//         .and('contain', 'Account Created!')
// }

// function verificarSeMensagemDeCadastroExistenteFoiExibida() {
//     cy.get('form[action*=signup] p')
//         .should('exist')
//         .should('be.visible')
//         .should('contain', 'Email Address already exist!')
//         .and('contain.text', 'Email Address already exist!')
// }

// Login

function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiEfetuadoComSucesso() {
    cy.contains('.navbar-nav li', 'PGATS Aut')

    cy.get('.navbar-nav li')
        .contains('PGATS Aut')
        .should('be.visible')
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
        .and('contain.text', 'Your email or password is incorrect!')
}

function efetuarLogout() {
    cy.get('a[href*="logout"]')
        .should('be.visible')
        .click()
}

function verificarSeOUsuarioFoiDeslogado() {
    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include', 'login')
}



