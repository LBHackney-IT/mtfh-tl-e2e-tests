@search
@authentication
@common
@root

Feature: T&L Search Function
    I want to search for a person or tenure

    Background: I am on the search page
        Given The feature "MMH.SearchTenure" is false
        Given I am logged out
        Given I am logged in
        Given I am on the MMH home page

    # Please note: these tests rely on database data (be as vague as possible with 'search characters')

    @Positive
    Scenario Outline: Initial property search
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"

        Examples:
            | characters | searchType |
            | An         | Property   |

    @SmokeTest
    @Positive
    Scenario Outline: Execute property searches
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"
        And property search results are prefixed correctly
        Then the page breadcrumb is displayed

        Examples:
            | characters | searchType |
            | 12         | Property   |
            | Avenue     | Property   |
            | castle     | Property   |

    @SmokeTest
    @Positive
    Scenario Outline: Execute person searches
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"
        Then the page breadcrumb is displayed

        Examples:
            | characters | searchType |
            | am         | Person     |
            | hn         | Person     |
            | ef         | Person     |

    @SmokeTest
    @Positive
    Scenario Outline: Execute tenure searches
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"
        And tenure search results are prefixed correctly
        Then the page breadcrumb is displayed

        Examples:
            | characters | searchType |
            | 12         | Tenure     |
            | Avenue     | Tenure     |
            | castle     | Tenure     |

    @device
    Scenario Outline: Execute searches on device
        When I am using a mobile viewport "<device>"
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"
        Then the page breadcrumb is displayed

        Examples:
            | device        | characters  | searchType |
            | ipad-2        | Andrew      | Person     |
            | ipad-mini     | Alan        | Person     |
            | iphone-3      | Christopher | Person     |
            | iphone-4      | Jeff        | Person     |
            | iphone-5      | Bill        | Person     |
            | iphone-6      | Jade        | Person     |
            | iphone-6+     | Callum      | Person     |
            | iphone-7      | Steve       | Person     |
            | iphone-8      | Trev        | Person     |
            | iphone-x      | Keith       | Person     |
            | iphone-xr     | Anna        | Person     |
            | iphone-se2    | Gill        | Person     |
            | macbook-11    | Emily       | Person     |
            | macbook-13    | Katie       | Person     |
            | macbook-15    | Karen       | Person     |
            | macbook-16    | Sally       | Person     |
            | samsung-note9 | Jodie       | Person     |
            | samsung-s10   | Molly       | Person     |

    @Positive
    Scenario Outline: Wildcard and partial searches
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the search results are displayed by best match "<characters>"

        Examples:
            | characters | searchType |
            | *a         | Person     |
            | b*         | Tenure     |
    # | *c*        | Property   | Wildcard does not seem to work for Property

    @Positive
    Scenario Outline: Results are not returned
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then no results are returned

        Examples:
            | characters  | searchType |
            | 98765432    | Person     |
            | zy!         | Tenure     |
            | asddsadqduj | Property   |

    @Positive
    @ignore
    Scenario Outline: Multiple search criteria
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then search results are displayed by the best match "<characters>"

        Examples:
            | characters | searchType |
            | ad e       | Person     |

    @Negative
    Scenario Outline: Insufficient characters
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then a validation error message is displayed

        Examples:
            | characters | searchType |
            | b          | Person     |
            | c          | Tenure     |
            | g          | Property   |


    @Accessibility
    Scenario: Accessibility Testing
        And have no detectable a11y violations

    @SmokeTest
    Scenario Outline: Filter searches for person
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then the default sort option is correct
        When I select to sort by "<filter>"
        When I set the number of results to <results>
        Then the correct number of <results> are displayed

        Examples:
            | characters | filter        | results | searchType |
            | Ab         | Last name A-Z | 40      | Person     |
            | Bre        | Last name Z-A | 12      | Person     |
            | Chris      | Best match    | 20      | Person     |

    @SmokeTest
    Scenario Outline: Filter searches for tenure
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then there is no filter option
        When I set the number of results to <results>
        Then the correct number of <results> are displayed

        Examples:
            | characters | results | searchType |
            | Ab         | 40      | Tenure     |
            | Bre        | 12      | Tenure     |
            | Chris      | 20      | Tenure     |

    @SmokeTest
    Scenario Outline: Filter searches for property
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<characters>"
        And I click on the search button
        Then there is no filter option
        When I set the number of results to <results>
        Then the correct number of <results> are displayed

        Examples:
            | characters | results | searchType |
            | Ab         | 40      | Property   |
            | Bre        | 12      | Property   |
            | Chris      | 20      | Property   |

    Scenario Outline: Re-execute search
        When I click on the radio button for "<searchType>"
        When I enter any of the following criteria "<firstSearch>"
        And I click on the search button
        Then the search results are displayed by best match "<firstSearch>"
        Then the search again button is displayed
        When I click on the search again button
        When I enter any of the following criteria "<secondSearch>"
        And I click on the search button
        Then the search results are displayed by best match "<secondSearch>"

        Examples:
            | firstSearch | secondSearch | searchType |
            | Steve       | Dave         | Person     |

    @ignore
    @Negative
    Scenario Outline: Search validation scenario
        When I click on the radio button for "<searchType>"
        And I enter any of the following criteria "<characters>"
        And I click on the search button
        Then a warning message is displayed for search field

        Examples:
            | characters | searchType |
            | A          | Property   |
            | B          | Person     |
            | C          | Tenure     |