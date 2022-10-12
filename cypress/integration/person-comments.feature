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
    Given I am on the MMH home page
    When I enter "<personname>" as search criteria
    And I select 'Person' and click on search button
    Then I am on the Person search results page for "<personname>"
    When I select person and click on checkbox
    Then I am on the Person details page
    And Add comment button is displayed
    When I click on Add comment button
    Then I create a comment for test
    Then I can see the same comments in the Person details page
    And I can see the timestamp for the created comment "<commentType>"
    Examples:
      |personname|commentType|
      |   za     |person     |

  @SmokeTest
    @Negative
  Scenario Outline: Validation message is displayed
    Given I am on the MMH home page
    When I enter "<personname>" as search criteria
    And I select 'Person' and click on search button
    Then I am on the Person search results page for "<personname>"
    When I select person and click on checkbox
    Then I am on the Person details page
    And Add comment button is displayed
    When I click on Add comment button
    And I click the save comment button "<commentType>"
    And a validation error occurs "<commentType>"
    Examples:
      | personname | commentType |
      | za         | person      |

    @device
    Scenario Outline: I go to create a comment for a person page on a device
      Given I am on the create comment page for "<commentType>" "<personId>"
      And I am using a mobile viewport "<device>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button "<commentType>"
      Then the comment is submitted "<commentType>"

      Examples:
        | commentType   | personId                             | device        | category             |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-2        | Appointments         |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-mini     | Estate management    |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-3      | Evictions            |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-4      | Parking              |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-5      | Planned maintenance  |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6      | Rehousing            |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6+     | Rents                |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-7      | Repairs              |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-8      | Service charge       |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-xr     | Temporary decant     |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-se2    | Tenure breaches      |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-11    | Tenure management    |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-13    | Voids                |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-15    | Appointments         |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-16    | Appointments         |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-note9 | Appointments         |
        | person        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-s10   | Appointments         |


    @Positive
      @SmokeTest
    Scenario Outline: Character limit counter
      Given I am on the MMH home page
      When I enter "<personname>" as search criteria
      And I select 'Person' and click on search button
      Then I am on the Person search results page for "<personname>"
      When I select person and click on checkbox
      Then I am on the Person details page
      And Add comment button is displayed
      When I click on Add comment button
      And I enter <characters> characters into the comment field "<commentType>"
      Then the number of characters remaining is correct <characters> "<commentType>"
      Examples:
        | personname | characters | commentType |
        | za         | 100        | person      |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the MMH home page
      When I enter "<personname>" as search criteria
      And I select 'Person' and click on search button
      Then I am on the Person search results page for "<personname>"
      When I select person and click on checkbox
      Then I am on the Person details page
      And Add comment button is displayed
      When I click on Add comment button
      When I enter <characters> characters into the comment field "<commentType>"
      Then the warning message tells me I am over by <characters>
      Examples:
        | personname | characters | commentType |
        | za         | 1002        | person      |




#    @Accessibility
#    Scenario Outline: Accessibility Testing
#      Given I am on the create comment page for "<commentType>" "<personId>"
#      And have no detectable a11y violations
#
#      Examples:
#      | commentType | personId                               |
#      | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   |
#
