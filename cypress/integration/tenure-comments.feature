@authentication
@comments
@common
@root

Feature: Tenure Comment
    I want to create and view tenure's comments

    Background:
      Given I am logged in

    @SmokeTest
    @Positive
    @Production
    Scenario Outline: I go to create a comment for a tenure page
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      Then the create comment component is displayed

      Examples:
        | commentType | tenureId                             |
        | tenure      | f5995a9d-b227-4e23-0957-2233db537ea9 |
        # | tenure      | f5995a9d-b227-4e23-0957-2233db537ea9 |


    @Positive
    Scenario Outline: Add comment - Relationship between selected record and records in other entities
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I select a checkbox for "<checkbox>"
      And I create a comment
      Then I can see the same comments in the linked entities

      # Note: The id under the checkbox is the id for linked enttity e.g. person 
      Examples:
        | commentType| tenureId                             | checkbox                             |
        | tenure     | fde50d68-84c3-c166-6338-895c12ebf8fd | 0fb4997e-17a9-4373-6211-40b374f01533 |

    @device    
    Scenario Outline: I go to create a comment for a tenure page on a device
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      And I am using a mobile viewport "<device>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      Then the comment is submitted

      Examples:
      | commentType   | tenureId                             | device        | category             |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-2        | Appointments         |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-mini     | Estate management    |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-3      | Evictions            |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-4      | Parking              |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-5      | Planned maintenance  |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6      | Rehousing            |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6+     | Rents                |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-7      | Repairs              |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-8      | Service charge       |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-xr     | Temporary decant     |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-se2    | Tenure breaches      |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-11    | Tenure management    |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-13    | Voids                |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-15    | Appointments         |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-16    | Appointments         |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-note9 | Appointments         |
      | tenure        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-s10   | Appointments         |

    @Positive  
    Scenario Outline: Save comment for tenure 
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      And the comment is submitted
      And I can see the timestamp for the created comment

      Examples:
        | commentType | tenureId                               | category     |
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97   | Appointments |
    
    @SmokeTest
    @Negative
      Scenario Outline: User cannot submit a comment without mandatory fields
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I do not fill the mandatory fields:"<commentTitle>" "<commentDescription>" "<commentCategory>"
      And I click the save comment button
      Then I can see a specific validation message for the field "<validationMessage>" 

      Examples:
      | commentType  | tenureId                               | commentTitle | commentDescription | commentCategory | validationMessage                              |
      | tenure       | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |              | test comment       |  Rents          | You must provide a title for this comment        |
      | tenure       | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | test title   |                    |  Rents          | You must enter a description for this comment    |
      | tenure       | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | test title   | test comment       |                 | You must select a category for this comment      |

    @SmokeTest
    @Positive
    #Notes: TL-60 AC3.1, AC 3.2 and 3.4
    Scenario Outline: Cancel comment and pop up message
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I click the Discard comment link
      Then I can see the cancellation pop up for comment
      Then I can cancel the comment

      Examples:
        | commentType | tenureId                             |
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |
  
    @Positive
    @SmokeTest
    Scenario Outline: Character limit counter
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I enter <characters> characters into the comment field
      Then the number of characters remaining is correct <characters>

      Examples:
        | commentType | tenureId                              | characters |
        # | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97  | 2          |
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97  | 99         |         
        # | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97  | 350        | 
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97  | 500        |

    @Negative
    @SmokeTest
    Scenario Outline: Character limit exceeded
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | commentType | tenureId                               | characters |
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97   | 502        |
        # | tenure      |5d576bff-59e4-9baf-3f80-0b9cc53d8a97    | 508        |

    @Accessibility
    Scenario Outline: Accessibility Testing for tenure
      Given I am on the create comment page for "<commentType>" "<tenureId>"
      And have no detectable a11y violations

      Examples:
        | commentType | tenureId                               |
        | tenure      | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97   |