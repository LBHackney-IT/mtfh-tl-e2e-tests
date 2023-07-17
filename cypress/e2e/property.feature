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
    Given I seeded the database with an asset with a previous tenure
    When I view a property ""
    And the page breadcrumb is displayed
    And the property information is displayed
    And the tenure information is displayed
    When I click on the view tenure button
    Then tenure page is displayed
    And I click on the breadcrumb
    Then I am taken to the search page

  @Regression
  Scenario Outline: View property via tenure
    Given I seeded the database with a tenure
    When I view a tenure
    Then tenure page is displayed
    And the tenure information is displayed
    And I click on the view property button
    Then the property information is displayed

  @Regression
  Scenario Outline: View property via person
    Given I seeded the database with a person with an active tenure
    Given the person has a correspondence address
    Then I visit the 'Person details' page
    Then the personal details are displayed
    And I click on the view property button for a person
    Then the property information is displayed

  @SmokeTest
  Scenario Outline: Repairs container is displayed
    Given I seeded the database with an asset
    When I view a property ""
    Then the repairs container is displayed
    And the repairs card list is displayed "<repairsType>"

    Examples:
      | repairsType |
      | In Progress |

  @smoke
  Scenario Outline: 'New tenure' button should be displayed if no tenure information is returned for a given property
    Given I seeded the database with an asset
    When I view a property ""
    And New Tenure button should be displayed

  @SmokeTest
  Scenario Outline: When I go to the Asset page, I can expand & collapse additional asset characteristics details
    Given There exists a "<assetGuid>" asset with "<completeness>" asset characteristics
    When I view a property "<assetGuid>"
    Then The 'Property Specification' information should be invisible
    When Click the 'Property Specification' section
    Then The 'Property Specification' information becomes visible
    When Click the 'Property Specification' section
    Then The 'Property Specification' information should be invisible
    Examples:
      | assetGuid                            | completeness |
      | a5b35705-15c0-0170-b73a-743f07a11e55 | irrelevant   |

  @SmokeTest
  Scenario Outline: When I go to the asset page & expand the asset details, I see the correct information
    Given There exists a "<assetGuid>" asset with "<completeness>" asset characteristics
    When I view a property "<assetGuid>"
    When Click the 'Property Specification' section
    Then The displayed asset characteristics information is correct
    Examples:
      | assetGuid                            | completeness |
      | 14a9c7de-60ea-4a79-8bf2-6d819a562bf0 | populated    |

  @SmokeTest
  Scenario Outline: When I go to the asset page & expand the asset details, missing information is displayed as empty
    Given There exists a "<assetGuid>" asset with "<completeness>" asset characteristics
    When I view a property "<assetGuid>"
    When Click the 'Property Specification' section
    Then The empty asset characteristics fields are displayed as empty
    Examples:
      | assetGuid                            | completeness        |
      | ae86d71f-70eb-4259-9cf3-d0ff3362be10 | partially-populated |