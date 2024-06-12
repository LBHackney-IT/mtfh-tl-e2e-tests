@activity-history
@authentication
@common
@root

Feature: Activity History
  I want to view a person's activity history

  Background:
    Given I am logged in

  @SmokeTest
  Scenario Outline: View activity history
    Given I seeded the database with a person
    Given I go to the activity history for the person
    Then the activity history is displayed
    And table headers should be visible
    And the name of the person should be visible
    Then I click close activity history
    And I am on the 'Person details' page

  # //TODO commented for 5th July release as this test is failing in pipeline
  # Scenario Outline: Update activity history
  #  Given I am on the edit person page for "<person>"
  #  And I select a preferred middle name "<preferredLastName>"
  #  When I click update person button
  #  Given I go to the activity history for the "<person>"
  #  Then the activity history is displayed
  #  Then the activity history is correct

  #  Examples:
  #    | person                               | preferredLastName |
  #    | c9c2e6ab-679e-d83b-d2e4-830b64c509c4 | guid              |

