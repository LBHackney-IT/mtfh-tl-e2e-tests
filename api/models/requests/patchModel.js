import { faker } from '@faker-js/faker';


export const patch = {
  "id": faker.datatype.uuid(),
  "domain": "MMH",
  "name": "E2E",
  "parentId": faker.datatype.uuid(),
  "patchType": "patch",
  "responsibleEntities": [{
    "name": faker.name.fullName(),
    "responsibleType": "HousingOfficer",
    "id": faker.datatype.uuid(),
  }],
  "versionNumber": 0,
};