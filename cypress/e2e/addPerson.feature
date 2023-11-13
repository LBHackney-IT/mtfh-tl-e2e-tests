@authentication
@common
@personal-details
@processes
@root

@AddPersonPage
Feature: Add a new person to a tenure
  I want to add a person to a tenure

  Background:
    Given I am logged in

  @SmokeTest
  @Regression
  Scenario: Removed fields are not displayed
    Given I seeded the database with a tenure
    Given I create a person for tenure
    Then the gender field is not displayed
    And the nationality field is not displayed
    And the national insurance field is not displayed
    And the add language options are not displayed
    And the add id options are not displayed

  @SmokeTest
  @Positive
  Scenario Outline: Add a new person to a tenure
    Given I seeded the database with a tenure
    Then I browse to the 'Add Person to Tenure' page for the tenure
    Then the add a new person tenure page is correct
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
    And I am on the contact details page

    Examples:
      | title | personType          | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName |
      | Mr    | Named tenure holder | Test      | Test       | Test     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | Mrs   | Household member    | Test      | Test       | Test     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      
  @SmokeTest
  @Negative
  Scenario Outline: Validation check
    Given I seeded the database with a tenure
    Then I browse to the 'Add Person to Tenure' page for the tenure
    When I select person type "<personType>"
    And I select a title "<title>"
    And I enter a first name "<firstName>"
    And I enter a middle name "<middleName>"
    And I enter a last name "<lastName>"
    And I enter a date of birth "<day>" "<month>" "<year>"
    And I enter a reason for creation
    And I click add person
    Then the form error container is displayed

    Examples:
      | personType       | title | firstName | middleName | lastName | day | month | year |
      | Household member | Mr    | Testy     | McTest     | Face     | 08  | 05    | 2099 |

  @SmokeTest
  @Positive
  Scenario Outline: Edit a person
    Given I seeded the database with a person
    Then I visit the 'Edit person' page for the person
    And the person type options are not displayed
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
    And I click the update person button
    # And I click the next button
    # TODO: Uncomment for contact details release
    # And I click the save equality information button
    # And I click edit person
    # And I enter a first name "<conflictTitle>"
    # And there is a merge conflict

    Examples:
      | title | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | email                  | emailDescription | phoneNumber | phoneType | phoneDescription | conflictTitle  |
      | Mr    | Modified  | Test       | guid     | 09  | 12    | 1950 | Mt. Fuji     | Reverend       | Pref modified      | Mid modified        | guid              | testytest@test.com     | This is an email | 0118999     | Other     | This is a phone  | changeConflict |
      | Mrs   | Modified  | Test       | guid     | 30  | 06    | 1988 | Crete        | Ms             | Pref modified      | Mid modified        | guid              | testymctester@test.com | This is an email | 99988199    | Mobile    | This is a phone  | changeConflict |

  Scenario Outline: Confirmation modal
    Given I seeded the database with a person
    Then I visit the 'Edit person' page for the person
    And I click edit person
    And I click cancel
    Then the confirmation modal is displayed

  Scenario Outline: Add equality information
    Given I seeded the database with a person
    Then I seed blank equality information to the database, for such person
    Given I edit a person's equality information
    Then the equality information is displayed
    And the sexual orientation information is not displayed
    When I select an age group "<ageGroup>"
    Then the sexual orientation information is displayed
    Then I select a carer option "<carerOption>"
    And I select a disability option "<disabilityOption>"
    And I select an ethnicity "<ethnicity>"
    And I select a gender "<gender>"
    And I select a gender identity option "<genderIdentityOption>"
    And I select a religion or belief "<religionOrBelief>"
    And I select a sexual orientation "<sexualOrientation>"
    And I select a pregnancy or maternity option "<pregnancyOrMaternityOption>"
    And I click save equality information
    Then the equality information is saved "<person>"

    Examples:
      | ageGroup | carerOption       | disabilityOption | ethnicity        | gender | genderIdentityOption | religionOrBelief | sexualOrientation    | pregnancyOrMaternityOption |
      | 25-34    | Prefer not to say | Yes              | Mixed background | Male   | No                   | Secular beliefs  | Lesbian or Gay woman | Prefer not to say          |

  Scenario Outline: Sexual orientation is not displayed for under 16s
    Given I seeded the database with a person
    Then I seed blank equality information to the database, for such person
    Given I edit a person's equality information
    Then the equality information is displayed
    When I select an age group "<ageGroup>"
    And the sexual orientation information is not displayed

    Examples:
      | ageGroup |
      | Under 16 |

  Scenario Outline: Preferred term for gender field is displayed when "other" is selected for gender term
    Given I seeded the database with a person
    Then I seed blank equality information to the database, for such person
    Given I edit a person's equality information
    Then the equality information is displayed
    And I select a gender "<gender>"
    And the preferred gender term field is displayed
    And I enter "<genderTerm>" into the gender term field

    Examples:
      | gender | genderTerm  |
      | Other  | Gender Term |