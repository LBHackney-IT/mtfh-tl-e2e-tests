@ActivityHistoryPage
Feature: Activity History
  I want to view a person's activity history

  Background: 
    Given I am logged in

    Scenario Outline: View activity history
      Given I go to the activity history for "<person>"
      Then the activity history is displayed

      Examples:
        | person                               | 
        | 5e4a06d3-9f3b-914a-fd48-3d82c8aa3752 |


    Scenario Outline: Update activity history
      Given I am on the edit person page for "<person>"
      And I select a preferred middle name "<preferredMiddleName>"
      And I click add person
      And I click the done button
      Given I go to the activity history for "<person>"
      Then the activity history is displayed
      Then the activity history is correct
      

      Examples:
        | person                               | preferredMiddleName |
        | b860dd8a-89df-4e15-f8fb-0e8e9c0efeac | guid                |

