import { getRequest, patchRequest } from "./requests/requests";

const processEndpoint = Cypress.env('PROCESS_ENDPOINT')

const getProcess = async(processId, processName) => {
  const response = await getRequest(`${processEndpoint}/process/${processName}/${processId}`);
  return response
}

const updateProcessFormData = async(processId, processName, formData, ifMatch) => {
    const data = {
        processData: {
            formData: formData
        }
    }

    const response = await patchRequest(`${processEndpoint}/process/${processName}/${processId}`, data, ifMatch);
    return response
}

export {
  getProcess,
  updateProcessFormData
}