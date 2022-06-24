Feature: As a Housing Officer
         I want to confirm a tenure investigation has been completed
         So that I can make a decision on the sole to joint application

  Background:
    Given I am logged in

  Scenario Outline: AC1: Confirmation of completed tenure investigation
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