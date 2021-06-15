@PersonPage
Feature: T&L Person Page
  I want to view a person

  Background:
    Given I am logged in

  @Positive
  @ignore
  Scenario Outline: View person details web page view
    Given I have loaded a Person record "<record>"
    Then the body Person details are displayed

    Examples:
      | record                               |
      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

  @device
  @ignore
  Scenario Outline: View person details device view
    Given I have loaded a Person record "<record>"
    When I am using a mobile viewport "<device>"
    When I click on the more personal details accordion
    Then the body Person details are displayed
    When I click on the more tenure details accordion
    Then the body tenure details are displayed

    Examples:
      | device        | record                               |
      # | ipad-2        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | ipad-mini     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      | iphone-3      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-4      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-5      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-6      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-6+     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-7      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-8      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-x      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-xr     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | iphone-se2    | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | macbook-11    | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | macbook-13    | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | macbook-15    | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | macbook-16    | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | samsung-note9 | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
      # | samsung-s10   | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

  Scenario Outline: Look for record that does not exist
    Given I have loaded an invalid person record "<record>"
    Then The person you've requested does not exist error message appears

    Examples:
      | record |
      | kdfbv  |
      | dfkkkl |

  @ignore
  Scenario Outline: Add a comment for a person
    Given I have loaded a Person record "<record>"
    Then the body Person details are displayed
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
  Scenario: Accessibility Testing
    And have no detectable a11y violations