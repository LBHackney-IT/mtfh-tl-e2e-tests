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
        | 7c8dd949-4130-9945-7692-cbdb256d8f25 | Freehold   | 01       | 01         | 2000      |

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
        | 7c8dd949-4130-9945-7692-cbdb256d8f25 |

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
        | 7c8dd949-4130-9945-7692-cbdb256d8f25 | Freehold   | 01       | 01         | 2000      |

  @SmokeTest
  Scenario Outline: Create new tenure that with start date that occurs after end date
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I enter a tenure end date "<endDay>" "<endMonth>" "<endYear>"
    And I click the next button
    Then a create tenure error is triggered

    Examples:
        | property                             | tenureType    | startDay | startMonth | startYear | endDay | endMonth | endYear |
        | 7c8dd949-4130-9945-7692-cbdb256d8f25 | Shared Owners | 02       | 01         | 2000      | 01     | 01       | 2000    |