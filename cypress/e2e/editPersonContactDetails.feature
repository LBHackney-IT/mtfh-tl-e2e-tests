@authentication
@common
@personal-details
@processes
@root

@EditPersonContactDetailsPage
Feature: Edit contact details for a person
    I want to edit contact details for a person

    Background:
        Given I am logged in

    Scenario Outline: Correspondence address using invalid postcode lookup details
        Given I seeded the database with a person
        When I edit a person's contact details
        And I click add a correspondence address
        Then the correspondence address fields are displayed
        When I enter a postcode into the lookup field "asdasd"
        And I click look up
        Then an invalid postcode error is thrown

  Scenario Outline: Correspondence address using free text fields
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click add a correspondence address
    Then the correspondence address fields are displayed
    When I enter "<addressOne>" into address line 1
    When I enter "<addressTwo>" into address line 2
    When I enter "<addressThree>" into address line 3
    When I enter "<addressFour>" into address line 4
    When I enter "<postCode>" into the postcode field
    And I click save correspondence address
    Then the correspondence address is saved

    Examples:
      | postCode | addressOne | addressTwo | addressThree | addressFour |
      | SW1A 1AA | Buckingham | Palace     | London       | England     |

  Scenario Outline: Maximum contact details reached
    Given I seeded the database with a person
    Given the person has valid contact details
    When I edit a person's contact details
    And I add up to 5 contact details of type "<contactType>"
    Then I cannot add any more contacts for "<contactType>"

    Examples:
      | contactType |
      | email       |
      | phone       |