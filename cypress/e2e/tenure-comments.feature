@comments
@authentication
@common
@root

Feature: Tenure Comment
    I want to create and view tenure's comments

    Background:
        Given I am logged in

    Scenario Outline: I go to create a comment for a tenure page
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        Then the create comment component is displayed

    @SmokeTest
    @Positive
    Scenario Outline: Add comment - Relationship between selected record and records in other entities
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I select a checkbox
        And I create a comment
        Then I can see the same comments in the linked entities

    @device
    Scenario Outline: I go to create a comment for a tenure page on a device
        Given I seeded the database with a tenure
        Given I am on the create comment page for "<commentType>"
        And I am using a mobile viewport "<device>"
        When I enter a valid title
        And I enter a valid comment
        And I select a comment category "<category>"
        Then I click the save comment button "<commentType>"
        Then the comment is submitted "<commentType>"

        Examples:
            | commentType | device        | category            |
            | tenure      | ipad-2        | Appointments        |
            | tenure      | ipad-mini     | Estate management   |
            | tenure      | iphone-3      | Evictions           |
            | tenure      | iphone-4      | Parking             |
            | tenure      | iphone-5      | Planned maintenance |
            | tenure      | iphone-6      | Rehousing           |
            | tenure      | iphone-6+     | Rents               |
            | tenure      | iphone-7      | Repairs             |
            | tenure      | iphone-8      | Service charge      |
            | tenure      | iphone-xr     | Temporary decant    |
            | tenure      | iphone-se2    | Tenure breaches     |
            | tenure      | macbook-11    | Tenure management   |
            | tenure      | macbook-13    | Voids               |
            | tenure      | macbook-15    | Appointments        |
            | tenure      | macbook-16    | Appointments        |
            | tenure      | samsung-note9 | Appointments        |
            | tenure      | samsung-s10   | Appointments        |

    @Positive
    Scenario Outline: Save comment for tenure
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I enter a valid title
        And I enter a valid comment
        And I select a comment category "<category>"
        Then I click the save comment button "<commentType>"
        And the comment is submitted "<commentType>"
        And I can see the timestamp for the created comment "<commentType>"

        Examples:
            | commentType | category     |
            | tenure      | Appointments |

    @Negative
    Scenario Outline: User cannot submit a comment without mandatory fields
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I do not fill the mandatory fields:"<commentTitle>" "<commentDescription>" "<commentCategory>"
        And I click the save comment button "<commentType>"
        Then I can see a specific validation message for the field "<validationMessage>"

        Examples:
            | commentType | commentTitle | commentDescription | commentCategory | validationMessage                             |
            | tenure      |              | test comment       | Rents           | You must provide a title for this comment     |
            | tenure      | test title   |                    | Rents           | You must enter a description for this comment |
            | tenure      | test title   | test comment       |                 | You must select a category for this comment   |

    @Positive
    #Notes: TL-60 AC3.1, AC 3.2 and 3.4
    Scenario Outline: Cancel comment and pop up message
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I click the Discard comment link
        Then I can see the cancellation pop up for comment
        Then I can cancel the comment

        Examples:
            | commentType |
            | tenure      |

    @Positive
    Scenario Outline: Character limit counter
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I enter <characters> characters into the comment field "<commentType>"
        Then the number of characters remaining is correct <characters> "<commentType>"

        Examples:
            | commentType | characters |
            | tenure      | 350        |

    @Negative
    Scenario Outline: Character limit exceeded
        Given I seeded the database with a tenure
        Given I am on the create comment page for "tenure"
        When I enter <characters> characters into the comment field "<commentType>"
        Then the warning message tells me I am over by <characters>

        Examples:
            | commentType | characters |
            | tenure      | 1008       |

@Accessibility
Scenario Outline: Accessibility Testing for tenure
Given I seeded the database with a tenure
  Given I am on the create comment page for "tenure"
  And have no detectable a11y violations

  Examples:
    | commentType |
    | tenure      |