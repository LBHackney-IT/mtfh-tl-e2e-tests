/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const {GoogleSocialLogin} = require('cypress-social-logins').plugins
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('task', {
    GoogleSocialLogin: GoogleSocialLogin
  })
}