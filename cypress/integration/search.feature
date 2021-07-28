@ignore
@SearchPage
Feature: T&L Search Function
    I want to search for a person

    Background: I am on the search page
      Given I am logged out
      Given I am logged in
      Given I am on the search page
  
  @SmokeTest
  @Positive
  Scenario Outline: Initial search
  When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the search results are displayed by best match "<characters>"

    Examples:
      | characters |
      | An         |

  # @SmokeTest 
  # @Positive
  # Scenario Outline: Execute searches
  #   And I click on the search again button
  #   When I enter any of the following criteria "<characters>"
  #   And I click on the search button
  #   Then the search results are displayed by best match "<characters>"

  #   Examples:
  #     | characters |
  #     | am         |
  #     | Andrew     |
  #     | Jeff       |
  #     # | Keith      |
  #     # | Trev       |
  #     # | Victor     |


  # @device
  # Scenario Outline: Execute searches on device
  #   When I am using a mobile viewport "<device>"
  #   And I click on the search again button
  #   When I enter any of the following criteria "<characters>"
  #   And I click on the search button
  #   Then the search results are displayed by best match "<characters>"

  #   Examples:
  #     | device        | characters  |
  #     | ipad-2        | Andrew      |
  #     | ipad-mini     | Alan        |
  #     | iphone-3      | Christopher |
  #     | iphone-4      | Jeff        |
  #     | iphone-5      | Bill        |
  #     | iphone-6      | Jade        |
  #     | iphone-6+     | Callum      |
  #     | iphone-7      | Steve       |
  #     | iphone-8      | Trev        |
  #     | iphone-x      | Keith       |
  #     | iphone-xr     | Anna        |
  #     | iphone-se2    | Gill        |
  #     | macbook-11    | Emily       |
  #     | macbook-13    | Katie       |
  #     | macbook-15    | Karen       |
  #     | macbook-16    | Sally       |
  #     | samsung-note9 | Jodie       |
  #     | samsung-s10   | Molly       |

  # @SmokeTest    
  # @Positive
  # Scenario Outline: Wildcard and partial searches
  #   And I click on the search again button
  #   When I enter any of the following criteria "<characters>"
  #   And I click on the search button
  #   Then the search results are displayed by best match "<characters>"

  #   Examples:
  #     | characters |
  #     | *a         |
  #     | b*         |
  #     | *c*        |
  #     # | ch         |
  #     # | *ev        |
  #     # | *ic*       |
  #     # | te*        |

  @SmokeTest
  @Positive
  Scenario Outline: Results are not returned
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then no results are returned

    Examples:
      | characters |
      | 12345678   |
      | AZKQ       |
      # | dp0        |
      # | elqsn      |
      # | !!!!!!!    |

  @SmokeTest     
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

  @SmokeTest
  @Negative
  Scenario Outline: Insufficient characters
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then a validation error message is displayed  

    Examples:
      | characters |
      | b          |
      # | c          |
      # | d          |
      # | e          |
      # | !          |

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations

  @SmokeTest
  Scenario Outline: Filter searches
    And I click on the search again button
    When I enter any of the following criteria "<characters>"
    And I click on the search button
    Then the default sort option is correct
    When I select to sort by "<filter>"
    When I set the number of results to <results>
    Then the correct number of <results> are displayed

    Examples:
      | characters | filter        | results |
      | Ab         | Last name A-Z | 40      |
      | Bre        | Last name Z-A | 12      |
      | Chris      | Best match    | 20      |

  @SmokeTest
  Scenario Outline: Re-execute search
    And I click on the search again button
    When I enter any of the following criteria "<firstSearch>"
    And I click on the search button
    Then the search results are displayed by best match "<firstSearch>"
    Then the search again button is displayed
    When I click on the search again button
    When I enter any of the following criteria "<secondSearch>"
    And I click on the search button
    Then the search results are displayed by best match "<secondSearch>"

    Examples:
      | firstSearch | secondSearch |
      | Steve       | Dave         |