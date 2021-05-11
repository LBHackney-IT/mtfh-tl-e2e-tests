@PersonPage
Feature: T&L Person Page
  I want to view a person

  Background: 
    Given I have loaded a Person record

  @Positive
  Scenario: View person details web page view
    Then the body Person details are displayed

  Scenario Outline: View person details mobile view
    When I am using a mobile viewport "<device>"
    Then the header Person details are displayed
    When I click on the expand all sections button
    Then the body Person details are displayed

    Examples:
        | device    |
        | iphone-3  |
        | iphone-4  |
        | iphone-5  |
        | iphone-5  |
        | iphone-6  |
        | iphone-6+ |