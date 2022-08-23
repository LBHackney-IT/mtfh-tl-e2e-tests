Feature: As an internal Hackney user
         I want to confirm that all relevant supporting documents have been uploaded for a Sole to Joint application
         So that I can evidence that the applicant is eligible

  Background:
    Given I am logged in
    And I create a new "SEC" tenure
    And I create person and add to a tenure "true"
    And I create person and add to a tenure ""

  Scenario: AC1: View review documents screen (documents requested via DES)
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

  Scenario: AC1.1: Request in person appointment (for documents requested via DES)
    Given I would like to check submitted documents in person for tenure
    When I tick the checkbox to arrange an in person appointment to view the documents
    Then I can input an appointment date and time
    And I can confirm the appointment has been arranged

  Scenario: AC1.2: Confirm documents have been seen (for documents requested via DES)
    Given the documents have been provided by the resident for tenure
    Then Next button is disabled
    When I can complete the checklist of seen supporting documents are correct and valid
    Then Next button is enabled and user can proceed to the next step

  Scenario: AC4: Closing the case at the Review Documents stage
    Given the applicant has failed the supporting documents check for tenure
    When I decide to close the case
    Then an overlay pops up and I must give a reason for rejection
    When I will click on Close case once the rejection is given
    Then I will confirm that the outcome letter has been sent and case will be closed
#    Then case activity log is recorded with status closed

## Submit Case scenarios below ####
  Scenario: AC1 Submit the case for Tenure investigation review
    Given I have completed document upload for Sole to Joint for tenure
    Then the Active status should be Submit case
    And I am shown the expandable accordions of the previously completed steps Eligibility checks passed and Supporting documents approved
    And I can view the Tenure Investigation disclaimer
    When I click the Submit case button
    Then I am on the Next Steps page
    And the status is Finish
    And I click on Continue button
    And I can see the text 'I confirm that the tenure investigation has been completed'
