@TenurePage
Feature: Tenure page

    Background:
      Given I am logged in

    Scenario Outline: View resident details
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And the residents information is displayed
      
      Examples:
          | tenure                                |
          | 68c6896c-16f1-54d2-3504-847cb438a1b1  |

    Scenario Outline: No household members
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And there are no household members

      Examples:
          | tenure                               |
          | 8f2bb5cf-1215-b9de-59fd-adcf33b0c601 |

    Scenario Outline: View individual household members
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      When I select a household member
      Then the household member details are displayed

      Examples:
          | tenure                               |
          | 424fcfb2-e629-7584-e217-bb57ff8e4f07 |

    Scenario Outline: No named tenure holders
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And there are no named tenure holders

      Examples:
          | tenure                                |
          | 920d7a09-766d-413c-9ff9-36bd0d86ab1a  |

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
          | device   | tenure                                |
          | iphone-3 | 68c6896c-16f1-54d2-3504-847cb438a1b1  |

    @Accessibility
    Scenario: Accessibility Testing
      And have no detectable a11y violations