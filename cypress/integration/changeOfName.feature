Feature: As an internal Hackney User
          I want to be able to initiate a change of name process from the processes page,
          via the person page and tenure page
          So that I can complete a legal change of name for a person

  Background:
    Given I am logged in
#
#  Scenario Outline: AC1 - CoN Process option
#    Given I am on the MMH home page
#    When I enter 'ka' and select 'Person' and click on search button
#    Then I am on the Person search results page
#    When I select person and click on 'New Process' button
#    And I select 'Changes to a tenancy' from the processes menu
#    Then a further sub menu is expanded into view
#    When I select 'Change of Name' to initiate the change of name process for the selected person
#    Then 'Change of Name' page is displayed
#    Examples:
#    |personId|