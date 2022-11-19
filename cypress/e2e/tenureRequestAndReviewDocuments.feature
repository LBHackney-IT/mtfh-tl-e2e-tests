Feature: As an internal Hackney user
  I want to request relevant supporting documents from both Sole to Joint applicants (the existing tenant and the new tenant)
  So that I can evidence that the applicant is eligible and
  I want to confirm that all relevant supporting documents have been uploaded for a Sole to Joint application
  So that I can evidence that the applicant is eligible


  Background:
    Given I am logged in
    And I seeded the database

  @SmokeTest
  Scenario: AC1. View Request for Documents page
    Given the application has passed eligibility and the housing officer breach of tenancy checks for the tenure
    When I click the Next button
    Then Request Documents page is displayed with success message for "Eligibility checks passed"
    And "Supporting documents" text is displayed
    And "Checking supporting documents" text and Resident's contact details are displayed
    And a radio button to automatically request the documents on DES is displayed
    And a radio button to make an appointment to review the Supporting documents is displayed
    When I have not selected any of the radio button options but selected Tenant declaration
    And I click on Next button
    Then error message is displayed
    When I have selected electronically requesting the documents via DES
    And I have confirmed Tenant Declaration
    Then I have proceeded to the next step
    And I am able to see the "Review Documents" state is Active
    And a case activity log is created

  @SmokeTest
  Scenario: AC 1.1 Link to current tenant’s person page from Request Documents Page
    Given I am on the Request Documents page for the tenure
    When I click on the current tenant’s name in the heading
    Then I am taken to the current tenant’s person page which will be opened in a new tab

#  Scenario: AC1.2 User has not provided any input and AC2.1 Confirm request of documents electronically via DES
#    Given I am on the Request Documents page for the tenure
#    When I have not selected any of the radio button options
#    Then the option to proceed to the next step is disabled
#    When I have selected electronically requesting the documents via DES
#    And I have confirmed Tenant Declaration
#    Then I have proceeded to the next step
#    And I am able to see the "Review Documents" state is Active
#    And a case activity log is created

  @SmokeTest
  Scenario: AC3. Request documents via office appointment
    Given I am on the Request Documents page for the tenure
    When I select that I have made an appointment to check supporting documents
    And I input the appointment date and time
    And I have confirmed Tenant Declaration
    Then the option to proceed is enabled
    And I am able to see the "Review Documents" state is Active
    And a case activity log is created for "Supporting Documents requested via an office appointment"

  Scenario: AC4. Close case when Breach of tenure checks are failed
    Given the application has passed eligibility and failed the breach of tenancy checks for the tenure
    When I click the next button on breach tenure page
    Then Breach of tenure eligibility checks Failed page is displayed
    When I select the checkbox 'I confirm that an outcome letter has been sent to the resident'
    And I click on the confirm button
    Then 'Thank you for your confirmation' message is displayed with a link to Return to Home page

 #######  The below button functionality has not been developed yet
#  Scenario: AC5. Buttons under the progress indicator
#    Given I am completing a Sole to Joint process
#    Then underneath the progress indicator I will see a number of buttons 'Reassign Case'

  @SmokeTest
  Scenario: AC5. Add or Update the contact Details in Request Documents page
    Given the application has passed eligibility and the housing officer breach of tenancy checks for the tenure
    When I click the Next button
    Then Request Documents page is displayed with success message for "Eligibility checks passed"
    And "Supporting documents" text is displayed
    And Status Stepper is at "Request Documents"
    When I click on the link 'the contact details'
    Then "Update contact details" modal dialog is displayed
    When I enter data email address and phone number
    And the details email address and phone number are displayed
    When I click on the link 'the contact details'
    And I click on Remove email address and Remove phone number
    Then email address and phone number are null
    And I can see the text add the contact details

  Scenario: AC6. Error Validation in Update Contact Details Modal Dialog
    Given the application has passed eligibility and the housing officer breach of tenancy checks for the tenure
    When I click the Next button
    Then Request Documents page is displayed with success message for "Eligibility checks passed"
    And "Supporting documents" text is displayed
    And Status Stepper is at "Request Documents"
    When I click on the link 'the contact details'
    Then "Update contact details" modal dialog is displayed
    When I click on Save email address without entering any data
    Then Validation error message is displayed for email address
    When I click on Save Phone number without entering any data
    Then Validation error message is displayed for phone number

    ##### Review Documents ####
  Scenario: AC7: View review documents screen (documents requested via DES)
    Given I have requested the documents via DES for the tenure
    When I have proceeded to the next step
    Then I view the page
    And a confirmation alert confirming that eligibility checks have been passed
    And a success message for requested documents via DES with a link to DES
    And a checklist of documents that will need to be seen before proceeding
    And the option to arrange an in person appointment to view the documents if necessary
    And guidance text about closing the case due to failing the supporting documents check
    And the ability to close the case at this stage of the process
    And I cannot proceed until all of the check boxes have been ticked

  Scenario: AC8: Request in person appointment (for documents requested via DES)
    Given I would like to check submitted documents in person for tenure
    When I tick the checkbox to arrange an in person appointment to view the documents
    Then I can input an appointment date and time
    And I can confirm the appointment has been arranged

  Scenario: AC9: Confirm documents have been seen (for documents requested via DES)
    Given the documents have been provided by the resident for tenure
    Then Next button is disabled
    When I can complete the checklist of seen supporting documents are correct and valid
    Then Next button is enabled and user can proceed to the next step

  Scenario: AC10: Closing the case at the Review Documents stage
    Given the applicant has failed the supporting documents check for tenure
    When I decide to close the case
    Then an overlay pops up and I must give a reason for rejection
    When I will click on Close case once the rejection is given
    Then I will confirm that the outcome letter has been sent and case will be closed


## Submit Case scenarios below ####
  Scenario: AC11. Submit the case for Tenure investigation review
    Given I have completed document upload for Sole to Joint for tenure
    Then the Active status should be Submit case
    And I am shown the expandable accordions of the previously completed steps Eligibility checks passed and Supporting documents approved
    And I can view the Tenure Investigation disclaimer
    When I click the Submit case button
    Then I am on the Next Steps page
    And the status is Finish
    And I click on Continue button
    And I can see the text 'I confirm that the tenure investigation has been completed'










