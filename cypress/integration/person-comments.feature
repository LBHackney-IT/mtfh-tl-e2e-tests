@PersonCommentPage
Feature: T&L Person Comment
    I want to view a person's comments

    Background:
      Given I am logged in

    # @SmokeTest
    # @Positive
    # Scenario Outline: I go to create a comment for a person page
    #   Given I am on the create comment for a person page "<person>"
    #   Then the create comment for a person components are displayed

    #   Examples:
    #     | person                               |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    
    @SmokeTest
    @Positive
    # TL-100 AC1.1 
#Given the ‘Add comment to person’ page is displayed
# And the selected Person record is related to any records in the following entities:
# This person only 
# Property
# Tenure
# Then the related records from those entities are displayed as checkbox options with the exception of person (will display only selected person for now)
# And the selected Person record checkbox is pre-selected
# And I can chose to apply my comment to one or more of the related records displayed 
    Scenario Outline: Add comment - Relationship between selected record and records in other entities
      Given I am on the create comment for a person page "<person>"
      When I select a checkbox "<checkbox>"
      # And I create a comment
      # Then the create comment for a person components are displayed
      # Then I can also see the same comment in the selected entity screen "<entityScreen>"

      Examples:
        | person                               | checkbox | entityScreen|
        | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |          |             |
        
        
    # @device    
    # Scenario Outline: I go to create a comment for a person page on a device
    #   Given I am on the create comment for a person page "<person>"
    #   And I am using a mobile viewport "<device>"
    #   When I enter a valid title
    #   And I enter a valid comment
    #   And I select a comment category "<category>"
    #   Then I click the save comment button
    #   Then the comment is submitted

    #   Examples:
    #     | person                               | device        | category             |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-2        | Appointments         |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | ipad-mini     | Estate management    |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-3      | Evictions            |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-4      | Parking              |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-5      | Planned maintenance  |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6      | Rehousing            |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-6+     | Rents                |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-7      | Repairs              |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-8      | Service charge       |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-xr     | Temporary decant     |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | iphone-se2    | Tenure breaches      |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-11    | Tenure management    |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-13    | Voids                |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-15    | Appointments         |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | macbook-16    | Appointments         |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-note9 | Appointments         |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | samsung-s10   | Appointments         |
   
    # @SmokeTest
    # @Positive    
    # Scenario Outline: I go to create a comment for a person page
    #   Given I am on the create comment for a person page "<person>"
    #   When I enter a valid title
    #   When I enter a valid comment
    #   And I select a comment category "<category>"
    #   Then I click the save comment button
    #   Then the comment is submitted

    #   Examples:
    #     | person                               |  category      |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |  Appointments  |

    # @Positive
    # Scenario Outline: Character limit counter
    #   Given I am on the create comment for a person page "<person>"
    #   When I enter <characters> characters into the comment field
    #   Then the number of characters remaining is correct <characters>

    #   Examples:
    #     | person                               | characters |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 2          |
    #     # | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 50         |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 99         |
    #     # | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 350        |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 500        |

    # @Negative
    # Scenario Outline: Character limit exceeded
    #   Given I am on the create comment for a person page "<person>"
    #   When I enter <characters> characters into the comment field
    #   Then the warning message tells me I am over by <characters>

    #   Examples:
    #     | person                               | characters |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 502        |
    #     # | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 | 508        |

    # @SmokeTest
    # @Negative  
    # Scenario Outline: I go to create a comment for a person page
    #   Given I am on the create comment for a person page "<person>"
    #   Then I click the save comment button
    #   Then I click the save comment button
    #   Then a validation error occurs

    #   Examples:
    #     | person                               |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |

    # @Accessibility
    # Scenario Outline: Accessibility Testing
    #   Given I am on the create comment for a person page "<person>"
    #   And have no detectable a11y violations

    #   Examples:
    #     | person                               |
    #     | aac57a95-11e4-9eeb-954a-c2dd5a0a7f31 |