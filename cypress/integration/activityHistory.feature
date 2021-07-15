@ActivityHistoryPage
Feature: Activity History
  I want to view a person's activity history

  Background: 
    Given I am logged in

    Scenario Outline: View activity history
      Given I go to the activity history for "<person>"
      Then the activity history is displayed
      Then I click close activity history
      And I am on the person page for "<person>"

      Examples:
        | person                               | 
        | 5e4a06d3-9f3b-914a-fd48-3d82c8aa3752 |

    @ignore
    Scenario Outline: Update activity history
      Given I am on the edit person page for "<person>"
      And I select a preferred middle name "<preferredLastName>"
      And I click add person
      And I click the done button
      Given I go to the activity history for "<person>"
      Then the activity history is displayed
      Then the activity history is correct
      
      Examples:
        | person                               | preferredLastName   |
        | c9c2e6ab-679e-d83b-d2e4-830b64c509c4 | guid                |

