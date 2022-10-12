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
      Given I am on the MMH home page
      When I enter "<propertyName>" as search criteria
      And I select "<commentType>" and click on search button
      Then I am on the Property search results page for "<propertyName>"
      When I select property
      Then I am on the Property details page
      And the page breadcrumb is displayed
      And the property information is displayed
      And the tenure information is displayed
      When I click on the view tenure button
      Then tenure page is displayed
      And I click on the breadcrumb
      Then I am taken to the search page
      Examples:
        |propertyName|commentType|
        |   lon      |property   |


    @Regression
    Scenario Outline: View property via tenure
      Given I am on the MMH home page
      When I enter "<tenureName>" as search criteria
      And I select "<commentType>" and click on search button
      Then I am on the Tenure search results page for "<tenureName>"
      When I select tenure
      Then tenure page is displayed
      And the tenure information is displayed
      And I click on the view property button
      Then the property information is displayed
      Examples:
        | tenureName | commentType |
        | lon        | Tenure      |

    @Regression
    Scenario Outline: View property via person
      Given I am on the MMH home page
      When I enter "<personName>" as search criteria
      And I select "<Type>" and click on search button
      Then I am on the Person search results page for "<personName>"
      When I select person
      Then the personal details are displayed
      And I click on the view property button for a person
      Then the property information is displayed
      Examples:
        | personName | Type   |
        | lon        | Person |

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

    # Because we have a dependency on the repairs api
    # we have no control over the data set(s) they present to us
    # so these tests are likely to be brittle
    @ignore
    Scenario Outline: Repairs container is displayed
      When I view a property "<property>"
      Then the repairs container is displayed
      And the repairs card list is displayed "<repairsType>"

      Examples:
          | property                             | repairsType |
          | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | In Progress |

    @ignore
    Scenario Outline: Repairs list type is changed
      When I view a property "<property>"
      Then I set the the repair type to "<repairsType>"
      And the repairs card list is displayed "<repairsType>"

      Examples:
          | property                             | repairsType |
          | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | Cancelled   |
          | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | In Progress |

  @smoke
    Scenario Outline: 'New tenure' button should be displayed if no tenure information is returned for a given property
    Given I am on the MMH home page
    When I enter "<propertyName>" as search criteria
    And I select "<commentType>" and click on search button
    Then I am on the Property search results page for "<propertyName>"
    When I select a property
    Then I am on the Property details page
    And New Tenure button should be displayed
    Examples:
    |propertyName|commentType|
    |   lon      |property   |