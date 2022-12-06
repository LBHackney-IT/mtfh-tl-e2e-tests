Feature: Create Cautionary Alerts

  Background:
    Given I am logged in
    And I seeded the database

  Scenario: Add cautionary alert for a Person and verify Red bell icon is displayed next to the person
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


  Scenario: Verify Validation error messages in Add Cautionary Alerts page
    Then I am on the Person details page for Alerts
    When I click on Add cautionary alert link
    Then I am taken to the Add cautionary alert page
    When I click on Save and Continue button
    Then Validation error messages is displayed for Assure reference
    And Validation error messages is displayed for Date of Incident
    And Validation error messages is displayed for Type of Caution
    And Validation error messages is displayed for Description of Incident


  Scenario: Verify Validation error messages for Date of Incident Field
    Then I am on the Person details page for Alerts
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



    # work on the below discretion alerts once the build is in staging

#  @SmokeTest
#  Scenario Outline: AC1 - Viewing Discretion alert details on a persons page
#    Given A person "<person>" has a discretion alert assigned to them
#    When I view the persons profile page
#    Then I will be able to view a RED bell next to "Discretion alert"
#    When I click on the accordion element
#    Then discretion type "<alertType>" and the description "<alertDescription>" are displayed
#    Examples:
#      | person                               | alertType    | alertDescription   |
#      | 8d027289-0f0e-56a2-6473-980544f46b29 | Verbal Abuse | Tenant was abusive |
#
#    # commented the below as its failing in Dev - record not found in Dev
##  @SmokeTest
##  Scenario Outline: AC2 - Viewing Discretion alert details on a property page
##    Given A property "<property>" has a person with a discretion alert assigned to them
##    When I view a property profile page
##    Then I will be able to view a RED bell next to "Discretion alert"
##    When I click on the accordion element
##    Then discretion type "<alertType>" and the description "<alertDescription>" are displayed
##  Examples:
##      | property                             | alertType          | alertDescription                                                                                                                                                                                                                                                                                 |
##      | 81385307-ddd2-9699-599c-6aaa94f6f4b7 | Do not visit alone | No Lone Visits - Tenant has violent tendencies - Tenant is care in the community. 2 or 3 Operatives should attend jointly at all times, no works are to commence until Glen Wallker (Risk & Compliance Officer) confirms floor adhesive is free of asbestos and threat level is no longer there. |
#
#  @SmokeTest
#  Scenario Outline: AC3 - Viewing Discretion alert details on a tenure page
#    Given A tenure "<tenure>" has a person "<person>" with a discretion alert assigned to them
#    When I view a tenure profile page
#    Then I will be able to see the RED caution bell next to the property name
#    And I will be able to see the RED discretion alert next to the person name
#    Examples:
#      | tenure                               | person                               |
#      | ae46a00e-ed68-cc9f-b091-85c452c55a03 | 8d027289-0f0e-56a2-6473-980544f46b29 |
