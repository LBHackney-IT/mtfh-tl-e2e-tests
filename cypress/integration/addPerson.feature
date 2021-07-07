@AddPersonPage
Feature: Add a new person to a tenure
  I want to add a person to a tenure

  Background: 
    Given I am logged in
  
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
    And I select a gender "<gender>"
    And I select a nationality "<nationality>"
    And I enter a national insurance number "<nationalInsuranceNumber>"
    And I enter a place of birth "<placeOfBirth>"
    And I select a preferred title "<preferredTitle>"
    And I select a preferred first name "<preferredFirstName>"
    And I select a preferred middle name "<preferredMiddleName>"
    And I select a preferred last name "<preferredLastName>"
    And I click to add a language
    Then the add language options are displayed
    And I select a language "<language>"
    And I click to add an id
    Then the add id options are displayed
    And I select an id type "<idType>"
    And I enter an id number "<idNumber>"
    And I select id option seen "<idSeen>"
    And I enter a reason for creation
    And I click add person
    And I click the done button
    And I am on the tenure page '<tenure>'
    And the person has been added to the tenure
    # And the person is added to the tenure page "<title>" "<firstName>" "<middleName>"

    Examples:
      | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | gender | nationality | nationalInsuranceNumber | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | language | idType          | idNumber | idSeen |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Test      | Test       | guid     | 08  | 05    | 1969 | Male   | Fijian        | AA123456C               | Hospital     | Mrs            | Alan               | Coach Feratu        | Jefferson         | Occitan  | Passport        | 999999   | Yes    |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mrs   | Household member    | Test      | Test       | guid     | 09  | 03    | 1983 | Other  | Canadian      | AA123456C               | Toronto      | Dr             | Karen              | Steve               | Henderson         | Sanskrit | Driving Licence | 111111   | No     |

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
    And I enter a national insurance number "<nationalInsuranceNumber>"
    And I enter a reason for creation
    And I click add person
    Then the form error container is displayed

    Examples:
      | tenure                               | personType          | title | firstName | middleName | lastName | day | month | year | nationalInsuranceNumber |
      | 957cc50e-2dc4-e782-a013-c0a331884e49 | Named tenure holder | Mr    | Testy     | McTest     | Face     | 08  | 05    | 2099 | ZZ098765Z               |

  Scenario Outline: Communication
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct 
    And I click to add a language <add> times
    Then the add language options are displayed
    Then the add language button is not displayed
    And I click to remove a language <remove> times
    Then the add language options are not displayed

    Examples:
      | tenure                               | add | remove |
      | 957cc50e-2dc4-e782-a013-c0a331884e49 | 10  | 10     |
    

  Scenario Outline: ID Documents
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct
    And I click to add an id <add> times 
    Then the add id options are displayed
    Then the add id button is not displayed
    And I click to remove an id <remove> times
    Then the add language options are not displayed

    Examples:
      | tenure                               | add | remove |
      | 957cc50e-2dc4-e782-a013-c0a331884e49 | 5   | 5      |

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
    # And the person is added to the tenure page "<title>" "<firstName>" "<middleName>"
    
    Examples:
        | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | email                     | emailDescription  | phoneNumber | phoneType | phoneDescription  |
        | 957cc50e-2dc4-e782-a013-c0a331884e49 | Mr    | Named tenure holder | Test      | Account    | guid     | 01  | 01    | 1950 | testymctestface@email.com | email description | 01189998    | Other     | phone description |

    @Positive
    Scenario Outline: Edit a tenure
      Given I create a person for tenure '<tenure>'
      Then the add a new person tenure page is correct
      When I select person type "<personType>"
      And I select a title "<title>"
      And I enter a first name "<firstName>"
      And I enter a middle name "<middleName>"
      And I enter a last name "<lastName>"
      And I enter a date of birth "<day>" "<month>" "<year>"
      And I select a nationality "<nationality>"
      And I enter a national insurance number "<nationalInsuranceNumber>"
      And I enter a place of birth "<placeOfBirth>"
      And I select a preferred title "<preferredTitle>"
      And I select a preferred first name "<preferredFirstName>"
      And I select a preferred middle name "<preferredMiddleName>"
      And I select a preferred last name "<preferredLastName>"
      And I click to add a language
      Then the add language options are displayed
      And I select a language "<language>"
      And I click to add an id
      Then the add id options are displayed
      And I select an id type "<idType>"
      And I enter an id number "<idNumber>"
      And I select id option seen "<idSeen>"
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
      And I select a title "<modifiedTitle>"
      And I enter a first name "<modifiedFirstName>"
      And I enter a middle name "<modifiedMiddleName>"
      And I enter a last name "<modifiedLastName>"
      And I enter a date of birth "<modifiedDay>" "<modifiedMonth>" "<modifiedYear>"
      And I select a gender "<modifiedGender>"
      And I select a nationality "<modifiedNationality>"
      And I enter a national insurance number "<modifiedNationalInsuranceNumber>"
      And I enter a place of birth "<modifiedPlaceOfBirth>"
      And I select a preferred title "<modifiedPreferredTitle>"
      And I select a preferred first name "<modifiedPreferredFirstName>"
      And I select a preferred middle name "<modifiedPreferredMiddleName>"
      And I select a preferred last name "<modifiedPreferredLastName>"
      And I click the update person button
      And I click the done button
      And the person has been updated "<modifiedFirstName>" "<modifiedMiddleName>" "<modifiedLastName>"

      Examples:
        | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | gender | nationality | nationalInsuranceNumber | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | language | idType          | idNumber | idSeen | email                  | emailDescription | phoneNumber | phoneType | phoneDescription | modifiedTitle | modifiedFirstName | modifiedMiddleName | modifiedLastName | modifiedDay | modifiedMonth | modifiedYear | modifiedGender | modifiedNationality | modifiedNationalInsuranceNumber | modifiedPlaceOfBirth | modifiedPreferredTitle | modifiedPreferredFirstName | modifiedPreferredMiddleName | modifiedPreferredLastName |
        | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Original  | Test       | guid     | 09  | 12    | 1950 | Female | Japan       | AA123456C               | Mt. Fuji     | Reverend       | Pref orig          | Mid orig            | guid              | Occitan  | Passport        | 999999   | Yes    | testytest@test.com     | This is an email | 0118999     | Other     | This is a phone | Ms            | Modified          | modified           | guid             | 12          | 12            | 2012         | Male           | Switzerland         | BB123456B                       | Geneva               | Mr                     | Modified first             | Modifield middle            | modified last             |
        | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mrs   | Household member    | Original  | Test       | guid     | 30  | 06    | 1988 | Male   | Greece      | AA123456C               | Crete        | Ms             | Pref orig          | Mid orig            | guid              | Sanskrit | Driving Licence | 111111   | No     | testymctester@test.com | This is an email | 99988199    | Mobile    | This is a phone | Mr            | Modified          | modified           | guid             | 30          | 03            | 2015         | Female         | Brazil              | BB123456B                       | Sao Paulo            | Mrs                    | Modified first             | Modifield middle            | modified last             |

    Scenario Outline: Confirmation modal
      Given I create a person for tenure '<tenure>'
      Then the add a new person tenure page is correct
      When I select person type "<personType>"
      And I select a title "<title>"
      And I enter a first name "<firstName>"
      And I enter a middle name "<middleName>"
      And I enter a last name "<lastName>"
      And I enter a date of birth "<day>" "<month>" "<year>"
      And I select a gender "<gender>"
      And I select a nationality "<nationality>"
      And I enter a national insurance number "<nationalInsuranceNumber>"
      And I enter a place of birth "<placeOfBirth>"
      And I select a preferred title "<preferredTitle>"
      And I select a preferred first name "<preferredFirstName>"
      And I select a preferred middle name "<preferredMiddleName>"
      And I select a preferred last name "<preferredLastName>"
      And I click to add a language
      Then the add language options are displayed
      And I select a language "<language>"
      And I click to add an id
      Then the add id options are displayed
      And I select an id type "<idType>"
      And I enter an id number "<idNumber>"
      And I select id option seen "<idSeen>"
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
      | tenure                               | title | personType          | firstName | middleName | lastName | day | month | year | gender | nationality | nationalInsuranceNumber | placeOfBirth | preferredTitle | preferredFirstName | preferredMiddleName | preferredLastName | language | idType          | idNumber | idSeen | email                     | emailDescription  | phoneNumber | phoneType | phoneDescription  |
      | e31bd4e3-8639-35ee-9849-47f5ae62ac17 | Mr    | Named tenure holder | Original  | Test       | guid     | 09  | 12    | 1950 | Female | Japan       | AA123456C               | Mt. Fuji     | Reverend       | Pref orig          | Mid orig            | guid              | Occitan  | Passport        | 999999   | Yes    | testymctestface@email.com | email description | 01189998    | Other     | phone description |

    @Accessibility
    Scenario: Accessibility Testing
      And have no detectable a11y violations