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
    And I click on the search button
    Then the search results are displayed by best match "<searchTerm>"
    When I add 1 named tenure holder
    Then the person is added to the tenure
    When I add 1 household member
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
  Scenario Outline: Create new tenure and add new person
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    And the tenure person search is displayed
    And the create new person button is not enabled
    When I enter any of the following criteria "<searchTerm>"
    And I click on the search button
    And I click create new person
    And I am on the create new person for a new tenure page
    When I select person type "<personType>"
    And I select a title "<title>"
    And I enter a first name "<firstName>"
    And I enter a middle name "<middleName>"
    And I enter a last name "<lastName>"
    And I enter a date of birth "<day>" "<month>" "<year>"
    And I enter a place of birth "<placeOfBirth>"
    And I select a preferred title "<preferredTitle>"
    And I select a preferred first name "<preferredFirstName>"
    And I select a preferred middle name "<preferredMiddleName>"
    And I select a preferred last name "<preferredLastName>"
    And I enter a reason for creation
    And I click add person
    Then I am on the create contact for a new tenure page
    And I click the add email address button
    And I enter an email address "<email>"
    And I enter an email description "<emailDescription>"
    And I click save email address
    And the email information is captured "<email>" "<emailDescription>"
    And I click the add phone number button
    And I enter a phone number "<phoneNumber>"
    And I select a phone number type "<phoneType>"
    And I enter a phone number description "<phoneDescription>"
    And I click save phone number
    And the phone information is captured "<phoneNumber>" "<phoneType>" "<phoneDescription>"
    And I click the done button
    Then the person is added to the tenure
    And the person is added to the list of tenures "<title>" "<firstName>" "<lastName>" "<day>" "<month>" "<year>"
    And the tenure person search is displayed

        Examples:
        | property                             | tenureType | startDay | startMonth | startYear | searchTerm | title | personType          | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | email                          | emailDescription              | phoneNumber | phoneType | phoneDescription              |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        | Mr    | Named tenure holder | Test      | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         | addPersonToNewTenure@email.com | Add person to new tenure test | 01189998    | Other     | Add person to new tenure test |

  @ignore
  Scenario Outline: Create new tenure validation
    When I view a property "<property>"
    When I click on the new tenure button
    Then I am on the create new tenure page "<property>"
    Then the new tenure landing page is displayed
    When I select a tenure type "<tenureType>"
    And I enter a tenure start date "<startDay>" "<startMonth>" "<startYear>"
    And I click the next button
    And the tenure person search is displayed
    When I enter any of the following criteria "<searchTerm>"
    And I click on the search button
    Then the search results are displayed by best match "<searchTerm>"
    When I add 1 named tenure holder
    Then the person is added to the tenure
    When I add 1 named tenure holder
    Then a tenure error message appears "The person is already added"
    When I add 1 household member
    Then the person is added to the tenure
    When I add 1 household member
    Then a new tenure error message appears "The person is already added"
    When I add 5 named tenure holder
    Then a new tenure error message appears "Max. tenure holders added"

    Examples:
        | property                             | tenureType | startDay | startMonth | startYear | searchTerm |
        | aff61bd4-841b-b4dc-af23-dfbdb8cc8434 | Freehold   | 01       | 01         | 2000      | tre        |

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
        Then the edit tenure information is displayed

        Examples:
        | tenure                               | tenureType |
        | 4d261cd3-c2d3-88ac-4df3-b0d235414056 | Freehold   |
        # | 4d261cd3-c2d3-88ac-4df3-b0d235414056 | Secure     |

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

    Scenario Outline: Create person by navigating to new tenure
        Given I delete all existing persons from the new tenure "<tenure>"
        When I navigate to a create person for new tenure "<property>" "<tenure>"
        And the tenure person search is displayed
        And the create new person button is not enabled
        When I enter any of the following criteria "<searchTerm>"
        And I click on the search button
        And I click create new person
        And I am on the create new person for a new tenure page
        When I select person type "<personType>"
        And I select a title "<title>"
        And I enter a first name "<firstName>"
        And I enter a middle name "<middleName>"
        And I enter a last name "<lastName>"
        And I enter a date of birth "<day>" "<month>" "<year>"
        And I enter a place of birth "<placeOfBirth>"
        And I select a preferred title "<preferredTitle>"
        And I select a preferred first name "<preferredFirstName>"
        And I select a preferred middle name "<preferredMiddleName>"
        And I select a preferred last name "<preferredLastName>"
        And I enter a reason for creation
        And I click add person
        Then I am on the create contact for a new tenure page
        And I click the add email address button
        And I enter an email address "<email>"
        And I enter an email description "<emailDescription>"
        And I click save email address
        And the email information is captured "<email>" "<emailDescription>"
        And I click the add phone number button
        And I enter a phone number "<phoneNumber>"
        And I select a phone number type "<phoneType>"
        And I enter a phone number description "<phoneDescription>"
        And I click save phone number
        And the phone information is captured "<phoneNumber>" "<phoneType>" "<phoneDescription>"
        And I click the done button
       And the tenure person search is displayed

        Examples:
        | property                             | tenure                               | searchTerm | title | personType          | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | email                          | emailDescription              | phoneNumber | phoneType | phoneDescription              |
        | 58815bed-8996-653d-9e98-ec5d3b68527f | 3a5114c9-1a63-4e15-953d-5b8328e84549 | tre        | Mr    | Named tenure holder | Test      | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         | addPersonToNewTenure@email.com | Add person to new tenure test | 01189998    | Other     | Add person to new tenure test |
        

    @ignore
    Scenario Outline: Create person for new tenure validation
        Given I delete all existing persons from the new tenure "<tenure>"
        When I navigate to a create person for new tenure "<property>" "<tenure>"
        When I enter any of the following criteria "<searchTerm>"
        And I click on the search button
        When I add 5 named tenure holder
        Then a new tenure error message appears "Max. tenure holders added"
        And I click create new person
        And I am on the create new person for a new tenure page
        And the named tenure holder button is not active
        And I remove one of the tenure holders
        And I click the cancel button
        And I remove one of the tenure holders
        And I click remove person
        Then the person is removed
        When I select person type "Named tenure holder"
        And I select a title "<title>"
        And I enter a first name "<firstName>"
        And I enter a last name "<lastName>"
        And I enter a date of birth "<day>" "<month>" "<year>"
        And I enter a reason for creation
        And I click the done button

        Examples:
        | property                             | tenure                               | searchTerm | title | personType          | firstName | middleName | lastName | day | month | year |
        | 58815bed-8996-653d-9e98-ec5d3b68527f | 3a5114c9-1a63-4e15-953d-5b8328e84549 | emi        | Mr    | Named tenure holder | Test      | Test       | guid     | 08  | 05    | 1969 |