@Production

Feature: T&L Home page
    I am on the Tenants and Leaseholders Home page

  Scenario: Home Page whilst logged out
    Given I am on the Home page
    Then the log in button is visible
    Then the page header is visible
    And the page footer is visible

#  Scenario: Home page whilst logged in
#    Given I am logged in
#    When I am on the Home page
#    Then the header link says welcome
#    Then the page header is visible
#    And the page footer is visible

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  Scenario: Page footer links
    Then the page footer links are visible
    And the page footer links are correct

  Scenario Outline: Home page device view
    Given I am logged in
    When I am using a mobile viewport "<device>"
    When I am on the Home page
    Then the header link says welcome
    Then the page header is visible
    And the page footer is visible

    Examples:
      | device        |
      | ipad-2        |
      | ipad-mini     |
      | iphone-se2    |
      | macbook-11    |
      | macbook-13    |
      | macbook-15    |
      | macbook-16    |
      | samsung-s10   |