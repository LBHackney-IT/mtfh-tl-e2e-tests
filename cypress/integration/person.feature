@PersonPage
Feature: T&L Person Page
  I want to view a person

  Background: 
    Given I have loaded a Person record

  @Positive
  Scenario: View person details
    Then the header Person details are displayed
    When I click on the expand all sections button
    Then the body Person details are displayed