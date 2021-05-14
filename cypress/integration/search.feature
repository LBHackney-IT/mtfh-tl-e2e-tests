@SearchPage
Feature: T&L Search Function
    I want to search for a person

  @Positive
  Scenario Outline: Execute search
    Given I want to log in to the search page
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | Ab         |
      | Andrew     |
      | Jeff       |
      | Keith      |
      | Trev       |
      | Victor     |
    
  @Positive
  Scenario Outline: Wildcard and partial searches 
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | *a         |
      | a*         |
      | *a*        |
      | ch         |
      | *ev        |
      | *ic*       |
      | te*        |

  @Positive
    Scenario Outline: Results are not returned
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then no results are returned

    Examples:
      | characters |
      | 123        |
      | AZKQ       |
      | dp0        |
      | elqsn      |
      | !!!!!!!    |
      
  @Positive
  Scenario Outline: Multiple search criteria
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters     |
      | ad e           |
      | ch a           |
      | s te           |
      | A* Rickman     |
      | *e* *a         |
      | a Ellie        |

  @Negative
  Scenario Outline: Insufficient characters
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then no results are returned
    And a validation error message is displayed  

    Examples:
      | characters |
      | b          |
      | c          |
      | d          |
      | e          |
      | !          |

