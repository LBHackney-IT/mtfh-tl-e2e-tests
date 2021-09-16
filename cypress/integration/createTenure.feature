@AddPersonPage
Feature: Create tenure
  I want to create a new tenure

  Background: 
    Given I am logged in

  @SmokeTest
  Scenario Outline: Create new tenure
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear |
        | a84b7aba-a6fb-a51f-8394-0b2cb7ded0c3 | Freehold   | 01       | 01         | 2000      |

  @SmokeTest
  Scenario Outline: Create new tenure and cancel
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    And I click the cancel button
    Then the property information is displayed

    Examples:
        | property                             |
        | a84b7aba-a6fb-a51f-8394-0b2cb7ded0c3 |

  @SmokeTest
  Scenario Outline: Create new tenure that occurs before the end date of a previous tenure
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    Then a create tenure error is triggered

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear |
        | a84b7aba-a6fb-a51f-8394-0b2cb7ded0c3 | Freehold   | 01       | 01         | 2000      |