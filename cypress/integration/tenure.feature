@authentication
@common
@root
@tenure

Feature: Tenure page

    Background:
      Given I am logged in

    # Scenario: View resident details for new tenure
    #   Given I create a new tenure
    #   And I add a person to a tenure
    #   When I view a Tenure
    #   Then the tenure information is displayed
    #   And the residents information is displayed

    # Scenario Outline: Navigate to old tenancy files
    #   Given the start date of the tenure is "<startOfTenureDate>"
    #   And the start date for the tenure record is before 31 December 2013
    #   When I view this tenure
    #   Then the Scanned historic tenure records button is displayed
      
    #   Examples:
    #   | startOfTenureDate  |
    #   | 2013-12-31         |

    # @SmokeTest
    # Scenario Outline: Navigate to old tenancy files - button not displayed
    #   Given the start date of the tenure is "<startOfTenureDate>"
    #   And the start date for the tenure record is before 31 December 2013
    #   When I view this tenure
    #   Then the Scanned historic tenure records button is not displayed
  
    #   Examples:
    #   | startOfTenureDate  |
    #   | 2014-01-01         |    

    # Scenario: No household members
    #   Given I create a new tenure
    #   When I view a Tenure
    #   And there are no household members

    # Scenario: View household member
    #   Given I create a new tenure
    #   When I view a Tenure
    #   And I select a household member
    #   Then the household member details are displayed

    @SmokeTest
    Scenario: Navigate to personal details
      Given I create a new tenure
      And I add a person to a tenure
      When I view a Tenure
      And I select a resident
      Then the resident details are displayed

    # @device
    # Scenario Outline: Mobile view
    #   When I am using a mobile viewport "<device>"
    #   When I view a Tenure "<tenure>"
    #   And I click the tenure details accordion
    #   Then the tenure details accordion information is displayed
    #   When I click the resident details accordion
    #   Then the residents details accordion information is displayed

    #   Examples:
    #     | device        | tenure                               |
    #     # | ipad-2        | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | ipad-mini     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-3      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-4      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-5      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-6      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-6+     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-7      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-8      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-x      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-xr     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | iphone-se2    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | macbook-11    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | macbook-13    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | macbook-15    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | macbook-16    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     # | samsung-note9 | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
    #     | samsung-s10   | 68c6896c-16f1-54d2-3504-847cb438a1b1 |

    # @Accessibility
    # Scenario Outline: Accessibility Testing
    #   When I view a Tenure "<tenure>"
    #   And have no detectable a11y violations

    #   Examples:
    #       | tenure                                |
    #       | 68c6896c-16f1-54d2-3504-847cb438a1b1  |