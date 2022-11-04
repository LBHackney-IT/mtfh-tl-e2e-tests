Feature: As a Housing Officer
  I want to confirm a tenure investigation has been completed
  So that I can make a decision on the sole to joint application

  Background:
    Given I am logged in
    And I seeded the database

  Scenario: AC1: View the Confirmation of completed tenure investigation page
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    Then I am able to choose which recommendation the tenure investigator has given Approve Decline or Appointment
    And the progress indicator is still in "Review Application"

  Scenario: Tenure Investigation recommendation - Approve, HO Review - Approve application
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    And I select the recommendation as 'Approve'
    And I select the option pass the case to Area Housing Manager
    And the decision is selected as 'Approve'
    And I confirm the instruction is received by Area Housing Manager
    And I enter Area Housing Manager's name
    And I click on Confirm button
    Then Sole to joint application approved text is displayed
    And "Approve" status box is displayed ""
    When I enter data and time and click Continue button
    Then Office appointment scheduled message is displayed

  Scenario Outline: Tenure Investigation recommendation - Appointment, HO Review - Approve application
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    And I select the recommendation as 'Appointment'
    And I select the option pass the case to Area Housing Manager
    And the decision is selected as 'Approve'
    And I confirm the instruction is received by Area Housing Manager
    And I enter Area Housing Manager's name
    And I click on Confirm button
    Then model dialog is displayed with message 'Tenure investigator recommendation: Interview Applicant'
    When I enter "Reason for Approval" "<reason>"
    Then Sole to joint application approved text is displayed
    And "Approve" status box is displayed "<reason>"
    When I enter data and time and click Continue button
    Then Office appointment scheduled message is displayed
    Examples:
      | reason                                                      |
      | I have checked the documents and approving this application |

  Scenario Outline: Tenure Investigation recommendation - Decline, HO Review - Approve application
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    And I select the recommendation as 'Decline'
    And I select the option pass the case to Area Housing Manager
    And the decision is selected as 'Approve'
    And I confirm the instruction is received by Area Housing Manager
    And I enter Area Housing Manager's name
    And I click on Confirm button
    Then model dialog is displayed with message 'Tenure investigator recommendation: Decline application'
    When I enter "Reason for Approval" "<reason>"
    Then Sole to joint application approved text is displayed
    And "Approve" status box is displayed "<reason>"
    When I enter data and time and click Continue button
    Then Office appointment scheduled message is displayed
    Examples:
    | reason                                                      |
    | I have checked the documents and approving this application |

  Scenario Outline: Tenure Investigation recommendation - Approve, HO Review - Decline application
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    And I select the recommendation as 'Approve'
    And I select the option pass the case to Area Housing Manager
    And the decision is selected as 'Decline'
    And I confirm the instruction is received by Area Housing Manager
    And I enter Area Housing Manager's name
    And I click on Confirm button
    Then model dialog is displayed
    When I enter "Reason for Rejection" "<reason>"
    And I click Decline button
    Then "Decline" status box is displayed "<reason>"
    And 'Sole to joint application will be closed' text is displayed
    And 'I confirm that an outcome letter has been sent to the resident' text is displayed
    Examples:
      | reason                                                                   |
      | I disagree with the Tenure Officer approval as the docs are not original |
