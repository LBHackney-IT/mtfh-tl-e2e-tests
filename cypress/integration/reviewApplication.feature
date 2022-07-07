Feature: As a Housing Officer
  I want to confirm a tenure investigation has been completed
  So that I can make a decision on the sole to joint application

  Background:
    Given I am logged in

  Scenario Outline: AC1: View the Confirmation of completed tenure investigation page
    Given The tenure investigation has been completed for tenure "<tenure>"
    And I am not able to choose the recommendation until I have ticked the box
    When I tick the box "I confirm that the tenure investigation has been completed"
    Then I am able to choose which recommendation the tenure investigator has given Approve Decline or Appointment
    And I can see Next steps Make an appointment or pass the case to Housing Manager
    And case activity log is recorded
    And the progress indicator is still in "Review Application"
    Examples:
      | tenure                               |
      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |

#  Scenario Outline: Tenure Investigation recommendation - Approve application
#    Given The tenure investigation has been completed for tenure "<tenure>"
#    When I tick the box "I confirm that the tenure investigation has been completed"
#    And I select the recommendation as 'Approve'
#    Then I can see Next steps Make an appointment or pass the case to Housing Manager
#    And I can see the text 'Tenure investigator recommendation: approve application'
#    And case activity log is recorded
#    And the progress indicator is still in "Review Application"
#    When I select the option 'Make an appointment with the applicant for an interview'
#    And I enter Interview date and time
#    Then Confirm button is enabled
#    When I click on Confirm button
#    Then the text 'Sole to Joint application approved, next steps:' is displayed
#    And the message 'Office appointment scheduled' is displayed
#    And after the scheduled time the Documents signed button is enabled
#    When I click on Documents signed button
#    Then Next steps is displayed
#    And Thank you for your confirmation is displayed
#
#    Examples:
#      | tenure                               |
#      | aaaf05fb-6a4d-f6ef-592f-4beccbe62ccb |

