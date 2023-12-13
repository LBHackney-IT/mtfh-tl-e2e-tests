@activity-history
@authentication
@common
@processes
@root

Feature: Activity History for Property
  I want to view a property's activity history

  Background:
    Given I am logged in

  @SmokeTest
  Scenario Outline: View property activity history page
    Given I seeded the database with an asset
    Given I go to the property activity history
    Then the property activity history is displayed
    And table headers should be visible
    When I click close activity history
    Then I am on the property page for the property

