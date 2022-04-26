@activity-history
@authentication
@common
@processes
@root

Feature: Activity History
  I want to view a person's activity history

  Background: 
    Given I am logged in
    
    @SmokeTest
    Scenario Outline: View activity history
      Given I go to the activity history for "<person>"
      Then the activity history is displayed
      Then I click close activity history
      And I am on the person page for "<person>"

      Examples:
        | person                               | 
        | f0058791-07da-28de-06a3-bd5ca124e160 |

