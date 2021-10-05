@TenureCommentPage
Feature: Tenure Comment
    I want to view a tenure's comments

    Background:
      Given I am logged in

    # @SmokeTest
    # @Positive
    # Scenario Outline: I go to create a comment for a tenure page
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   Then the create comment for a tenure components are displayed

    #   Examples:
    #     | tenure                               |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    # Need to update this!! 
    # @device    
    # Scenario Outline: I go to create a comment for a tenure page on a device
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   And I am using a mobile viewport "<device>"
    #   When I enter a valid comment
    #   Then I click the save comment button
    #   Then the comment is submitted

    #   Examples:
    #     | tenure                               | device        |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-2        |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | ipad-mini     |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-3      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-4      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-5      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-6+     |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-7      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-8      |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-xr     |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | iphone-se2    |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-11    |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-13    |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-15    |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | macbook-16    |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-note9 |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | samsung-s10   |

    @SmokeTest
    @Positive  
    #Notes: TL-60 added additional fields - AC 3 
    Scenario Outline: Save comment for tenure 
      Given I am on the create comment for a tenure page "<tenure>"
      When I enter a valid comment
      And I fill the mandatory fields
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |
    
    @SmokeTest
    @Negative
    @ignore
    #Update
    #Notes: TL-60 added additional fields - AC2
      Scenario Outline: User cannot submit a comment without mandatory fields
      Given I am on the create comment for a tenure page "<tenure>"
      When I do not fill the mandatory fields for "<commentTitle>", "<commentDescription>" and "<commentCategory"
      And I click the save comment button
      Then a warning message is displayed

      Examples:
        | tenure                               | commentTitle | commentDescription | commentCategory |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |              | test comment       |  Rents          |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | test title   |                    |  Rents          |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | test title   | test comment       |                 |

    @SmokeTest
    @Positive
    @ignore
    #Notes: TL-60 AC3.1 Cancel
    Scenario Outline: Cancel comment and pop up message
      Given I am on the create comment for a tenure page "<tenure>"
      And I enter a valid comment
      When I click the Discard comment Are you sure you wish to cancel adding this comment?
      Then I can see a button to Discard comment

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |
    
    @SmokeTest
    @Positive
    @ignore
    #Notes: TL-60 AC3.2 Confirm Discarding of comment
    Scenario Outline: Confirm discarding of comment
      Given I am on the create comment for a tenure page "<tenure>"
      And I enter a valid comment
      When I click the Discard comment Are you sure you wish to cancel adding this comment?
      Then I can see a button to Discard comment

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    @SmokeTest
    @Positive
    @ignore
    #Notes: TL-60 AC3.4 Cancel Discarding of comment
    Scenario Outline: Confirm discarding of comment
      Given I am on the create comment for a tenure page "<tenure>"
      And I enter a valid comment
      When I click the Discard comment Are you sure you wish to cancel adding this comment?
      Then I can see a button to Discard comment

      Examples:
        | tenure                               |
        | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    # @Positive
    # Scenario Outline: Character limit counter
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   When I enter <characters> characters into the comment field
    #   Then the number of characters remaining is correct <characters>

    #   Examples:
    #     | tenure                               | characters |
    #     # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 2          |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 50         |
    #     # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 99         |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 350        |
    #     # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 500        |

    # @Negative
    # Scenario Outline: Character limit exceeded
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   When I enter <characters> characters into the comment field
    #   Then the warning message tells me I am over by <characters>

    #   Examples:
    #     | tenure                               | characters |
    #     # | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 502        |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 | 508        |

    # @SmokeTest
    # @Negative  
    # Scenario Outline: I go to create a comment for a tenure page
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   Then I click the save comment button
    #   Then I click the save comment button
    #   Then a validation error occurs

    #   Examples:
    #     | tenure                               |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    # @Accessibility
    # Scenario Outline: Accessibility Testing for tenure
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   And have no detectable a11y violations

    #   Examples:
    #     | tenure                               |
    #     | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |