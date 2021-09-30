@TenureCommentPage
Feature: Tenure Comment
    I want to view a tenure's comments

    Background:
      Given I am logged in

    @SmokeTest
    @Positive
    Scenario Outline: I go to create a comment for a tenure page
      Given I am on the create comment for a tenure page "<tenure>"
      Then the create comment for a tenure components are displayed

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |
        
    @device    
    Scenario Outline: I go to create a comment for a tenure page on a device
      Given I am on the create comment for a tenure page "<tenure>"
      And I am using a mobile viewport "<device>"
      When I enter a valid comment
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | tenure                               | device        |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-2        |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-mini     |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-3      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-4      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-5      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6+     |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-7      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-8      |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-xr     |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-se2    |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-11    |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-13    |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-15    |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-16    |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-note9 |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-s10   |

    @SmokeTest
    @Positive    
    Scenario Outline: I go to create a comment for a tenure page
      Given I am on the create comment for a tenure page "<tenure>"
      When I enter a valid comment
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    @Positive
    Scenario Outline: Character limit counter
      Given I am on the create comment for a tenure page "<tenure>"
      When I enter <characters> characters into the comment field
      Then the number of characters remaining is correct <characters>

      Examples:
        | tenure                               | characters |
        # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 2          |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 50         |
        # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 99         |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 350        |
        # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 500        |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the create comment for a tenure page "<tenure>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | tenure                               | characters |
        # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 502        |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 508        |

    @SmokeTest
    @Negative  
    Scenario Outline: I go to create a comment for a tenure page
      Given I am on the create comment for a tenure page "<tenure>"
      Then I click the save comment button
      Then I click the save comment button
      Then a validation error occurs

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    @Accessibility
    Scenario Outline: Accessibility Testing for tenure
      Given I am on the create comment for a tenure page "<tenure>"
      And have no detectable a11y violations

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |