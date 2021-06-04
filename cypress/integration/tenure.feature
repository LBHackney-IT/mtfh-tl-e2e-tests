@TenurePage
Feature: Tenure page

    Background:
      Given I am logged in

    Scenario Outline: View tenure details
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      
      Examples:
          | tenure                                |
          | 68c6896c-16f1-54d2-3504-847cb438a1b1  |