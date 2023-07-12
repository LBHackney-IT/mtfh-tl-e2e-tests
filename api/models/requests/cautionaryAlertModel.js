const { faker } = require("@faker-js/faker");

export const cautionaryAlert = (person, asset) => ({
  assureReference: "121212",
  incidentDate: "2023-02-02",
  incidentDescription: "This was a test of our emergency preparedness.",
  alert: {
      code: "AND",
      description: "Dangerous Animals"
  },
  assetDetails: {
      id: asset.id,
      propertyReference: asset.assetId,
      uprn: faker.random.numeric(12),
      fullAddress: asset.assetAddress.addressLine1
        + asset.assetAddress.addressLine2
        + asset.assetAddress.addressLine3
        + asset.assetAddress.postCode
  },
  personDetails: {
      id: person.id,
      name: `${person.firstName} ${person.surname}`
  }
});