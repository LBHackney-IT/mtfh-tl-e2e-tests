import { faker } from '@faker-js/faker';


export const patch = {
  "id": "124c6809-d27b-40c6-a263-48670e253b2f",
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