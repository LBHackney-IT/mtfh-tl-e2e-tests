const axios = require('axios');
const envConfig = require('../../environment-config')

const config = {
    headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
};

async function getRequest(endpoint) {
    try {
      const response = await axios.post(endpoint, config);
      cy.log('Sending get request')
      return response
    } catch (error) {
      console.error(error);
      return error
    }
}

module.exports = {
    getRequest
}