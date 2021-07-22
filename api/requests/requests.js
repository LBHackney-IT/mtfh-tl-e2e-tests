const axios = require('axios');
const envConfig = require('../../environment-config')

const config = {
    headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
};

async function getRequest(endpoint) {
    try {
      const response = await axios.get(endpoint, config);
      cy.log('Sending get request')
      return response
    } catch (error) {
      console.error(error);
      return error
    }
}

async function patchRequest(endpoint, payload) {
    try {
      const response = await axios.patch(endpoint, payload, config);
      cy.log('Sending patch request')
      return response
    } catch (error) {
      console.error(error);
      return error
    }
}

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
    getRequest,
    patchRequest,
    postRequest
}
