@PersonPage
Feature: T&L Person Page
  I want to view a person

  Background:
    Given I am logged in

  @SmokeTest
  @Positive
  Scenario Outline: View person details web page view
    Given I have loaded a Person record "<record>"
    Then the personal details are displayed on the sidebar
    When I click on the more contact details accordion
    Then the more contact details are displayed
    When I click on the more contact details accordion
    When I click on the more personal details accordion
    Then the body Person details are displayed
    When I click on the more personal details accordion
    When I click on the more tenure details accordion
    Then the body tenure details are displayed
    When I click on the more tenure details accordion

    Examples:
      | record                               |
      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |

  @device
  Scenario Outline: View person details device view
    Given I have loaded a Person record "<record>"
    When I am using a mobile viewport "<device>"
    Then the personal details are displayed on the mobile content container
    When I click on the more contact details accordion
    Then the more contact details are displayed
    When I click on the more contact details accordion
    When I click on the more personal details accordion
    Then the body Person details are displayed
    When I click on the more personal details accordion
    When I click on the more tenure details accordion
    Then the body tenure details are displayed
    When I click on the more tenure details accordion

    Examples:
      | device        | record                               |
      # | ipad-2        | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | ipad-mini     | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-3      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-4      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-5      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-6      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-6+     | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-7      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-8      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-x      | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-xr     | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | iphone-se2    | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | macbook-11    | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | macbook-13    | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | macbook-15    | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | macbook-16    | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      # | samsung-note9 | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |
      | samsung-s10   | 3cd58102-dad6-4ace-fe5d-1400fb1e5c45 |

  @SmokeTest
  Scenario Outline: Look for record that does not exist
    Given I have loaded an invalid person record "<record>"
    Then The person you've requested does not exist error message appears

    Examples:
      | record |
      | kdfbv  |
      | dfkkkl |

  @SmokeTest
  Scenario Outline: Add a comment for a person
    Given I have loaded a Person record "<record>"
    # Then the body Person details are displayed
    When I click on the add comment button
    Then I am taken to the add comment for person page "<record>"
    When I enter a valid comment
    Then I click the save comment button
    Then the comment is submitted
    Given I have loaded a Person record "<record>"
    Then the new comment is loaded

    Examples:
      | record                               |
      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

  @Accessibility
  Scenario Outline: Scenario Outline name: Accessibility Testing
    Given I have loaded a Person record "<record>"
    And have no detectable a11y violations

    Examples:
      | record                               |
      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |