Feature: As an internal Hackney User
          I want to be able to initiate a change of name process from the processes page,
          via the person page
          So that I can complete a legal change of name for a person

  Background:
    Given I am logged in

    #######to implement later which can select any peron record and do an E2E test

#  Scenario Outline: AC1 - CoN Process option
#    Given I am on the MMH home page
#    When I enter "<personname>" as search criteria
#    And I select 'Person' and click on search button
#    Then I am on the Person search results page
#    When I select person and click on 'New Process' button
#    And I select 'Changes to a tenancy' from the processes menu
#    Then a further sub menu is expanded into view
#    When I select 'Change of Name' to initiate the change of name process for the selected person
#    Then 'Change of Name' page is displayed
#    Examples:
#    |personname|
#    |   za     |

  Scenario Outline: AC1 - CoN Process option
    Given I am on the Person page for "<personid>"
    When I click on 'New Process' button
    And I select 'Changes to a tenancy' from the processes menu
    Then a further sub menu is expanded into view
    When I select 'Change of Name' to initiate the change of name process for the selected person
    Then 'Change of Name' page is displayed
    And Start Process button is disabled
    When I select the checkbox 'I have explained to the tenant'
    Then Start Process button is enabled
    When I select the button
    Then Change of Name edit page is displayed
    And Next button is disabled
    And Status Stepper is at Tenant's new name step
    When I select Title and enter First and Last name
    And I click on Next button
    Then I am on the supporting documents page
    Examples:
      | personname | personid                             |
      | za         | 4b260032-8c67-9878-c4db-dc72252a131f |

  Scenario Outline: AC2 - Field Validation error messages for Title, FirstName and LastName
    Given I am on the Person page for "<personid>"
    When I click on 'New Process' button
    And I select 'Changes to a tenancy' from the processes menu
    Then a further sub menu is expanded into view
    When I select 'Change of Name' to initiate the change of name process for the selected person
    Then 'Change of Name' page is displayed
    When I select the checkbox 'I have explained to the tenant'
    When I select the button
    Then Change of Name edit page is displayed
    When I enter Title only
    And I click on Next button
    Then a validation error message for 'First name' and 'Last name' are displayed
    When I enter 'Title' and 'First name' only
    And I click on Next button
    Then a validation error message for 'Last name' is displayed
    When I enter 'Title' and 'Last name' only
    And I click on Next button
    Then a validation error message for 'First name' is displayed
    When I enter 'First name' and 'Last name' only
    And I click on Next button
    Then a validation error message for 'Title' is displayed
    Examples:
      | personname | personid                             |
      | za         | 4b260032-8c67-9878-c4db-dc72252a131f |




