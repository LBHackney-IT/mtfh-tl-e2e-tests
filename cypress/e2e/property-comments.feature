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
    Given I am on the MMH home page
    When I enter "<propertyName>" as search criteria
    And I select 'property' and click on search button
    Then I am on the Property search results page for "<propertyName>"
    When I select property
    Then I am on the Property details page
    And Add comment button is displayed
    When I click on Add comment button
    And I click the save comment button "<commentType>"
    And a validation error occurs "<commentType>"
    Examples:
      |propertyName|commentType|
      |   lon      |property   |

  @SmokeTest
  Scenario Outline: I go to create a comment for a Property
    Given I am on the MMH home page
    When I enter "<propertyName>" as search criteria
    And I select 'property' and click on search button
    Then I am on the Property search results page for "<propertyName>"
    When I select property
    Then I am on the Property details page
    And Add comment button is displayed
    When I click on Add comment button
    And I create a comment for test
    Then I can see the same comments in the Person details page
    And I can see the timestamp for the created comment "<commentType>"
    Examples:
      |propertyName|commentType|
      |   lon      |property   |


    @Positive
    Scenario Outline: Character limit counter
      Given I am on the MMH home page
      When I enter "<propertyName>" as search criteria
      And I select 'property' and click on search button
      Then I am on the Property search results page for "<propertyName>"
      When I select property
      Then I am on the Property details page
      And Add comment button is displayed
      When I click on Add comment button
      And I enter <characters> characters into the comment field "<commentType>"
      Then the number of characters remaining is correct <characters> "<commentType>"
      Examples:
        |propertyName|commentType|characters|
        |   lon      |property   |   105    |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the MMH home page
      When I enter "<propertyName>" as search criteria
      And I select 'property' and click on search button
      Then I am on the Property search results page for "<propertyName>"
      When I select property
      Then I am on the Property details page
      And Add comment button is displayed
      When I click on Add comment button
      When I enter <characters> characters into the comment field "<commentType>"
      Then the warning message tells me I am over by <characters>
      Examples:
        |propertyName|commentType|characters|
        |   lon      |property   |   1005    |


    @device
    Scenario Outline: I go to create a comment for a property page on a device
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      And I am using a mobile viewport "<device>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button "<commentType>"
      Then the comment is submitted "<commentType>"
      Examples:
        | commentType | propertyId                           | device        | category            |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | ipad-2        | Appointments        |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | ipad-mini     | Estate management   |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-3      | Evictions           |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-4      | Parking             |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-5      | Planned maintenance |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-6      | Rehousing           |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-6+     | Rents               |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-7      | Repairs             |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-8      | Service charge      |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-xr     | Temporary decant    |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-se2    | Tenure breaches     |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-11    | Tenure management   |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-13    | Voids               |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-15    | Appointments        |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-16    | Appointments        |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | samsung-note9 | Appointments        |
        | property    | a2d7901a-9895-e86a-f9d3-542222400a3a | samsung-s10   | Appointments        |


  @Accessibility
    Scenario Outline: Accessibility Testing
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      And have no detectable a11y violations
      Examples:
        | commentType | propertyId                               |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   |

