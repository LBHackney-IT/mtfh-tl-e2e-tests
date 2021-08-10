@PropertyPage
Feature: Property Page

    View property page

    Background:
      Given I am logged in

    @SmokeTest
    Scenario Outline: View property details
      When I view a property "<property>"
      Then the page breadcrumb is displayed 
      Then the property information is displayed
      And the tenure information is displayed
      And I click on the view tenure button
      
      Examples:
          | property                             |
          | 99f16a78-4a57-f179-28c6-dacf35a0b805 |

    @SmokeTest
    Scenario Outline: View property details
      When I view a property "<property>"
      Then the page breadcrumb is displayed 
      Then the property information is displayed
      And the tenure information is displayed
      And I click on the breadcrumb
      Then I am taken to the search page
      
      Examples:
          | property                             |
          | 99f16a78-4a57-f179-28c6-dacf35a0b805 |
