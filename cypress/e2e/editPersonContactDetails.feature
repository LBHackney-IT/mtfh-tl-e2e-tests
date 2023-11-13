@authentication @common @personal-details @processes @root @EditPersonContactDetailsPage
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

  Scenario Outline: Maximum phone numbers reached
    Given I seeded the database with a person
    Given the person has valid contact details
    When I edit a person's contact details
    And I add up to 5 contact details of type "phone"
    Then I cannot add any more contacts for "phone"

  Scenario Outline: Validation shown when empty form
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I click the save changes button
    Then I see validation errors for empty fields

  Scenario Outline: Success message when phone added
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I populate the phone number form with "<phoneNumber>"
    Then I click the save changes button
    Then I see a success message

    Examples: 
      | phoneNumber   |
      |   07777777777 |
      | +449844444444 |

  Scenario Outline: Save button disabled after changes saved
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I populate the phone number form with "07777777777"
    Then I click the save changes button
    Then I see the success button is disabled

  Scenario Outline: Removing a phone number opens a confirmation modal
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I populate the phone number form with "07777777777"
    Then I click the save changes button
    Then I see a success message
    Then I click the remove button
    And I expect to see a confirmation modal
    Then I click the remove phone number button
    And I see a phone number removed confirmation message
    And the phone number is removed

  Scenario Outline: Removing a phone number before saved doesnt open a confirmation modal
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I populate the phone number form with "07777777777"
    Then I click the remove button
    And I expect to not see a confirmation modal
    And the phone number is removed

  Scenario Outline: The IsUkNumber checkbox is correctly populated for new numbers
    Given I seeded the database with a person
    When I edit a person's contact details
    And I click the add phone number button
    And I check Non-UK Number checkbox with <enabled>
    And I populate the phone number form with "<phoneNumber>"
    Then I click the save changes button
    Then I see a success message
    Then I reload the page
    And I expect to see NonUkNumber <enabled>

    Examples: 
      | phoneNumber   | enabled |
      |   07777777777 | false   |
      | +549844444444 | true    |
