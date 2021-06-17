@SearchPage
Feature: T&L Search Function
    I want to search for a person

    Background: I am on the search page
      Given I am logged out
      Given I am logged in
      Given I am on the search page
  
  @Positive
  Scenario Outline: Initial search
  When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | Ab         |

    
  @Positive
  Scenario Outline: Execute searches
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | Al         |
      | Andrew     |
      | Jeff       |
      # | Keith      |
      # | Trev       |
      # | Victor     |
    
  @Positive
  Scenario Outline: Wildcard and partial searches
    And I click on the search again button
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
    And I click on the search again button
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
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters     |
      | ad e           |

  @Negative
  @ignore
  Scenario Outline: Insufficient characters
    And I click on the search again button
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
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    When I set the number of results to <results>
    Then the correct number of <results> are displayed

    Examples:
      | characters | results |
      | Ab         | 40      |
      | Bre        | 12      |
      | Chris      | 20      |

  Scenario Outline: Re-execute search
    And I click on the search again button
    When I enter any of the following criteria "<firstSearch>"
    And I click on the search button
    Then the search results are displayed by best match "<firstSearch>"
    Then the search again button is displayed
    And the search panel is not visible
    When I click on the search again button
    And the search panel is visible
    And the close search button is visible
    When I click on the close search button
    Then the search again button is displayed
    Then the search panel is not visible
    When I click on the search again button
    When I enter any of the following criteria "<secondSearch>"
    And I click on the search button
    Then the search results are displayed by best match "<secondSearch>"

    Examples:
      | firstSearch | secondSearch |
      | Steve       | Dave         |