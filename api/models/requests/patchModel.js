import { faker } from '@faker-js/faker';

export const patch = {
  "id": "e611b1af-e2cc-45ee-8f17-cd8c09307121",
  "domain": "MMH",
  "name": "SH1",
  "parentId": "3887a798-1e38-4265-9279-bd8097d23b8d",
  "patchType": "patch",
  "responsibleEntities": [{
    "name": faker.name.fullName(),
    "responsibleType": "HousingOfficer",
    "id": faker.datatype.uuid(),
  }],
  "versionNumber": 0,
};