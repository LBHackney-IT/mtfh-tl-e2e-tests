@activity-history
@authentication
@common
@processes
@root

Feature: Activity History for Tenure
  I want to view a tenure's activity history

  Background:
    Given I am logged in

  @SmokeTest
  Scenario Outline: View Tenure activity history page
    Given I seeded the database with a tenure
    Given I go to the tenure activity history
    Then the tenure activity history is displayed
    And table headers should be visible
    When I click close activity history
    And I am on the tenure page for the tenure

  Scenario Outline: View Tenure activity history page for legacy data - Data imported
    Given I seeded the database with a tenure
    Given I go to the tenure activity history
    Then the tenure activity history is displayed
    And table headers should be visible
    Then tenure migrated activity history is displayed
    Then I click close activity history
    And I am on the tenure page for the tenure

  @SmokeTest
    Scenario Outline: Update Tenure
      Given I edit a tenure "<tenure>" "<tenureType>"
      Given I go to the tenure activity history for "<tenure>"
      Then the update exists in the activity history "<tenureType>"

      Examples:
        | tenure                               | tenureType   |
        | 62f6df87-ec33-77db-38ea-647be124af65 | Introductory |
