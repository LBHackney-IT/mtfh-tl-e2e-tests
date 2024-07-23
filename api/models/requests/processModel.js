export const changeOfName = (targetId) =>  {
    return {
        "id": "c7f30ed4-0488-4620-93a4-672dcb4fee8e",
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
