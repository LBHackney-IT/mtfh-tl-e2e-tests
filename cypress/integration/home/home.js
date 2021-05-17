import { Given } from "cypress-cucumber-preprocessor/steps";
import HomePageObjects from '../../pageObjects/homePage';
const envConfig = require('../../../environment-config')

const homePage = new HomePageObjects()

Given('I am on the Home page', () => {
    homePage.visit()
    homePage.iAmOnTheHomePage()
})

// import 'cypress-localstorage-commands'

// before(() => {
//   describe('Login through Google', () => {
//     const username = Cypress.env('USERNAME')
//     const password = Cypress.env('PASSWORD')
//     const loginUrl = envConfig.baseUrl
//     const localStorageItem = Cypress.env('lsdItemName')
//     const socialLoginOptions = {
//       username: username,
//       password: password,
//       loginUrl: loginUrl,
//       headless: false,
//       logs: true,
//       loginSelector: '[class="govuk-button lbh-button"]',
//       postLoginSelector: '[class="lbh-link lbh-signout"]'
//     }

//     cy.clearLocalStorageSnapshot()

//     return cy.task('GoogleSocialLogin', socialLoginOptions).then(({lsd}) => {
//       const hasLsd = Object.keys(lsd)
//         .filter(item => item === localStorageItem)
//         .pop()

//       if (hasLsd) {
//         cy.window().then(() => {
//           Object.keys(lsd).forEach(key => {
//             cy.setLocalStorage(key, lsd[key])
//           })
//         })

//         cy.saveLocalStorage()
//       }
//     })
//   })
// })

// beforeEach(() => {
//   cy.restoreLocalStorage()
// })

// afterEach(() => {
//   cy.saveLocalStorage()
// })