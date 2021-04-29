@PersonPage
Feature: T&L Person Page
  I want to view a person

  Background: 
    Given I have loaded a Person record

  @Positive
  Scenario: View person details
    Then the header Person details are displayed