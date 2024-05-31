import { And, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CautionaryAlertsPageObjects from '../../pageObjects/cautionaryAlertsPage';
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";

const cautionaryAlertPO = new CautionaryAlertsPageObjects();
const tenureReqDocsPO = new TenureRequestDocsPageObjects();

When("I click on Add cautionary alert link", () => {
    cautionaryAlertPO.addCautionaryAlertLink().click();
});
Then("I am taken to the Add cautionary alert page", () => {
    cautionaryAlertPO.pageHeaderCautionaryAlert().should('contain', 'Add cautionary alert for')
});
When("I enter Assure reference", () => {
    cautionaryAlertPO.assureReference().type('121212');
});
And("I enter Date of Incident as Day Month and Year", () => {
    tenureReqDocsPO.day().clear().type('01');
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear().type('2022');
});
And("select Type of Caution", () => {
    // cautionaryAlertPO.typeOfCaution().select('Verbal abuse');
    cautionaryAlertPO.typeOfCaution().select('No Lone Visits');
});
And("I enter Description of Incident", () => {
    cautionaryAlertPO.descriptionOfIncident().clear().type('This is a test incident for verbal abuse happened on the date above')
});
And("I click on Save and Continue button", () => {
    cy.contains('Save and continue').click();
});

Then("Validation error messages is displayed for Assure reference", () => {
    cautionaryAlertPO.assureReferenceFieldErrorMessg().should('contain', 'Enter an Assure reference');
});
And("Validation error messages is displayed for Date of Incident", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain', 'Enter date of incident');
});
And("Validation error messages is displayed for Type of Caution", () => {
    cautionaryAlertPO.selectTypeOfCautionFieldErrorMessg().should('contain', 'Select a type of caution');
});
And("Validation error messages is displayed for Description of Incident", () => {
    cautionaryAlertPO.descriptionOfIncidentFieldErrorMessg().should('contain', 'Enter description of incident');
});
And("I enter only Day for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('10');
});
Then("Validation error messages is displayed for Month and Year", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must include a month and year')
});
When("I enter only Day and Month for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('01');
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear();
});
Then("Validation error messages is displayed for Year", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must include a year');
});
When("I enter only Day and Year for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('10');
    tenureReqDocsPO.month().clear();
    tenureReqDocsPO.year().clear().type('2022');
});
Then("Validation error messages is displayed for Month", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must include a month');
});
When("I enter only Month and Year for Date of Incident", () => {
    tenureReqDocsPO.day().clear();
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear().type('2022');
});
Then("Validation error messages is displayed for Day", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must include a day');
});
When("I enter Future date", () => {
    tenureReqDocsPO.day().clear().type('10');
    tenureReqDocsPO.month().clear().type('06');
    tenureReqDocsPO.year().clear().type('2040');
});
Then("Validation error message is displayed for Future date", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must be today or in the past');
});
Then("I am on Check and confirm cautionary alert page", () => {
    cautionaryAlertPO.pageHeaderCautionaryAlert().should('contain.text', 'Check and confirm cautionary alert for');
});
And("the Cautionary alert details are displayed", () => {
    cy.contains('Assurance Reference');
    cy.get(':nth-child(1) > .govuk-summary-list__value').should('contain.text', 121212);
    cy.contains('Date of incident');
    cy.get(':nth-child(2) > .govuk-summary-list__value').should('contain.text', '01 12 2022');
    cy.contains('Type of caution');
    //cy.get(':nth-child(3) > .govuk-summary-list__value').should('contain.text','Verbal Abuse');
    cy.get(':nth-child(3) > .govuk-summary-list__value').should('contain.text', 'No Lone Visits');
    cy.contains('Description');
    cy.get(':nth-child(4) > .govuk-summary-list__value').should('contain.text', 'This is a test incident for verbal abuse happened on the date above');
});
When("I click on Save cautionary alert button", () => {
    cy.intercept('POST', `${Cypress.env('CAUTIONARY_ALERT_ENDPOINT')}/cautionary-alerts/`).as('createCautionaryAlert')
    cy.contains('Save cautionary alert').click();
    cy.wait('@createCautionaryAlert')
});
And("I can see the section Cautionary Alerts with a Red bell icon", () => {
    cautionaryAlertPO.redBellIconAlert().should('exist');
});
And("I can see the Cautionary Alert type with the new value", () => {
    cy.contains('Dangerous Animals');
})
And('I can see the Cautionary Alert type', () => {
    // cy.contains('Verbal Abuse');
    cy.contains('No Lone Visits');
});
And("I can see the Red Bell icon next to the person name", () => {

});

When("I click on Change link for {string}", (text) => {
    switch (text) {
        case 'Assurance reference number': {
            cautionaryAlertPO.changeLinkAssuranceRef().click();
            break;
        }
        case 'Date of incident': {
            cautionaryAlertPO.changeLinkDateOfIncident().click();
            break;
        }
        case 'Type of caution': {
            cautionaryAlertPO.changeLinkTypeOfCaution().click();
            break;
        }
        case 'Description': {
            cautionaryAlertPO.changeLinkDescription().click();
            break;
        }

    }

});
When("I update the {string} with a new value", (text) => {
    switch (text) {
        case 'Assurance reference number': {
            cautionaryAlertPO.assureReference().type('98');
            break;
        }
        case 'Date of incident': {
            tenureReqDocsPO.day().clear().type('02');
            tenureReqDocsPO.month().clear().type('02');
            tenureReqDocsPO.year().clear().type('2022');
            break;
        }
        case 'Type of caution': {
            cautionaryAlertPO.typeOfCaution().select('Dangerous Animals');
            break;
        }
        case 'Description': {
            cautionaryAlertPO.descriptionOfIncident().clear().type('This is an update to the previous test incident');
            break;
        }
    }

});


And("I can see the {string} is updated with the new value", (text) => {
    switch (text) {
        case 'Assurance reference number': {
            cy.contains('Assurance Reference');
            cy.get(':nth-child(1) > .govuk-summary-list__value').should('contain.text', 12121298);
            break;
        }
        case 'Date of incident': {
            cy.contains('Date of incident');
            cy.get(':nth-child(2) > .govuk-summary-list__value').should('contain.text', '02 02 2022');
            break;
        }
        case 'Type of caution': {
            cy.contains('Type of caution');
            cy.get(':nth-child(3) > .govuk-summary-list__value').should('contain.text', 'Dangerous Animals');
            break;
        }
        case 'Description': {
            cy.contains('Description');
            cy.get(':nth-child(4) > .govuk-summary-list__value').should('contain.text', 'This is an update to the previous test incident');
            break;
        }
    }

})



//the below code is for Discretion alerts
// import {Given, When, Then, And} from "@badeball/cypress-cucumber-preprocessor"
// import PersonPageObjects from "../../pageObjects/personPage";
// import PropertyPageObjects from "../../pageObjects/propertyPage";
// import TenurePageObjects from "../../pageObjects/tenurePage";
// const personPage = new PersonPageObjects();
// const propertyPage = new PropertyPageObjects();
// const tenurePage = new TenurePageObjects();
//
//
// Given('A person {string} has a discretion alert assigned to them', (person) => {
//     personPage.visit(person);
// });
// When('I view the persons profile page',
//     () => {
//         const input = cy.get('.lbh-heading-h1');
//         input.should('be.visible').and(($input) => {
//             expect($input).to.have.value('');
//         })
//     });
// Then('I will be able to view a RED bell next to "Discretion alert"', () => {
//     personPage.discretionAlertPerson().should('exist');
// });
//
// When('I click on the accordion element', () => {
//     personPage.discretionAlertPerson().click();
// });
//
// Then('discretion type {string} and the description {string} are displayed', (type,description) => {
//     cy.findAllByText(type).should('exist');
//     cy.findAllByText(description).should('exist');
// });
// Given('A property {string} has a person with a discretion alert assigned to them', (property) => {
//     propertyPage.visit(property);
// });
// When('I view a property profile page', () => {
//     cy.findAllByText("Gge 23 Morris Blitz Court Foulden Road Hackney London N16 7UJ").should('exist');
// });
//
// Given('A tenure {string} has a person {string} with a discretion alert assigned to them', (tenure, person) => {
//     tenurePage.visit(tenure);
// });
// When('I view a tenure profile page', () => {
//     cy.findAllByText('Tenure payment reference: 8845021610');
// });
// Then('I will be able to see the RED caution bell next to the property name', () => {
//     tenurePage.tenureAlert().should('be.visible');
// });
// And('I will be able to see the RED discretion alert next to the person name', () => {
//     personPage.personAlert().should('be.visible');
// });
