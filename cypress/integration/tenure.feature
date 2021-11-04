@authentication
@common
@processes
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

    # Scenario: View household member
    #   Given There are household members for the tenure
    #   When I view the Other household members section in the tenure page
    #   And I select a household member
    #   Then the household member details are displayed

    # Scenario: No household members
    #   Given There are only responsible household members for the tenure
    #   When I view the Other household members section in the tenure page
    #   And A message says this tenure has no household members

    # @SmokeTest
    # Scenario: Navigate to personal details
    #   Given I create a new tenure
    #   And I add a person to a tenure
    #   When I view a Tenure
    #   And I select a resident
    #   Then the resident details are displayed

    # @device
    # Scenario Outline: Mobile view
    #   Given I create a new tenure
    #   And I view a Tenure
    #   When I am using a mobile viewport "<device>"
    #   And I click the tenure details accordion
    #   Then the tenure details accordion information is displayed
    #   When I click the resident details accordion
    #   Then the residents details accordion information is displayed

    #   Examples:
    #     | device        | 
    #     # | ipad-2        | 
    #     # | ipad-mini   | 
    #     | iphone-3      | 
    #     | iphone-4      | 
    #     | iphone-5      | 
    #     | iphone-6      | 
    #     | iphone-6+     | 
    #     | iphone-7      | 
    #     | iphone-8      | 
    #     | iphone-x      | 
    #     | iphone-xr     | 
    #     | iphone-se2    | 
    #     # | macbook-11    | 
    #     # | macbook-13    | 
    #     # | macbook-15    | 
    #     # | macbook-16    | 
    #     # | samsung-note9 | 
    #     | samsung-s10   | 

    @Accessibility
    Scenario: Accessibility Testing
      Given I create a new tenure
      When I view a Tenure
      And have no detectable a11y violations


    # Scenario Outline: Clean up test data from DynamoDb
    #   Then I can delete a created record from DynamoDb "<tableName>" "<id>"

    #   Examples:
    #   | tableName          | id                                  |
    #   | TenureInformation  |97fb2973-b00f-4ec2-a3dd-54d765b1ecbd |
