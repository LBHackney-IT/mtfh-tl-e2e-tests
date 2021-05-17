/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

// dotenv.config()

// const {GoogleSocialLogin} = require('cypress-social-logins').plugins
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  // on('task', {
  //   GoogleSocialLogin: GoogleSocialLogin
  // })
  // config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  // config.env.googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID
  // config.env.googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET

  // return config
}