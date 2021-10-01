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

async function patchRequest(endpoint, payload, ifMatch) {
  const patchConfig = {
    headers: { 'If-Match': ifMatch, Authorization: `Bearer ${envConfig.gssoTestKey}` }
  };
    try {
      const response = await axios.patch(endpoint, payload, patchConfig);
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

async function deleteRequest(endpoint) {
  try {
    const response = await axios.delete(endpoint, config);
    cy.log('Sending delete request')
    return response
  } catch (error) {
    console.error(error);
    return error
  }
}

module.exports = {
    getRequest,
    patchRequest,
    postRequest,
    deleteRequest
}
