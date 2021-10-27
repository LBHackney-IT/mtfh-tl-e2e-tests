@authentication
@common
@processes
@property
@root

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
          | 5d576bff-59e4-9baf-3f80-0b9cc53d8a97 |

    @Regression
    Scenario Outline: View property via person
      Given I have loaded a Person record "<record>"
      Then the personal details are displayed on the sidebar
      And I click on the view property button
      Then the property information is displayed

      Examples:
          | record                               |
          | 80886abb-eecb-644f-5806-6c01ccc2126b |

    Scenario Outline: Asset API for valid FE type
      Given I check the asset API with a valid assetType "<assetId>"
      When I navigate to the asset page "<assetId>"
      Then the property information is displayed

      Examples:
      | assetId                              |
      | 49202bdc-5d97-a46c-289c-997df568500f |

    Scenario Outline: Asset API for invalid FE type
      Given I check the asset API with an invalid assetType "<assetId>"
      When I navigate to the asset page "<assetId>"
      And I am shown an error message 

      Examples:
      | assetId                              |
      | 5372e973-2857-98df-a343-4acfb76af535 |