const axios = require('axios');
const envConfig = require('../../environment-config')

const config = {
    headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
};

async function patchRequest(endpoint, payload) {
    try {
      const response = await axios.patch(endpoint, payload, config);
      cy.log('Sending post request')
      return response
    } catch (error) {
      console.error(error);
      return error
    }
}

module.exports = {
    patchRequest
}