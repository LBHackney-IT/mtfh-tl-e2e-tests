Feature: Property Comment
    I want to create and view property's comments

    Background:
      Given I am logged in

    Scenario Outline: I go to create a comment for a property page
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      Then the create comment component is displayed

      Examples:
        | commentType  | propertyId                             |
        | property     | f0196e15-de78-d42f-5e17-67b117194cd1   |

    Scenario Outline: Add comment - Relationship between selected record and records in other entities
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      When I select a checkbox for "<checkbox>"
      And I create a comment
      Then I can see the same comments in the linked entities

      # Note: The id under the checkbox is the id for linked enttity e.g. tenure 
      Examples:
        | commentType | propertyId                           | checkbox                              |
        | property    | f0196e15-de78-d42f-5e17-67b117194cd1 | e5d1be03-d596-4d81-cd91-a88373fd199d  |
    
    Scenario Outline: I go to create a comment for a property page on a device
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      And I am using a mobile viewport "<device>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      Then the comment is submitted

      Examples:
        | commentType   | propertyId                             | device        | category             |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a | ipad-mini     | Estate management    |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | iphone-se2    | Tenure breaches      |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-11    | Tenure management    |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-13    | Voids                |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-15    | Appointments         |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | macbook-16    | Appointments         |
        | property        | a2d7901a-9895-e86a-f9d3-542222400a3a | samsung-s10   | Appointments         |
           
    Scenario Outline: I go to create a comment for a property page
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      When I enter a valid title
      And I enter a valid comment
      And I select a comment category "<category>"
      Then I click the save comment button
      And I can see the timestamp for the created comment

      Examples:
        | commentType | propertyId                               |  category      |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   |  Appointments  |

    Scenario Outline: Character limit counter
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      When I enter <characters> characters into the comment field
      Then the number of characters remaining is correct <characters>

      Examples:
        | commentType | propertyId                               | characters |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   | 50         |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   | 350        |

    Scenario Outline: Character limit exceeded
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      When I enter <characters> characters into the comment field
      Then the warning message tells me I am over by <characters>

      Examples:
        | commentType | propertyId                               | characters |
        | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   | 508        |

    Scenario Outline: Validation message is displayed
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      Then I click the save comment button
      And a validation error occurs

      Examples:
      | commentType | propertyId                             |
      | property      | a2d7901a-9895-e86a-f9d3-542222400a3a |

    @Accessibility
    Scenario Outline: Accessibility Testing
      Given I am on the create comment page for "<commentType>" "<propertyId>"
      And have no detectable a11y violations

      Examples:
      | commentType | propertyId                               |
      | property      | a2d7901a-9895-e86a-f9d3-542222400a3a   |
