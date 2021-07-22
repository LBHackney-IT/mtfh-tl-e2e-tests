@PersonCommentPage
Feature: T&L Person Comment
    I want to view a person's comments

    Background:
      Given I am logged in

    @SmokeTest
    @Positive
    Scenario Outline: I go to create a comment for a person page
      Given I am on the create comment for a person page "<person>"
      Then the create comment for a person components are displayed

      Examples:
        | person                               |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
        
    @device    
    Scenario Outline: I go to create a comment for a person page on a device
      Given I am on the create comment for a person page "<person>"
      And I am using a mobile viewport "<device>"
      When I enter a valid comment
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | person                               | device        |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-2        |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-mini     |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-3      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-4      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-5      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6+     |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-7      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-8      |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-xr     |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-se2    |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-11    |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-13    |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-15    |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-16    |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-note9 |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-s10   |

    @SmokeTest
    @Positive    
    Scenario Outline: I go to create a comment for a person page
      Given I am on the create comment for a person page "<person>"
      When I enter a valid comment
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | person                               |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    @Positive
    Scenario Outline: Character limit counter
      Given I am on the create comment for a person page "<person>"
      When I enter <characters> characters into the comment field
      Then the number of characters remaining is correct <characters>

      Examples:
        | person                               | characters |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 2          |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 50         |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 99         |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 350        |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 500        |

    @Negative
    Scenario Outline: Character limit exceeded
      Given I am on the create comment for a person page "<person>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | person                               | characters |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 502        |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 508        |

    @SmokeTest
    @Negative  
    Scenario Outline: I go to create a comment for a person page
      Given I am on the create comment for a person page "<person>"
      Then I click the save comment button
      Then I click the save comment button
      Then a validation error occurs

      Examples:
        | person                               |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    @Accessibility
    Scenario Outline: Accessibility Testing
      Given I am on the create comment for a person page "<person>"
      And have no detectable a11y violations

      Examples:
        | person                               |
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |