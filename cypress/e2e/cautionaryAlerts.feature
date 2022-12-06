Feature: Create Cautionary Alerts

  Background:
    Given I am logged in
    And I seeded the database

  Scenario Outline: Add cautionary alert for a Person
#    Given I am on the MMH home page
#    When I enter "<personname>" as search criteria
#    And I select 'Person' and click on search button
#    Then I am on the Person search results page for "<personname>"
#    When I select person and click on checkbox
    Then I am on the Person details page for Alerts
    When I click on Add cautionary alert link
    Then I am taken to the Add cautionary alert page
    When I enter Assure reference
    And I enter Date of Incident as Day Month and Year
    And select Type of Caution
    And I enter Description of Incident
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And the Cautionary alert details are displayed
    When I click on Save cautionary alert button
    Then I am on the Person details page
    And I can see the section Cautionary Alerts with a Red bell icon
    And I can see the Cautionary Alert type
    Examples:
      |personname|
      |   za     |

#  Scenario Outline: Verify Validation error messages in Add Cautionary Alerts page
#    Given I am on the MMH home page
#    When I enter "<personname>" as search criteria
#    And I select 'Person' and click on search button
#    Then I am on the Person search results page for "<personname>"
#    When I select person and click on checkbox
#    Then I am on the Person details page
#    When I click on Add cautionary alert link
#    Then I am taken to the Add cautionary alert page
#    When I click on Save and Continue button
#    Then Validation error messages is displayed for Assure reference
#    And Validation error messages is displayed for Date of Incident
#    And Validation error messages is displayed for Type of Caution
#    And Validation error messages is displayed for Description of Incident
#    Examples:
#      |personname|
#      |   za     |
#
#  Scenario Outline: Verify Validation error messages Date of Incident Field
#    Given I am on the MMH home page
#    When I enter "<personname>" as search criteria
#    And I select 'Person' and click on search button
#    Then I am on the Person search results page for "<personname>"
#    When I select person and click on checkbox
#    Then I am on the Person details page
#    When I click on Add cautionary alert link
#    Then I am taken to the Add cautionary alert page
#    When I enter Assure reference
#    And select Type of Caution
#    And I enter Description of Incident
#    And I enter only Day for Date of Incident
#    And I click on Save and Continue button
#    Then Validation error messages is displayed for Month and Year
#    When I enter only Day and Month for Date of Incident
#    And I click on Save and Continue button
#    Then Validation error messages is displayed for Year
#    When I enter only Day and Year for Date of Incident
#    And I click on Save and Continue button
#    Then Validation error messages is displayed for Month
#    When I enter only Month and Year for Date of Incident
#    And I click on Save and Continue button
#    Then Validation error messages is displayed for Day
#    When I enter Future date
#    And I click on Save and Continue button
#    Then Validation error message is displayed
#
#    Examples:
#      |personname|
#      |   za     |