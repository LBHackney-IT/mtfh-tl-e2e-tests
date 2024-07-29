import faker from 'faker';

export const changeOfName_Start = (targetId) => {
    return {
        "id": faker.datatype.uuid(),
        "targetId": targetId,
        "targetType": "person",
        "relatedEntities": [],
        "processName": "changeofname",
        "patchAssignment": null,
        "currentState": {
            "state": "EnterNewName",
            "permittedTriggers": [
                "EnterNewName"
            ],
            "assignment": {
                "type": null,
                "value": null,
                "patch": "tenants"
            },
            "processData": {
                "formData": null,
                "documents": null
            },
            "createdAt": "2022-09-15T13:25:19.4886596Z",
            "updatedAt": "2022-09-15T13:25:19.4886597Z"
        },
        "previousStates": []
    }
}

export const changeOfName_NameSubmitted = (targetId) =>  {
    return {
        "id": faker.datatype.uuid(),
        "targetId": targetId,
        "targetType": "person",
        "relatedEntities": [],
        "processName": "changeofname",
        "patchAssignment": null,
        "currentState": {
            "state": "NameSubmitted",
            "permittedTriggers": [
                "RequestDocumentsDes",
                "RequestDocumentsAppointment",
                "CancelProcess"
            ],
            "assignment": {
                "type": null,
                "value": null,
                "patch": "tenants"
            },
            "processData": {
                "formData": {
                    "title": "Mr",
                    "firstName": "Automation Test Edit First Name",
                    "surname": "Automation Test Edit Last Name"
                },
                "documents": []
            },
            "createdAt": "2022-09-15T13:25:23.4430872Z",
            "updatedAt": "2022-09-15T13:25:23.4430873Z"
        },
        "previousStates": [
            {
                "state": "EnterNewName",
                "permittedTriggers": [
                    "EnterNewName"
                ],
                "assignment": {
                    "type": null,
                    "value": null,
                    "patch": "tenants"
                },
                "processData": {
                    "formData": null,
                    "documents": null
                },
                "createdAt": "2022-09-15T13:25:19.4886596Z",
                "updatedAt": "2022-09-15T13:25:19.4886597Z"
            }
        ]
    }
}

