/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { getConfiguration } = require("./configuration")
const fs = require('fs')
const readline = require('readline');

module.exports = async (on, config) => {
  // config.featureToggles = (await getConfiguration(config.env)) || {};
  // on("before:browser:launch", (browser = {}, launchOptions) => {
  // // prepareAudit(launchOptions);
  // });
  on('task', {
    writeTenureTestFile(id) {
      //fs.writeFileSync('./cypress/fixtures/tenureTestData.txt', id)
      fs.appendFileSync('./cypress/fixtures/tenureTestData.txt', `${id},`)
      return null
    },
  });

  // on('task', {
  //   async readLineByLineFromFile() {
    
  //     var fileStream = fs.createReadStream('./cypress/fixtures/tenureTestData.txt');
  //     var rl = readline.createInterface({
  //       input: fileStream,
  //       crlfDelay: Infinity
  //     });
  //     var line
  //     for await(line of rl){
  //       console.log('Line from file: ', line)
  //     }
  //     return line
  //   },
  // });

  on('task', {
     readIdFromFile() {
      var data = fs.readFile('./cypress/fixtures/tenureTestData.txt');
      console.log('data from plugin', data);  


      // try {  
      //   var data = fs.readFileSync('./cypress/fixtures/tenureTestData.txt', 'utf8');
      //   console.log('data from plugin', data);    
      // } catch(e) {
      //   cy.log('Error:', e.stack);
      // }
      return null;
    },
  });

  on("file:preprocessor", cucumber());

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport);
    }),
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });
  return config;
};

