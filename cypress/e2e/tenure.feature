@authentication
@common
@processes
@root
@tenure

Feature: Tenure page

    Background:
        Given I am logged in

    Scenario: View resident details for new tenure
        Given I seeded the database with a tenure with GUID "b36df6a7-2695-4d0a-85c0-1560d78ead1b"
        When I view a tenure
        Then the tenure information is displayed
        And the residents information is displayed

    Scenario Outline: Navigate to old tenancy files
        Given I create a tenure that started on date "2013-12-31", with no responsible household members
        And the start date for the tenure record is before 31 December 2013
        When I view a tenure
        Then the Scanned historic tenure records button is displayed

    @SmokeTest
    Scenario Outline: Navigate to old tenancy files - button not displayed
        Given I create a tenure that started on date "2014-12-31", with no responsible household members
        And the start date for the tenure record is after 31 December 2013
        When I view a tenure
        Then the Scanned historic tenure records button is not displayed

    Scenario: View household member
        Given I seeded the database with a tenure with GUID "657a2153-7a11-4e24-b137-119b8754d4c4"
        When I view a tenure
        When I view the Other household members section in the tenure page
        And I select a household member
        Then the household member details are displayed

    Scenario: No household members
        Given I create a tenure that started on date "2014-12-31", with no responsible household members
        When I view a tenure
        When I view the Other household members section in the tenure page
        And A message says this tenure has no household members

    @SmokeTest
    Scenario: Navigate to personal details
        Given I seeded the database with a tenure with GUID "239f0711-b74d-4e92-ac70-89e3d53da131"
        When I view a tenure
        And I select a resident
        Then the resident details are displayed

    # These tests seem to pass consistently in Circle CI, however when running locally, the Tenure Accordion cannot be found at times,
    # and the tests have flaky results. We're currently (06/07/23) working on getting consistent passes on all MMH tests,
    # and as I can't guaranteee these tests will never cause any flakiness on the Circle CI pipeline, I'm currently commenting these out (Angelo).
    # @device
    # Scenario Outline: Mobile view
    #     Given I seeded the database with a tenure with GUID "eebd3edd-45b2-48a2-8b4a-58bbd306a6a8"
    #     And I view a tenure
    #     When I am using a mobile viewport "<device>"
    #     And I click the tenure details accordion
    #     Then the tenure details accordion information is displayed
    #     When I click the resident details accordion
    #     Then the residents details accordion information is displayed

    #     Examples:
    #         | device      |
    #         # | ipad-2        |
    #         # | ipad-mini   |
    #         | iphone-3    |
    #         | iphone-4    |
    #         | iphone-5    |
    #         | iphone-6    |
    #         | iphone-6+   |
    #         | iphone-7    |
    #         | iphone-8    |
    #         | iphone-x    |
    #         | iphone-xr   |
    #         | iphone-se2  |
    #         # | macbook-11    |
    #         # | macbook-13    |
    #         # | macbook-15    |
    #         # | macbook-16    |
    #         # | samsung-note9 |
    #         | samsung-s10 |

    @Accessibility
    Scenario: Accessibility Testing
        Given I seeded the database with a tenure with GUID "e94fb12e-c740-4a78-b099-10b1267da0c6"
        When I view a tenure
        And have no detectable a11y violations