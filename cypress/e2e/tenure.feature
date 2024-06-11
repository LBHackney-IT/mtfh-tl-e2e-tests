@tenure
@authentication
@common
@root
@search
@worktray
@personal-details

Feature: Tenure page

    Background:
        Given I am logged in
    
    # TODO: Combine these tests
    @SmokeTest
    Scenario: View resident details for new tenure
        Given I seeded the database with a tenure
        When I view a tenure
        Then the tenure information is displayed
        And the residents information is displayed
        And a link to the property is displayed

    Scenario Outline: Navigate to old tenancy files
        Given I create a tenure that started on date "2013-12-31", with no responsible household members
        And the start date for the tenure record is before 31 December 2013
        When I view a tenure
        Then the Scanned historic tenure records button is displayed

    Scenario Outline: Navigate to old tenancy files - button not displayed
        Given I create a tenure that started on date "2014-12-31", with no responsible household members
        And the start date for the tenure record is after 31 December 2013
        When I view a tenure
        Then the Scanned historic tenure records button is not displayed

    Scenario: View household member
        Given I seeded the database with a tenure
        When I view a tenure
        When I view the Other household members section in the tenure page
        And I select a household member
        Then the household member details are displayed

    Scenario: No household members
        Given I create a tenure that started on date "2014-12-31", with no responsible household members
        When I view a tenure
        When I view the Other household members section in the tenure page
        And A message says this tenure has no household members

    Scenario: Navigate to personal details
        Given I seeded the database with a tenure
        When I view a tenure
        And I select a resident
        Then the resident details are displayed

    @device
    Scenario Outline: Mobile view - Devices with smaller screens
        Given I seeded the database with a tenure
        And I view a tenure
        When I am using a mobile viewport "<device>"
        And I click the tenure details accordion
        Then the tenure details accordion information is displayed
        When I click the resident details accordion
        Then the residents details accordion information is displayed

        Examples:
            | device      |
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
            | samsung-s10 |

    @device
    Scenario Outline: Mobile view - Devices with bigger screens
        Given I seeded the database with a tenure
        And I view a tenure
        When I am using a mobile viewport "<device>"
        Then the tenure details accordion information is displayed
        Then the residents details accordion information is displayed

        Examples:
            | device        |
            | ipad-2        |
            | ipad-mini     |
            | macbook-11    |
            | macbook-13    |
            | macbook-15    |
            | macbook-16    |
            | samsung-note9 |

    @Accessibility
    Scenario: Accessibility Testing
        Given I seeded the database with a tenure
        When I view a tenure
        And have no detectable a11y violations