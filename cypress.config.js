const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Relatório de Testes',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },

  env: {
    userName: process.env.USER_NAME,
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD,
  },
});