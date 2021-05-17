@PersonCommentPage
Feature: T&L Person Comment

    @Positive
    Scenario Outline: I go to create a comment for a person page
        Given I am on the create comment for a person page "<person>"
        Then the create comment for a person components are displayed

        Examples:
            | person                               |
            | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |
        
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

    @Negative  
    Scenario Outline: I go to create a comment for a person page
        Given I am on the create comment for a person page "<person>"
        Then I click the save comment button
        Then a validation error occurs

        Examples:
            | person                               |
            | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    