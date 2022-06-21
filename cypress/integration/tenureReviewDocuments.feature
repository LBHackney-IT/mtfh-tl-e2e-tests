Feature: As an internal Hackney user
         I want to confirm that all relevant supporting documents have been uploaded for a Sole to Joint application
         So that I can evidence that the applicant is eligible

  Background:
    Given I am logged in

  Scenario Outline: AC1: View review documents screen (documents requested via DES)
    Given I have requested the documents via DES for the tenure "<tenure>"
    When I have proceeded to the next step
    Then I view the page
    And a confirmation alert confirming that eligibility checks have been passed
    And a success message for requested documents via DES with a link to DES
    And a checklist of documents that will need to be seen before proceeding
    And the option to arrange an in person appointment to view the documents if necessary
    And guidance text about closing the case due to failing the supporting documents check
    And the ability to close the case at this stage of the process
    And I cannot proceed until all of the check boxes have been ticked
    Examples:
      | tenure                               |
      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |

  Scenario Outline: AC1.1: Request in person appointment (for documents requested via DES)
    Given I would like to check submitted documents in person for tenure "<tenure>"
    When I tick the checkbox to arrange an in person appointment to view the documents
    Then I can input an appointment date and time
    And I can confirm the appointment has been arranged
    Examples:
      | tenure                               |
      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |

  Scenario Outline: AC1.2: Confirm documents have been seen (for documents requested via DES)
    Given the documents have been provided by the resident for tenure "<tenure>"
    Then Next button is disabled
    When I can complete the checklist of seen supporting documents are correct and valid
    Then Next button is enabled and user can proceed to the next step
    Examples:
      | tenure                               |
      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |

  Scenario Outline: AC4: Closing the case at the Review Documents stage
    Given the applicant has failed the supporting documents check for tenure "<tenure>"
    When I decide to close the case
    Then an overlay pops up and I must give a reason for rejection
    When I will click on Close case once the rejection is given
    Then case activity log is recorded with status closed
    Examples:
      | tenure                               |
      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |
