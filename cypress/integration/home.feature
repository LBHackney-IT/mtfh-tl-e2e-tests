@HomePage
Feature: T&L Home page
    I am on the Tenants and Leaseholders Home page

  Scenario: Home Page whilst logged out
    Given I am on the Home page
    Then the log in button is visible
    Then the page header is visible
    And the page footer is visible

  Scenario: Home page whilst logged in
    Given I am logged in
    When I am on the Home page
    Then the header link says welcome
    Then the page header is visible
    And the page footer is visible

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  @Footer
  Scenario: Page footer links
    Then the page footer links are visible
    And the page footer links are correct