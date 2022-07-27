Feature: As a Housing Officer
  I want to confirm a tenure investigation has been completed
  So that I can make a decision on the sole to joint application

  Background:
    Given I am logged in
#
#  Scenario Outline: AC1: View the Confirmation of completed tenure investigation page
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    And I am not able to choose the recommendation until I have ticked the box
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    Then I am able to choose which recommendation the tenure investigator has given Approve Decline or Appointment
#    And case activity log is recorded
#    And the progress indicator is still in "Review Application"
#    Examples:
#      | tenure                               |
#      | dfaab345-18b3-2907-ab75-25b5b5904c93 |
##      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |
## the above example has been commented as the data clean up is not happening.
#
#  Scenario Outline: Tenure Investigation recommendation - Approve, HO Review - Approve application
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    And I select the recommendation as 'Approve'
#    And I select the option pass the case to Area Housing Manager
#    And the decision is selected as 'Approve'
#    And I confirm the instruction is received by Area Housing Manager
#    And I enter Area Housing Manager's name
#    And I click on Confirm button
#    Then model dialog is displayed
#    And I select Approve
#    Then Sole to joint application approved text is displayed
#    When I enter data and time and click Continue button
#    Then Office appointment scheduled message is displayed
#    Examples:
#      | tenure                               |
#      | dfaab345-18b3-2907-ab75-25b5b5904c93 |
#
#  Scenario Outline: Tenure Investigation recommendation - Appointment, HO Review - Approve application
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    And I select the recommendation as 'Appointment'
#    And I select the option pass the case to Area Housing Manager
#    And the decision is selected as 'Approve'
#    And I confirm the instruction is received by Area Housing Manager
#    And I enter Area Housing Manager's name
#    And I click on Confirm button
#    Then model dialog is displayed with message 'Tenure investigator recommendation: Interview Applicant'
#    When I enter Reason for Approval
#    When I select Approve
#    Then Sole to joint application approved text is displayed
#    When I enter data and time and click Continue button
#    Then Office appointment scheduled message is displayed
#    Then Office appointment scheduled message is displayed
#    Examples:
#      | tenure                               |
#      | dfaab345-18b3-2907-ab75-25b5b5904c93 |
#
#  Scenario Outline: Tenure Investigation recommendation - Decline, HO Review - Approve application
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    And I select the recommendation as 'Decline'
#    And I select the option pass the case to Area Housing Manager
#    And the decision is selected as 'Approve'
#    And I confirm the instruction is received by Area Housing Manager
#    And I enter Area Housing Manager's name
#    And I click on Confirm button
#    Then model dialog is displayed with message 'Tenure investigator recommendation: Decline application'
#    When I enter Reason for Approval
#    When I select Approve
#    Then Sole to joint application approved text is displayed
#    When I enter data and time and click Continue button
#    Then Office appointment scheduled message is displayed
#    Examples:
#      | tenure                               |
#      | dfaab345-18b3-2907-ab75-25b5b5904c93 |
#
#  Scenario Outline: Tenure Investigation recommendation - Approve, HO Review - Decline application
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    And I select the recommendation as 'Approve'
#    And I select the option pass the case to Area Housing Manager
#    And the decision is selected as 'Decline'
#    And I confirm the instruction is received by Area Housing Manager
#    And I enter Area Housing Manager's name
#    And I click on Confirm button
#    Then model dialog is displayed
#    When I enter Reason for Rejection
#    And I click Decline button
#    Then 'Sole to joint tenure application declined' text is displayed
#    And 'Sole to joint application will be closed' text is displayed
#    And 'I confirm that an outcome letter has been sent to the resident' text is displayed
#    Examples:
#      | tenure                               |
#      | dfaab345-18b3-2907-ab75-25b5b5904c93 |