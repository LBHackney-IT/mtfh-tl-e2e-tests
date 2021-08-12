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
          | 37c4e5a2-8893-dd5f-1ff3-9d4b18a9e5e9 |

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
          | 37c4e5a2-8893-dd5f-1ff3-9d4b18a9e5e9 |

    @Regression
    Scenario Outline: View property via tenure
      When I view a Tenure "<tenure>"
      Then the tenure information is displayed
      And I click on the view property button
      Then the property information is displayed
      
      Examples:
          | tenure                               |
          | 6a9260dc-b0ef-7a34-17f4-35bc3577d000 |

    @Regression
    Scenario Outline: View property via person
      Given I have loaded a Person record "<record>"
      Then the personal details are displayed on the sidebar
      And I click on the view property button
      Then the property information is displayed

      Examples:
          | record                               |
          | 32dfda17-72e5-d3a7-1fb2-4ecdc607df49 |