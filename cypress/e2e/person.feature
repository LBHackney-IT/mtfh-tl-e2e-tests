@authentication
@common
@personal-details
@processes
@root

Feature: T&L Person Page
    I want to view a person

    Background:
        Given I am logged in

    @SmokeTest
    @Positive
    Scenario Outline: View person details web page view
        Given I seeded the database with an asset with a previous tenure
        Given I visit the 'Person details' page
        And the person has valid contact details
        Then the personal details are displayed on the sidebar
        When I click on the more personal details accordion
        Then the body Person details are displayed
        When I click on the more personal details accordion
        When I click on the more tenure details accordion
        Then the body tenure details are displayed
        When I click on the more tenure details accordion
        When I click on the equality details accordion
        Then the equality information is displayed

    @device
    Scenario Outline: View person details device view
        Given I seeded the database with an asset with a previous tenure
        Given I visit the 'Person details' page
        And the person has valid contact details
        When I am using a mobile viewport "<device>"
        Then the personal details are displayed on the mobile content container
        When I click on the more personal details accordion
        Then the body Person details are displayed
        When I click on the more personal details accordion
        When I click on the more tenure details accordion
        Then the body tenure details are displayed
        When I click on the more tenure details accordion
        When I click on the equality details accordion
        Then the equality information is displayed

        Examples:
            | device      |
            #| ipad-2        |
            #| ipad-mini     |
            | iphone-3    |
            | iphone-4    |
            | iphone-5    |
            | iphone-6    |
            | iphone-6+   |
            | iphone-7    |
            | iphone-8    |
            | iphone-x    |
            | iphone-xr   |
            | iphone-se2  |
            # | macbook-11    |
            #| macbook-13    |
            #  | macbook-15    |
            # | macbook-16    |
            # | samsung-note9 |
            | samsung-s10 |

      @SmokeTest
      Scenario Outline: Look for record that does not exist
        Given I have loaded an invalid person record "<record>"
        Then The person you've requested does not exist error message appears

        Examples:
          | record |
          | kdfbv  |
          | dfkkkl |

    @SmokeTest
    Scenario Outline: Add a comment for a person navigation
        Given I seeded the database with a person
        Given I visit the 'Person details' page
        Then the body Person details are displayed
        When I click on the add comment button
        Then I am taken to the add comment for person page

    @Accessibility
    Scenario Outline: Scenario Outline name: Accessibility Testing
        Given I seeded the database with a person
        Given I visit the 'Person details' page
        And have no detectable a11y violations