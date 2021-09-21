@ignore
@api
Feature: I want to check the MMH APIs
    I want to test some APIs


  @ignore
  Scenario Outline: Reference data
    Given I want to check the reference data API with a category of "<category>" "<subCategory>"

    Examples:
        | category | subCategory |
        | person   | title       |

  @ignore
  Scenario: Person APIs
    Given I want to create a person
    Then I want to view a person
    # And I want to edit a person
    # And I want to add contact details
    # And I want to add a comment
    # And I want to get a tenure