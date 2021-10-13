@PersonCommentPage
Feature: T&L Person Comment
    I want to create and view a person's comments

    Background:
      Given I am logged in

    @SmokeTest
    @Positive
    Scenario Outline: I go to create a comment for a person page
      Given I am on the create comment page for "<commentType>" "<personId>"
      Then the create comment for a person components are displayed

      Examples:
        | commentType  | personId                               |
        | person       | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   |

    @SmokeTest
    @Positive
    Scenario Outline: Add comment - Relationship between selected record and records in other entities
      Given I am on the create comment page for "<commentType>" "<personId>"
      When I select a checkbox for "<checkbox>"
      And I create a comment
      Then I can see the same comments in the linked entities

      # Note: The id under the checkbox is the id for linked enttity e.g. tenure 
      Examples:
        | commentType | personId                             | checkbox                              |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | df5865fb-2e9e-26be-ee14-9fa50d769328  |
    
    @device    
    Scenario Outline: I go to create a comment for a person page on a device
      Given I am on the create comment page for "<commentType>" "<personId>"
      And I am using a mobile viewport "<device>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      Then the comment is submitted

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
   
    @SmokeTest
    @Positive    
    Scenario Outline: I go to create a comment for a person page
      Given I am on the create comment page for "<commentType>" "<personId>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      
      Examples:
        | commentType | personId                               |  category      |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   |  Appointments  |

    @Positive
    Scenario Outline: Character limit counter
      Given I am on the create comment page for "<commentType>" "<personId>"
      When I enter <characters> characters into the comment field
      Then the number of characters remaining is correct <characters>

      Examples:
        | commentType | personId                               | characters |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 2          |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 50         |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 99         |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 350        |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 500        |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the create comment page for "<commentType>" "<personId>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | commentType | personId                               | characters |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 502        |
        | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   | 508        |

    @SmokeTest
    @Negative  
    Scenario Outline: Validation message is displayed
      Given I am on the create comment page for "<commentType>" "<personId>"
      Then I click the save comment button
      And a validation error occurs

      Examples:
      | commentType | personId                             |
      | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    @Accessibility
    Scenario Outline: Accessibility Testing
      Given I am on the create comment page for "<commentType>" "<personId>"
      And have no detectable a11y violations

      Examples:
      | commetyType | personId                               |
      | person      | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31   |