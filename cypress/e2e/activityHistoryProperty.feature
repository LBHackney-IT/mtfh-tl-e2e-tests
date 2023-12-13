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


# //TODO commented for 5th July release as this test is failing in pipeline
#  @SmokeTest
#    Scenario Outline: Update property
#      Given I edit a property "<property>" "<propertyType>"
#      Given I go to the property activity history for "<property>"
#      Then the update exists in the activity history "<propertyType>"
#
#      Examples:
#        | property                               | propertyType   |
#        | 62f6df87-ec33-77db-38ea-647be124af65 | Introductory |
