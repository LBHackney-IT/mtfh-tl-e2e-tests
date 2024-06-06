@cautionary-alerts
@authentication
@common
@root
@personal-details


Feature: Create Cautionary Alerts

    Background:
        Given I am logged in

Scenario: Add cautionary alert for a Person and verify Red bell icon is displayed next to the person
    Given I seeded the database
    Then I visit the 'Person details' page
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
    Then I visit the 'Person details' page
    And I can see the section Cautionary Alerts with a Red bell icon
    And I can see the Cautionary Alert type

@SmokeTest
Scenario: 'Update cautionary alert' on Check and confirm Cautionary alert page by clicking on the 'Change link'
    Given I seeded the database
    Then I visit the 'Person details' page
    When I click on Add cautionary alert link
    Then I am taken to the Add cautionary alert page
    When I enter Assure reference
    And I enter Date of Incident as Day Month and Year
    And select Type of Caution
    And I enter Description of Incident
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And the Cautionary alert details are displayed
    When I click on Change link for 'Assurance reference number'
    Then I am taken to the Add cautionary alert page
    When I update the 'Assurance reference number' with a new value
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And I can see the 'Assurance reference number' is updated with the new value
    When I click on Change link for 'Date of incident'
    Then I am taken to the Add cautionary alert page
    When I update the 'Date of incident' with a new value
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And I can see the 'Date of incident' is updated with the new value
    When I click on Change link for 'Type of caution'
    Then I am taken to the Add cautionary alert page
    When I update the 'Type of caution' with a new value
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And I can see the 'Type of caution' is updated with the new value
    When I click on Change link for 'Description'
    Then I am taken to the Add cautionary alert page
    When I update the 'Description' with a new value
    And I click on Save and Continue button
    Then I am on Check and confirm cautionary alert page
    And I can see the 'Description' is updated with the new value
    When I click on Save cautionary alert button
    Then I visit the 'Person details' page
    And I can see the section Cautionary Alerts with a Red bell icon
    And I can see the Cautionary Alert type with the new value


Scenario: Verify Validation error messages in Add Cautionary Alerts page
    Given I seeded the database
    Then I visit the 'Person details' page
    When I click on Add cautionary alert link
    Then I am taken to the Add cautionary alert page
    When I click on Save and Continue button
    Then Validation error messages is displayed for Assure reference
    And Validation error messages is displayed for Date of Incident
    And Validation error messages is displayed for Type of Caution
    And Validation error messages is displayed for Description of Incident


  Scenario: Verify Validation error messages for Date of Incident Field
    Given I seeded the database
    Then I visit the 'Person details' page
    When I click on Add cautionary alert link
    Then I am taken to the Add cautionary alert page
    When I enter Assure reference
    And select Type of Caution
    And I enter Description of Incident
    And I enter only Day for Date of Incident
    And I click on Save and Continue button
    Then Validation error messages is displayed for Month and Year
    When I enter only Day and Month for Date of Incident
    And I click on Save and Continue button
    Then Validation error messages is displayed for Year
    When I enter only Day and Year for Date of Incident
    And I click on Save and Continue button
    Then Validation error messages is displayed for Month
    When I enter only Month and Year for Date of Incident
    And I click on Save and Continue button
    Then Validation error messages is displayed for Day
    When I enter Future date
    And I click on Save and Continue button
    Then Validation error message is displayed for Future date