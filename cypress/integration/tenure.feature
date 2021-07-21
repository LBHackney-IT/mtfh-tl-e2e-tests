@TenurePage
Feature: Tenure page

    Background:
      Given I am logged in

    @SmokeTest
    Scenario Outline: View resident details
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And the residents information is displayed
      
      Examples:
          | tenure                               |
          | 68c6896c-16f1-54d2-3504-847cb438a1b1 |

    @SmokeTest
    Scenario Outline: No household members
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And there are no household members

      Examples:
          | tenure                               |
          | 8f2bb5cf-1215-b9de-59fd-adcf33b0c601 |

    @SmokeTest
    Scenario Outline: View individual household members
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      When I select a household member
      Then the household member details are displayed

      Examples:
          | tenure                               |
          | bba2793e-df7d-aa4a-71df-57d067c21036 |

    @SmokeTest
    Scenario Outline: No named tenure holders
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And there are no named tenure holders

      Examples:
          | tenure                                |
          | 920d7a09-766d-413c-9ff9-36bd0d86ab1a  |

    @SmokeTest
    Scenario Outline: Navigate to personal details
      When I view a Tenure "<tenure>"
      And I select a resident
      Then the resident details are displayed

      Examples:
          | tenure                                |
          | 68c6896c-16f1-54d2-3504-847cb438a1b1  |

    @device
    Scenario Outline: Mobile view
      When I am using a mobile viewport "<device>"
      When I view a Tenure "<tenure>"
      And I click the tenure details accordion
      Then the tenure details accordion information is displayed
      When I click the resident details accordion
      Then the residents details accordion information is displayed

      Examples:
        | device        | tenure                               |
        # | ipad-2        | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | ipad-mini     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-3      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-4      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-5      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-6      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-6+     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-7      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-8      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-x      | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-xr     | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | iphone-se2    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | macbook-11    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | macbook-13    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | macbook-15    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | macbook-16    | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        # | samsung-note9 | 68c6896c-16f1-54d2-3504-847cb438a1b1 |
        | samsung-s10   | 68c6896c-16f1-54d2-3504-847cb438a1b1 |

    @Accessibility
    Scenario Outline: Accessibility Testing
      When I view a Tenure "<tenure>"
      And have no detectable a11y violations

      Examples:
          | tenure                                |
          | 68c6896c-16f1-54d2-3504-847cb438a1b1  |