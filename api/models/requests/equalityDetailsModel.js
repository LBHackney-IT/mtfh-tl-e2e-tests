import { faker } from '@faker-js/faker';

export const generateEqualityInformation = (relatedPersonGuid = faker.datatype.uuid()) => {
    return {
        "targetId": relatedPersonGuid,
        "id": faker.datatype.uuid(),
        "ageGroup": null,
        "caringResponsibilities": {
            "provideUnpaidCare": null,
            "hoursSpentProvidingUnpaidCare": null
        },
        "disabled": null,
        "ethnicity": {
            "ethnicGroupValue": null,
            "ethnicGroupValueIfOther": null
        },
        "gender": {
            "genderValue": null,
            "genderValueIfOther": null,
            "genderDifferentToBirthSex": null
        },
        "religionOrBelief": {
            "religionOrBeliefValue": null,
            "religionOrBeliefValueIfOther": null
        },
        "sexualOrientation": {
            "sexualOrientationValue": null,
            "sexualOrientationValueIfOther": null
        },
        "pregnancyOrMaternity": [
            {
                "pregnancyDate": null,
                "pregnancyValidUntil": null
            }
        ],
        "nationality": null,
        "marriageOrCivilPartnership": {
            "married": null,
            "civilPartnership": null
        },
        "languages": [],
        "nationalInsuranceNumber": null,
        "communicationRequirements": [],
        "economicSituation": {
            "economicSituationValue": null,
            "economicSituationValueIfOther": null
        },
        "homeSituation": {
            "homeSituationValue": null,
            "homeSituationValueIfOther": null
        },
        "armedForces": null
    }
}