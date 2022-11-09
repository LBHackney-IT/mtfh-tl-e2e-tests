Feature: As an internal Hackney user
  I want to request relevant supporting documents from both Sole to Joint applicants (the existing tenant and the new tenant)
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

  @SmokeTest
  Scenario: AC 1.1 Link to current tenant’s person page from Request Documents Page
    Given I am on the Request Documents page for the tenure
    When I click on the current tenant’s name in the heading
    Then I am taken to the current tenant’s person page which will be opened in a new tab

  Scenario: AC1.2 User has not provided any input and AC2.1 Confirm request of documents electronically via DES
    Given I am on the Request Documents page for the tenure
    When I have not selected any of the radio button options
    Then the option to proceed to the next step is disabled
    When I have selected electronically requesting the documents via DES
    And I have confirmed Tenant Declaration
    Then I have proceeded to the next step
    And I am able to see the "Review Documents" state is Active
    And a case activity log is created

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









