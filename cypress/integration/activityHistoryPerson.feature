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

@ignore
# failed test MTTL-1849
    Scenario Outline: Update activity history
      Given I am on the edit person page for "<person>"
      And I select a preferred middle name "<preferredLastName>"
      And I click update person
      And I click the next button
      Given I go to the activity history for "<person>"
      Then the activity history is displayed
      Then the activity history is correct
      
      Examples:
        | person                               | preferredLastName |
        | c9c2e6ab-679e-d83b-d2e4-830b64c509c4 | guid              |

