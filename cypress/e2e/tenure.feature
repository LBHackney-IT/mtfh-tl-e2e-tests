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