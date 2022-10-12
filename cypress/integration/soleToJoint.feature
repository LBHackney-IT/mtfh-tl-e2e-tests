Feature: As an internal Hackney user
  I want to be able to initiate a sole to joint process from the processes page,
  via the tenure page
  So that I can complete sole to joint process for a tenure

  Background:
    Given I am logged in
    And I create a new "SEC" tenure
    And I create person and add to a tenure "true"
    And I create person and add to a tenure ""

  Scenario: AC1: View the Confirmation of completed tenure investigation page
    Given The tenure investigation has been completed for tenure
    When I tick the box "I confirm that the tenure investigation has been completed"
    Then I am able to choose which recommendation the tenure investigator has given Approve Decline or Appointment
    And the progress indicator is still in "Review Application"