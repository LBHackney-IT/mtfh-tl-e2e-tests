@AddPersonPage
@ignore
Feature: Add a new person to a tenure
  I want to add a person to a tenure

  Background: 
    Given I am logged in

  Scenario Outline: Add a new person to a tenure
    Given I create a person for tenure '<tenure>'
    Then the add a new person tenure page is correct
    When I select person type "<personType>"
    And I enter a first name "<firstName>"
    And I enter a middle name "<middleName>"
    And I enter a last name "<lastName>"
    And I enter a date of birth "<day>" "<month>" "<year>"
    And I enter a reason for creation
    And I click add person

    Examples:
        | tenure                               | personType          | firstName | middleName | lastName | day | month | year |
        | 957cc50e-2dc4-e782-a013-c0a331884e49 | Named tenure holder | Testy     | McTest     | Face     | 08  | 05    | 1969 |
