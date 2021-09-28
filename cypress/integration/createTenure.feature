@CreateTenure
Feature: Create tenure
  I want to create a new tenure

  Background: 
    Given I am logged in

  # @ignore
  # @SmokeTest
  # Scenario Outline: Create new tenure
  #   When I view a property "<property>"
  #   When I click on the new tenure button
  #   Then I am on the create new tenure page "<property>"
  #   Then the new tenure landing page is displayed
  #   When I select a tenure type "<tenureType>"
  #   And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
  #   And I click the next button
  #   And the tenure person search is displayed

  #   Examples:
  #       | property                             | tenureType | startDay | startMonth | startYear |
  #       | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      |

  # @ignore
  # @SmokeTest
  # Scenario Outline: Create new tenure and cancel
  #   When I view a property "<property>"
  #   When I click on the new tenure button
  #   Then I am on the create new tenure page "<property>"
  #   Then the new tenure landing page is displayed
  #   And I click the cancel button
  #   Then the cancel confirmation modal is displayed
  #   And I click the modal cancel button
  #   Then the new tenure landing page is displayed
  #   And I click the cancel button
  #   Then the cancel confirmation modal is displayed
  #   And I click the confirm button
  #   Then the property information is displayed

  #   Examples:
  #       | property                             |
  #       | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 |

  # @SmokeTest
  # Scenario Outline: Create new tenure that occurs before the end date of a previous tenure
  #   When I view a property "<property>"
  #   When I click on the new tenure button
  #   Then I am on the create new tenure page "<property>"
  #   Then the new tenure landing page is displayed
  #   When I select a tenure type "<tenureType>"
  #   And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
  #   And I click the next button
  #   Then a create tenure error is triggered

  #   Examples:
  #       | property                             | tenureType | startDay | startMonth | startYear |
  #       | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      |

  # @SmokeTest
  # Scenario Outline: Create new tenure that with start date that occurs after end date
  #   When I view a property "<property>"
  #   When I click on the new tenure button
  #   Then I am on the create new tenure page "<property>"
  #   Then the new tenure landing page is displayed
  #   When I select a tenure type "<tenureType>"
  #   And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
  #   And I enter a tenure end date "<endDay>" "<endMonth>" "<endYear>"
  #   And I click the next button
  #   Then a create tenure error is triggered

  #   Examples:
  #       | property                             | tenureType    | startDay | startMonth | startYear | endDay | endMonth | endYear |
  #       | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Shared Owners | 02       | 01         | 2000      | 01     | 01       | 2000    |

  Scenario Outline: Edit existing tenure
        When I view a Tenure "<tenure>"
        Then the tenure information is displayed
        And I click edit tenure
        Then the edit tenure information is displayed
        When I select a tenure type "<tenureType>"
        And I click the done button
        Then the tenure information is displayed

        Examples:
        | tenure                               | tenureType |
        | 4d261cd3-c2d3-88ac-4df3-b0d235414056 | Freehold   |
        | 4d261cd3-c2d3-88ac-4df3-b0d235414056 | Secure     |

    Scenario Outline: Edit existing tenure and cancel
        When I view a Tenure "<tenure>"
        Then the tenure information is displayed
        And I click edit tenure
        Then the edit tenure information is displayed
        When I select a tenure type "<tenureType>"
        And I click the cancel button
        Then the cancel modal is displayed
        When I click cancel on the modal
        Then the edit tenure information is displayed
        And I click the cancel button
        Then the cancel modal is displayed
        And I click yes on the modal
        Then the tenure information is displayed

        Examples:
        | tenure                               | tenureType |
        | 4d261cd3-c2d3-88ac-4df3-b0d235414056 | Freehold   |

    Scenario Outline: Edit tenure button is not displayed for inactive or past tenures
        When I view a Tenure "<tenure>"
        Then the tenure information is displayed
        And the edit tenure button is not displayed

        Examples:
        | tenure                               |
        | e832a76f-8bcf-238c-7ad1-6ef1b408b316 |