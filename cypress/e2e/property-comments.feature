@authentication
@comments
@common
@root

Feature: Property Comment
    I want to create and view property's comments

    Background:
        Given I am logged in

    @SmokeTest
    @Negative
    Scenario Outline: Validation message is displayed
        Given I seeded the database with an asset
        When I view a property ""
        And Add comment button is displayed
        When I click on Add comment button
        And I click the save comment button "<commentType>"
        And a validation error occurs "<commentType>"
        Examples:
            | propertyName | commentType |
            | lon          | property    |

    @SmokeTest
    Scenario Outline: I go to create a comment for a Property
        Given I seeded the database with an asset
        When I view a property ""
        And Add comment button is displayed
        When I click on Add comment button
        And I create a comment for test
        Then I can see the same comments in the Person details page
        And I can see the timestamp for the created comment "<commentType>"
        Examples:
            | propertyName | commentType |
            | lon          | property    |


    @Positive
    Scenario Outline: Character limit counter
        Given I seeded the database with an asset
        When I view a property ""
        And Add comment button is displayed
        And Add comment button is displayed
        When I click on Add comment button
        And I enter <characters> characters into the comment field "<commentType>"
        Then the number of characters remaining is correct <characters> "<commentType>"
        Examples:
            | propertyName | commentType | characters |
            | lon          | property    | 105        |

    @Negative
    Scenario Outline: Character limit exceeded
        Given I seeded the database with an asset
        When I view a property ""
        And Add comment button is displayed
        When I click on Add comment button
        When I enter <characters> characters into the comment field "<commentType>"
        Then the warning message tells me I am over by <characters>
        Examples:
            | propertyName | commentType | characters |
            | lon          | property    | 1005       |


    @device
    Scenario Outline: I go to create a comment for a property page on a device
        Given I seeded the database with an asset
        Given I am on the create comment page for "<commentType>"
        And I am using a mobile viewport "<device>"
        When I enter a valid title
        And I enter a valid comment
        And I select a comment category "<category>"
        Then I click the save comment button "<commentType>"
        Then the comment is submitted "<commentType>"
        Examples:
            | commentType | device        | category            |
            | property    | ipad-2        | Appointments        |
            | property    | ipad-mini     | Estate management   |
            | property    | iphone-3      | Evictions           |
            | property    | iphone-4      | Parking             |
            | property    | iphone-5      | Planned maintenance |
            | property    | iphone-6      | Rehousing           |
            | property    | iphone-6+     | Rents               |
            | property    | iphone-7      | Repairs             |
            | property    | iphone-8      | Service charge      |
            | property    | iphone-xr     | Temporary decant    |
            | property    | iphone-se2    | Tenure breaches     |
            | property    | macbook-11    | Tenure management   |
            | property    | macbook-13    | Voids               |
            | property    | macbook-15    | Appointments        |
            | property    | macbook-16    | Appointments        |
            | property    | samsung-note9 | Appointments        |
            | property    | samsung-s10   | Appointments        |


    @Accessibility
    Scenario Outline: Accessibility Testing
        Given I seeded the database with an asset
        Given I am on the create comment page for "<commentType>"
        And have no detectable a11y violations
        Examples:
            | commentType |
            | property    |

