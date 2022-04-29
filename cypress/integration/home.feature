@authentication
@common
@header
@processes
@Production
@root

Feature: T&L Home page
    I am on the Tenants and Leaseholders Home page

  @SmokeTest
  Scenario: Home Page whilst logged out
    Given I am on the Home page
    Then the log in button is visible
    Then the page header is visible
    And the page footer is visible

  @SmokeTest
  Scenario: Home page whilst logged in
    Given I am logged in
    When I am on the Home page
    Then the header link says welcome
    Then the page header is visible
    And the page footer is visible

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  @SmokeTest
  Scenario: Page footer links
    Then the page footer links are visible
    And the page footer links are correct

  @SmokeTest
  @device
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
      | iphone-3      |
      | iphone-4      |
      | iphone-5      |
      | iphone-6      |
      | iphone-6+     |
      | iphone-7      |
      | iphone-8      |
      | iphone-x      |
      | iphone-xr     |
      | iphone-se2    |
      | macbook-11    |
      | macbook-13    |
      | macbook-15    |
      | macbook-16    |
      | samsung-note9 |
      | samsung-s10   |