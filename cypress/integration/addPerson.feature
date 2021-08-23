@ignore
@AddPersonPage
Feature: Add a new person to a tenure
  I want to add a person to a tenure

  Background: 
    Given I am logged in

  @SmokeTest
  @Regression
  Scenario Outline: Removed fields are not displayed
    Given I create a person for tenure '<tenure>'
    Then the gender field is not displayed
    And the nationality field is not displayed
    And the national insurance field is not displayed
    And the add language options are not displayed
    And the add id options are not displayed

    Examples:
      | tenure                               |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 |
  
  @SmokeTest
  @Positive
  Scenario Outline: Add a new person to a tenure
    Given I create a person for tenure '<tenure>'
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
    And I click the done button
    And I am on the tenure page '<tenure>'
    And the person has been added to the tenure

    Examples:
      | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Test      | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mrs   | Household member    | Test      | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |

  @device
  Scenario Outline: Add a new person to tenure on a device
    Given I create a person for tenure '<tenure>'
    And I am using a mobile viewport "<device>"
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
    And I click the done button
    And I am on the tenure page '<tenure>'
    And the person has been added to the tenure

    Examples:
      | tenure                               | device        | title | personType          | firstName     | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | ipad-2        | Mr    | Named tenure holder | ipad2         | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | ipad-mini     | Mrs   | Household member    | ipad-mini     | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-3      | Mrs   | Named tenure holder | iphone3       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-4      | Miss  | Household member    | iphone4       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-5      | Mrs   | Named tenure holder | iphone5       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-6      | Mr    | Household member    | iphone6       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-6+     | Miss  | Named tenure holder | iphone6+      | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-7      | Miss  | Household member    | iphone7       | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-8      | Mr    | Named tenure holder | iphone8       | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-xr     | Mrs   | Household member    | iphone-xr     | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | iphone-se2    | Mrs   | Named tenure holder | iphone-se2    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | macbook-11    | Mr    | Household member    | macbook-11    | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | macbook-13    | Miss  | Named tenure holder | macbook-13    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | macbook-15    | Mr    | Household member    | macbook-15    | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | macbook-16    | Miss  | Named tenure holder | macbook-17    | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | samsung-note9 | Miss  | Household member    | samsung-note9 | Test       | guid     | 09  | 03    | 1983 | Toronto      | Dr             | Karen              | Steve               | Henderson         |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | samsung-s10   | Miss  | Named tenure holder | samsung-s10   | Test       | guid     | 08  | 05    | 1969 | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         |

  @SmokeTest
  @Negative
  Scenario Outline: Validation check
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct
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
      | tenure                               | personType          | title | firstName | middleName | lastName | day | month | year |
      | 957cc50e-2dc4-e782-a013-c0a331884e49 | Named tenure holder | Mr    | Testy     | McTest     | Face     | 08  | 05    | 2099 |

  @ignore
  @flaky
  Scenario Outline: New person returned in search
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct
    When I select person type "<personType>"
    And I select a title "<title>"
    And I enter a first name "<firstName>"
    And I enter a middle name "<middleName>"
    And I enter a last name "<lastName>"
    And I enter a date of birth "<day>" "<month>" "<year>"
    And I enter a reason for creation
    And I click add person
    And I click the done button
    And I am on the tenure page '<tenure>'
    Given I am on the search page
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"
    
    Examples:
        | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | characters |
        | 957cc50e-2dc4-e782-a013-c0a331884e49 | Mr    | Named tenure holder | Test      | Account    | guid     | 01  | 01    | 1950 | guid       |

  @SmokeTest
  @Positive
  Scenario Outline: Person Contact details/Minimum fields
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct
    When I select person type "<personType>"
    And I select a title "<title>"
    And I enter a first name "<firstName>"
    And I enter a middle name "<middleName>"
    And I enter a last name "<lastName>"
    And I enter a date of birth "<day>" "<month>" "<year>"
    And I enter a reason for creation
    And I click add person
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
    And the person has been added to the tenure
    
    Examples:
        | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | email                     | emailDescription  | phoneNumber | phoneType | phoneDescription  |
        | 957cc50e-2dc4-e782-a013-c0a331884e49 | Mr    | Named tenure holder | Test      | Account    | guid     | 01  | 01    | 1950 | testymctestface@email.com | email description | 01189998    | Other     | phone description |

    @ignoreDev
    @SmokeTest
    @Positive
    Scenario Outline: Edit a person
      Given I create a person for tenure '<tenure>'
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
      And I click the add email address button
      And I enter an email address "<email>"
      And I enter an email description "<emailDescription>"
      And I click save email address
      And the email information is captured "<email>" "<emailDescription>"
      And I click remove email address
      And the remove email address modal is displayed
      And I click cancel
      And the modal is not displayed
      And I click the add phone number button
      And I enter a phone number "<phoneNumber>"
      And I select a phone number type "<phoneType>"
      And I enter a phone number description "<phoneDescription>"
      And I click save phone number
      And I click remove phone number
      And the remove phone number modal is displayed
      And I click cancel
      And the modal is not displayed
      And I click the done button
      And the person has been added to the tenure
      And I am on the tenure page "<tenure>"
      And I edit the person "<title>" "<personType>" "<firstName>" "<middleName>"
      And I click edit person
      And the person type options are not displayed
      And I select a title "<modifiedTitle>"
      And I enter a first name "<modifiedFirstName>"
      And I enter a middle name "<modifiedMiddleName>"
      And I enter a last name "<modifiedLastName>"
      And I enter a date of birth "<modifiedDay>" "<modifiedMonth>" "<modifiedYear>"
      And I enter a place of birth "<modifiedPlaceOfBirth>"
      And I select a preferred title "<modifiedPreferredTitle>"
      And I select a preferred first name "<modifiedPreferredFirstName>"
      And I select a preferred middle name "<modifiedPreferredMiddleName>"
      And I select a preferred last name "<modifiedPreferredLastName>"
      And I click the update person button
      And I click the done button
      And I click edit person
      And I enter a first name "<conflictTitle>"
      And there is a merge conflict

      Examples:
        | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | email                  | emailDescription | phoneNumber | phoneType | phoneDescription | modifiedTitle | modifiedFirstName | modifiedMiddleName | modifiedLastName | modifiedDay | modifiedMonth | modifiedYear | modifiedPlaceOfBirth | modifiedPreferredTitle | modifiedPreferredFirstName | modifiedPreferredMiddleName | modifiedPreferredLastName | conflictTitle  |
        | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Original  | Test       | guid     | 09  | 12    | 1950 | Mt. Fuji     | Reverend       | Pref orig          | Mid orig            | guid              | testytest@test.com     | This is an email | 0118999     | Other     | This is a phone  | Ms            | Modified          | modified           | guid             | 12          | 12            | 2012         | Geneva               | Mr                     | Modified first             | Modifield middle            | modified last             | changeConflict |
        | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mrs   | Household member    | Original  | Test       | guid     | 30  | 06    | 1988 | Crete        | Ms             | Pref orig          | Mid orig            | guid              | testymctester@test.com | This is an email | 99988199    | Mobile    | This is a phone  | Mr            | Modified          | modified           | guid             | 30          | 03            | 2015         | Sao Paulo            | Mrs                    | Modified first             | Modifield middle            | modified last             | changeConflict |

    @ignore
    Scenario Outline: Confirmation modal
      Given I create a person for tenure '<tenure>'
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
      And I click the done button
      And the person has been added to the tenure
      And I am on the tenure page '<tenure>'
      And I edit the person "<title>" "<personType>" "<firstName>" "<middleName>"
      And I click edit person
      And I click cancel
      Then the confirmation modal is displayed

      Examples:
      | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | gender | nationality | nationalInsuranceNumber | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | language | idType   | idNumber | idSeen | email                     | emailDescription  | phoneNumber | phoneType | phoneDescription  |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Original  | Test       | guid     | 09  | 12    | 1950 | Female | Japanese    | AA123456C               | Mt. Fuji     | Reverend       | Pref orig          | Mid orig            | guid              | Occitan  | Passport | 999999   | Yes    | testymctestface@email.com | email description | 01189998    | Other     | phone description |

    @Accessibility
    Scenario: Accessibility Testing
      And have no detectable a11y violations