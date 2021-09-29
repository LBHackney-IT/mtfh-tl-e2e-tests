@CreateTenure
Feature: Create tenure
  I want to create a new tenure

  Background: 
    Given I am logged in

  @ignore
  @SmokeTest
  Scenario Outline: Create new tenure
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    And the tenure person search is displayed

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      |

  @ignore
  @SmokeTest
  Scenario Outline: Create new tenure search and select resident
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    And the tenure person search is displayed
    When I enter any of the following criteria "<searchTerm>"
    And I click search
    And I click on the search button
    Then the search results are displayed by best match "<searchTerm>"
    When I click on add as a named tenure holder
    Then the person is added to the tenure
    When I click on add as a household member
    Then the person is added to the tenure
    And I click the done button
    Then the tenure is complete
    Then the tenure information is displayed

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear | searchTerm |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        |

  @ignore
  Scenario Outline: Create new tenure and filter search
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    And the tenure person search is displayed
    When I enter any of the following criteria "<searchTerm>"
    And I click search
    And I click on the search button
    Then the search results are displayed by best match "<searchTerm>"
    Then the default sort option is correct
    When I select to sort by "<filter>"
    When I set the number of results to <results>
    Then the correct number of <results> are displayed

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear | searchTerm | filter        | results |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        | Last name A-Z | 40      |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        | Last name Z-A | 20      |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        | Best match    | 12      |

  @ignore
  @SmokeTest
  Scenario Outline: Create new tenure and cancel
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    And I click the cancel button
    Then the cancel confirmation modal is displayed
    And I click the modal cancel button
    Then the new tenure landing page is displayed
    And I click the cancel button
    Then the cancel confirmation modal is displayed
    And I click the confirm button
    Then the property information is displayed

    Examples:
        | property                             |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 |

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
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      |

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
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Shared Owners | 02       | 01         | 2000      | 01     | 01       | 2000    |

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

    Scenario Outline: Cannot edit tenure for inactive or past tenures
        When I edit a Tenure "<tenure>"
        Then the tenure cannot be edited warning message is displayed

        Examples:
        | tenure                               |
        | e832a76f-8bcf-238c-7ad1-6ef1b408b316 |

