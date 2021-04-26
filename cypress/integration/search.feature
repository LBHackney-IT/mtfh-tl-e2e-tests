@SearchPage
Feature: T&L Search Function
    I want to search for a person

  Background:
    Given I am on the search page

  @Positive
  Scenario: Execute search
    When I enter any of the following criteria with a minimum of 2 characters
    | searchTerm |
    | Ab         |
    | Andrew     |
    | Jeff       |
    | Keith      |
    | Trev       |
    | Victor     |
    Then the search results are displayed by best match

  @Positive
  Scenario: Wildcard and partial searches 
    When I enter any of the following criteria with a minimum of 2 characters
    | searchTerm |
    | *a         |
    | a*         |
    | *a*        |
    | ch         |
    | *ev        |
    | *ic*       |
    | te*        |
    Then the search results are displayed by best match

  # need a separate binding for this, or we can use the same binding but with a mechanism to substring both searches
  # @Positive
  # Scenario: Multiple search criteria
  #   When I enter any of the following criteria with a minimum of 2 characters
  #   | searchTerm     |
  #   | ad e           |
  #   | ch a           |
  #   | s te           |
  #   | A* Rickman     |
  #   | *e* *a         |
  #   | a Ellie        |
  #   Then the search results are displayed by best match

  @Negative
  Scenario: Insufficient characters
    When I do not enter a minimum of 2 characters into the search
    | searchTerm |
    | a          |
    | b          |
    | c          |
    Then no results are returned
    And a validation error message is displayed  

  @Positive
  Scenario: Results are displayed
    When there are no results found
  

  @Positive
  Scenario: Results are not returned
    When there are no results found