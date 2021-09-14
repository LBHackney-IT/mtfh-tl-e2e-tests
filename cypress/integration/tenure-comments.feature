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
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |
        
    # @device    
    # Scenario Outline: I go to create a comment for a tenure page on a device
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   And I am using a mobile viewport "<device>"
    #   When I enter a valid comment
    #   Then I click the save comment button
    #   Then the comment is submitted

    #   Examples:
    #     | tenure                               | device        |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | ipad-2        |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | ipad-mini     |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-3      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-4      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-5      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-6      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-6+     |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-7      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-8      |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-xr     |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | iphone-se2    |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | macbook-11    |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | macbook-13    |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | macbook-15    |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | macbook-16    |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | samsung-note9 |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | samsung-s10   |

    # @SmokeTest
    # @Positive    
    # Scenario Outline: I go to create a comment for a tenure page
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   When I enter a valid comment
    #   Then I click the save comment button
    #   Then the comment is submitted

    #   Examples:
    #     | tenure                               |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

    # @Positive
    # Scenario Outline: Character limit counter
    #   Given I am on the create comment for a tenure page "<tenure>"
    #   When I enter <characters> characters into the comment field
    #   Then the number of characters remaining is correct <characters>

    #   Examples:
    #     | tenure                               | characters |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 2          |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 50         |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 99         |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 350        |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 500        |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the create comment for a tenure page "<tenure>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | tenure                               | characters |
        | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 502        |
        | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 | 508        |

    # @SmokeTest
    # @Negative  
    # Scenario Outline: I go to create a comment for a person page
    #   Given I am on the create comment for a person page "<person>"
    #   Then I click the save comment button
    #   Then I click the save comment button
    #   Then a validation error occurs

    #   Examples:
    #     | person                               |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

    # @Accessibility
    # Scenario Outline: Accessibility Testing
    #   Given I am on the create comment for a person page "<person>"
    #   And have no detectable a11y violations

    #   Examples:
    #     | person                               |
    #     | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |