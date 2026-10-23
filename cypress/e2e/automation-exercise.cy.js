/// <reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('/login')

        cy.get('[data-qa="signup-name"]').type('PGATS Aut')
        cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

        cy.get('[data-qa="signup-button"]').click()

        cy.get('#id_gender2').check()

        cy.get('[data-qa="password"]').type('12345')

        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('September')
        cy.get('[data-qa="years"]').select('1990')

        cy.get('#newsletter').check()
        cy.get('#optin').check()

        cy.get('[data-qa="first_name"]').type('PGATS')
        cy.get('[data-qa="last_name"]').type('Aut')
        cy.get('[data-qa="company"]').type('PGATS')
        cy.get('[data-qa="address"]').type('Example Address')

        cy.get('[data-qa="country"]').select('United States')

        cy.get('[data-qa="state"]').type('California')

        cy.get('[data-qa="city"]').type('San Francisco')

        cy.get('[data-qa="zipcode"]').type('12345')

        cy.get('[data-qa="mobile_number"]').type('13999999999')

        cy.get('[data-qa="create-account"]').click()
    })

    it('Efetuar Login de Usuário com email e senha corretos', () => {
        cy.visit('/login')
        cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        cy.get('a > b').should('contain', 'PGATS Aut')

        cy.contains('Logged in as PGATS Auto').should('be.visible')
    })

    it('Efetuar Login de Usuário com email e senha INCORRETOS', () => {
        cy.visit('/login')

        cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        cy.get('form[action*="login"] > p')
            .should('contain', 'Your email or password is incorrect!')
    })

    it('Efetuar Logout', () => {
        cy.visit('/login')
        
        cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        cy.get('a[href*="logout"]')
            .should('be.visible')
            .click()

        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible')
        cy.url().should('include', 'login')
    })

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('/login')

        cy.get('[data-qa="signup-name"]').type('PGATS Aut')
        cy.get('[data-qa="signup-email"]').type('pgats-aut-test-1791030872114@mail.com')

        cy.get('[data-qa="signup-button"]').click()

        cy.get('form[action*=signup] p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
    })

})

