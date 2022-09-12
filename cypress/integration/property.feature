@authentication
@common
@processes
@tenure
@property
@root

Feature: Property Page

  View property page

  Background:
    Given I am logged in

  @SmokeTest
  Scenario: View property details
    Given I create a new property with tenure
    When I view a property ""
    Then the page breadcrumb is displayed
    Then the property information is displayed
    And the tenure information is displayed
    And I click on the view tenure button

  @SmokeTest
  Scenario: View property details
    Given I create a new property with tenure
    When I view a property ""
    Then the page breadcrumb is displayed
    Then the property information is displayed
    And the tenure information is displayed
    And I click on the breadcrumb
    Then I am taken to the search page

  @Regression
  Scenario: View property via tenure
    Given I create a new property
    And I create a new "" tenure
    When I view a tenure ""
    Then the tenure information is displayed
    And I click on the view property button
    Then the property information is displayed

  @Regression
  Scenario: View property via person
    Given I create a new property
    And I create a new "SEC" tenure
    And I create a person with new tenure
    And I want to add contact details "phone"
    And I want to add contact details "email"
    When I view a person ""
    And I click on the view property button
    Then the property information is displayed

  Scenario Outline: Asset API for valid FE type
    Given I create a new property
    When I check the asset API with a valid assetType "<assetId>"
    And I view a property ""
    Then the property information is displayed

    Examples:
    | assetId                              |
    | 6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6 |

  Scenario Outline: Asset API for invalid FE type
    Given I create a new property "Lift"
    When I check the asset API with an invalid assetType "<assetId>"
    And I view a property ""
    Then I am shown an error message

    Examples:
    | assetId                              |
    | 6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6 |

#  # Because we have a dependency on the repairs api
#  # we have no control over the data set(s) they present to us
#  # so these tests are likely to be brittle
#  @ignore
#  Scenario Outline: Repairs container is displayed
#    When I view a property "<property>"
#    Then the repairs container is displayed
#    And the repairs card list is displayed "<repairsType>"
#
#    Examples:
#        | property                             | repairsType |
#        | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | In Progress |
#
#  @ignore
#  Scenario Outline: Repairs list type is changed
#    When I view a property "<property>"
#    Then I set the the repair type to "<repairsType>"
#    And the repairs card list is displayed "<repairsType>"
#
#    Examples:
#        | property                             | repairsType |
#        | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | Cancelled   |
#        | 2d13b5cb-baf2-91fd-c231-8c5c2ee9548c | In Progress |

#  @smoke
#    Scenario Outline: 'New tenure' button should be displayed if no tenure information is returned for a given property
#      When I view a property "<property>"
#      Then Tenure information displays status as Inactive
#      And New Tenure button should be displayed
#
#      Examples:
#        | property                             |
#        | b1a64f12-a2f5-b6e9-55c2-bbfa107150a7 |
#       # original - data | e6e224eb-18e8-c2c1-2dc4-f82e67cad1fa |
