@SearchPage
Feature: T&L Search Function
    I want to search for a person

    Background: I am on the search page
      Given I am logged in
      Given I am on the search page

  Scenario: Execute initial search
    When I enter any of the following criteria "Colin"
    And I click on the search button
    Then the search results are displayed by best match "Colin"

  @Positive
  Scenario Outline: Execute searches
    When I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | Ab         |
      | Andrew     |
      | Jeff       |
      # | Keith      |
      # | Trev       |
      # | Victor     |
    
  @Positive
  Scenario Outline: Wildcard and partial searches
    When I click on the search again button 
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | *a         |
      | b*         |
      | *c*        |
      # | ch         |
      # | *ev        |
      # | *ic*       |
      # | te*        |

  @Positive
  Scenario Outline: Results are not returned
    When I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then no results are returned

    Examples:
      | characters |
      | 123        |
      | AZKQ       |
      # | dp0        |
      # | elqsn      |
      # | !!!!!!!    |
      
  @Positive
  @ignore
  Scenario Outline: Multiple search criteria
    When I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters     |
      | ad e           |

  @Negative
  @ignore
  Scenario Outline: Insufficient characters
    When I click on the search again button
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

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  Scenario Outline: Filter searches
    When I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    When I set the number of results to <results>
    Then the correct number of <results> are displayed

    Examples:
      | characters | results |
      | Ab         | 40      |
      | Bre        | 12      |
      | Chris      | 20      |