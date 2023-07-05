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
    Given I seeded the database with an asset "477a39c3-0b63-4f89-b95e-51d116176413" with a previous tenure
    Given I create a person for tenure
    Then the gender field is not displayed
    And the nationality field is not displayed
    And the national insurance field is not displayed
    And the add language options are not displayed
    And the add id options are not displayed

  @SmokeTest
  @Positive
  Scenario Outline: Add a new person to a tenure
    Given I seeded the database with a tenure with GUID "a477e05a-22a2-4bf7-aef2-107acba1ea18"
    Then I browse to the 'Add Person to Tenure' page for tenure with GUID "a477e05a-22a2-4bf7-aef2-107acba1ea18"
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


  # skip as failing due to fe change
  #  @ignore
  #  @device
  #  Scenario Outline: Add a new person to tenure on a device
  #    Given I create a person for tenure
  #    And I am using a mobile viewport "<device>"
  #    Then the add a new person tenure page is correct
  #    When I select person type "<personType>"
  #    And I select a title "<title>"
  #    And I enter a first name "<firstName>"
  #    And I enter a middle name "<middleName>"
  #    And I enter a last name "<lastName>"
  #    And I enter a date of birth "<day>" "<month>" "<year>"
  #    And I enter a place of birth "<placeOfBirth>"
  #    And I select a preferred title "<preferredTitle>"
  #    And I select a preferred first name "<preferredFirstName>"
  #    And I select a preferred middle name "<preferredMiddleName>"
  #    And I select a preferred last name "<preferredLastName>"
  #    And I enter a reason for creation
  #    And I click add person
  #    And I click the done button
  #    And I am on the tenure page '<tenure>'
  #    And the person has been added to the tenure
  #
  #    Examples:
  #      | device        | title | personType          | firstName     | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName |
  #      | ipad-2        | Mr    | Named tenure holder | ipad2         | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | ipad-mini     | Mrs   | Household member    | ipad-mini     | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | iphone-3      | Mrs   | Named tenure holder | iphone3       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | iphone-4      | Miss  | Household member    | iphone4       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | iphone-5      | Mrs   | Named tenure holder | iphone5       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | iphone-6      | Mr    | Household member    | iphone6       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | iphone-6+     | Miss  | Named tenure holder | iphone6+      | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | iphone-7      | Miss  | Household member    | iphone7       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | iphone-8      | Mr    | Named tenure holder | iphone8       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | iphone-xr     | Mrs   | Household member    | iphone-xr     | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | iphone-se2    | Mrs   | Named tenure holder | iphone-se2    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | macbook-11    | Mr    | Household member    | macbook-11    | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | macbook-13    | Miss  | Named tenure holder | macbook-13    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | macbook-15    | Mr    | Household member    | macbook-15    | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | macbook-16    | Miss  | Named tenure holder | macbook-17    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
  #      | samsung-note9 | Miss  | Household member    | samsung-note9 | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
  #      | samsung-s10   | Miss  | Named tenure holder | samsung-s10   | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |

  @SmokeTest
  @Negative
  Scenario Outline: Validation check
    Given I seeded the database with a tenure with GUID "1414a574-2c53-49e1-b5a2-87247c457ed2"
    Then I browse to the 'Add Person to Tenure' page for tenure with GUID "1414a574-2c53-49e1-b5a2-87247c457ed2"
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
    Given I create a person with GUID "828ae179-a2a0-406f-954e-d87625954630" and seed it to the database
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
    And I click the next button
    And I click the save equality information button
    And I click edit person
    And I enter a first name "<conflictTitle>"
    And there is a merge conflict

    Examples:
      | title | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | email                  | emailDescription | phoneNumber | phoneType | phoneDescription | conflictTitle  |
      | Mr    | Modified  | Test       | guid     | 09  | 12    | 1950 | Mt. Fuji     | Reverend       | Pref modified      | Mid modified        | guid              | testytest@test.com     | This is an email | 0118999     | Other     | This is a phone  | changeConflict |
      | Mrs   | Modified  | Test       | guid     | 30  | 06    | 1988 | Crete        | Ms             | Pref modified      | Mid modified        | guid              | testymctester@test.com | This is an email | 99988199    | Mobile    | This is a phone  | changeConflict |

  Scenario Outline: Confirmation modal
    Given I create a person with GUID "52bb2638-5645-4c9e-a621-5485ae165bf3" and seed it to the database
    Then I visit the 'Edit person' page for the person
    And I click edit person
    And I click cancel
    Then the confirmation modal is displayed
  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  #    @ignore
  #    Scenario Outline: Correspondence address using valid postcode lookup details
  #      When I edit a person's contact details "<person>"
  #      And I click add a correspondence address
  #      Then the correspondence address fields are displayed
  #      When I enter a postcode into the lookup field "<postCode>"
  #      And I click look up
  #      Then the select address selection box is populated "<postCode>"
  #      When I select an address from the selection
  #      And I click save correspondence address
  #      Then the correspondence address is saved
  #
  #      Examples:
  #          | person                               | postCode |
  #          | 279bf08c-0c9e-4d81-e24a-8930e8b37a68 | E8 2DY   |

  Scenario Outline: Correspondence address using invalid postcode lookup details
    Given I create a person with GUID "c3778a55-f01a-4192-adaa-4095f8f02765" and seed it to the database
    When I edit a person's contact details
    And I click add a correspondence address
    Then the correspondence address fields are displayed
    When I enter a postcode into the lookup field "asdasd"
    And I click look up
    Then an invalid postcode error is thrown

  Scenario Outline: Correspondence address using free text fields
    Given I create a person with GUID "9e8d6243-95f5-40f6-a052-dca33def7102" and seed it to the database
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
    Given I create a person with GUID "79fa8f12-d322-473d-b14f-15609a020d9d" and seed it to the database
    Given I have the maximum number of "<contactType>" for a person
    When I edit a person's contact details
    Then I cannot add any more contacts for "<contactType>"

    Examples:
      | contactType |
      | email       |
      | phone       |

  Scenario Outline: Add equality information
    Given I create a person with GUID "f61e1e17-d396-41c8-81de-b2101d160b0f" and seed it to the database
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
    Given I create a person with GUID "e5400f3e-cfa4-4b8d-bae6-50e4874d0ee9" and seed it to the database
    Then I seed blank equality information to the database, for such person
    Given I edit a person's equality information
    Then the equality information is displayed
    When I select an age group "<ageGroup>"
    And the sexual orientation information is not displayed

    Examples:
      | ageGroup |
      | Under 16 |

  Scenario Outline: Preferred term for gender field is displayed when "other" is selected for gender term
    Given I create a person with GUID "76ca0d2d-977a-4ba7-95d9-19163a3c7a5d" and seed it to the database
    Then I seed blank equality information to the database, for such person
    Given I edit a person's equality information
    Then the equality information is displayed
    And I select a gender "<gender>"
    And the preferred gender term field is displayed
    And I enter "<genderTerm>" into the gender term field

    Examples:
      | gender | genderTerm  |
      | Other  | Gender Term |

  Scenario: Confirmation alert not shown
    Given I create a person with GUID "76ca0d2d-977a-4ba7-95d9-19163a3c7a5d" and seed it to the database
    When I edit a person's contact details
    And I click add a correspondence address
    Then the correspondence address fields are displayed
    When I enter "Address" into address line 1
    And the review changes option is visible
    And the next button is disabled
    When I clear address line 1
    Then the next button is enabled