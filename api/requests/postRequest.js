const axios = require('axios');
const envConfig = require('../../environment-config')

const config = {
    headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
};

async function postRequest(endpoint, payload) {
    try {
      const response = await axios.post(endpoint, payload, config);
      cy.log('Sending post request')
      return response
    } catch (error) {
      console.error(error);
      return error
    }
}

module.exports = {
    postRequest
}

