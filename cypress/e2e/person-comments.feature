@authentication
@comments
@common
@processes
@root

Feature: T&L Person Comment
    I want to create and view person's comments

    Background:
        Given I am logged in

    @SmokeTest
    Scenario Outline: I go to create a comment for a person page
        Given I seeded the database with a person
        Then I am on the person details page
        And Add comment button is displayed
        When I click on Add comment button
        And I create a comment for test
        Then I can see the same comments in the Person details page
        And I can see the timestamp for the created comment "<commentType>"
        Examples:
            | commentType |
            | person      |

    @SmokeTest
    @Negative
    Scenario Outline: Validation message is displayed
        Given I seeded the database with a person
        Then I am on the person details page
        And Add comment button is displayed
        When I click on Add comment button
        And I click the save comment button "<commentType>"
        And a validation error occurs "<commentType>"
        Examples:
            | commentType |
            | person      |

    @device
    Scenario Outline: I go to create a comment for a person page on a device
        Given I seeded the database with a person
        Given I am on the create comment page for "<commentType>"
        And I am using a mobile viewport "<device>"
        When I enter a valid title
        And I enter a valid comment
        And I select a comment category "<category>"
        Then I click the save comment button "<commentType>"
        Then the comment is submitted "<commentType>"

        Examples:
            | commentType | device        | category            |
            | person      | ipad-2        | Appointments        |
            | person      | ipad-mini     | Estate management   |
            | person      | iphone-3      | Evictions           |
            | person      | iphone-4      | Parking             |
            | person      | iphone-5      | Planned maintenance |
            | person      | iphone-6      | Rehousing           |
            | person      | iphone-6+     | Rents               |
            | person      | iphone-7      | Repairs             |
            | person      | iphone-8      | Service charge      |
            | person      | iphone-xr     | Temporary decant    |
            | person      | iphone-se2    | Tenure breaches     |
            | person      | macbook-11    | Tenure management   |
            | person      | macbook-13    | Voids               |
            | person      | macbook-15    | Appointments        |
            | person      | macbook-16    | Appointments        |
            | person      | samsung-note9 | Appointments        |
            | person      | samsung-s10   | Appointments        |


    @Positive
    @SmokeTest
    Scenario Outline: Character limit counter
        Given I seeded the database with a person

        Then I am on the person details page
        And Add comment button is displayed
        When I click on Add comment button
        And I enter <characters> characters into the comment field "<commentType>"
        Then the number of characters remaining is correct <characters> "<commentType>"
        Examples:
            | personname | characters | commentType |
            | za         | 100        | person      |

    @Negative
    Scenario Outline: Character limit exceeded
        Given I seeded the database with a person
        Then I am on the person details page
        And Add comment button is displayed
        When I click on Add comment button
        When I enter <characters> characters into the comment field "<commentType>"
        Then the warning message tells me I am over by <characters>
        Examples:
            | personname | characters | commentType |
            | za         | 1002       | person      |

    @Accessibility
    Scenario Outline: Accessibility Testing
        Given I seeded the database with a person
        Given I am on the create comment page for "<commentType>"
        And have no detectable a11y violations

        Examples:
            | commentType |
            | person      |