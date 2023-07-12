@authentication
@common
@processes
@property
@root

Feature: Property Page
    View property page

    Background:
        Given I am logged in

    @SmokeTest
    Scenario Outline: View property details
        Given I seeded the database with an asset with a previous tenure
        When I view a property ""
        And the page breadcrumb is displayed
        And the property information is displayed
        And the tenure information is displayed
        When I click on the view tenure button
        Then tenure page is displayed
        And I click on the breadcrumb
        Then I am taken to the search page

    @Regression
    Scenario Outline: View property via tenure
        Given I seeded the database with a tenure
        When I view a tenure
        Then tenure page is displayed
        And the tenure information is displayed
        And I click on the view property button
        Then the property information is displayed

    @Regression
    Scenario Outline: View property via person
        Given I seeded the database with a person with an active tenure
        Given the person has a correspondence address
        Then I visit the 'Person details' page
        Then the personal details are displayed
        And I click on the view property button for a person
        Then the property information is displayed

    @SmokeTest
    Scenario Outline: Repairs container is displayed
        Given I seeded the database with an asset
        When I view a property ""
        Then the repairs container is displayed
        And the repairs card list is displayed "<repairsType>"

        Examples:
            | repairsType |
            | In Progress |

    @smoke
    Scenario Outline: 'New tenure' button should be displayed if no tenure information is returned for a given property
        Given I seeded the database with an asset
        When I view a property ""
        And New Tenure button should be displayed