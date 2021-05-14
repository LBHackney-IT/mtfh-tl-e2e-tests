@PersonPage
Feature: T&L Person Page
  I want to view a person

  @Positive
  Scenario: View person details web page view
    Given I have loaded a Person record
    Then the body Person details are displayed

  Scenario Outline: View person details mobile view
    Given I have loaded a Person record
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

  Scenario Outline: Look for record that does not exist
    Given I have loaded an invalid person record "<record>"
    Then The person you've requested does not exist error message appears

    Examples:
        | record |
        | kdfbv  |
        | dfkkkl |