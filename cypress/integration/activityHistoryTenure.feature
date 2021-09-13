@ActivityHistoryTenurePage
Feature: Activity History for Tenure
  I want to view a tenure's activity history

  Background: 
    Given I am logged in
    
    @SmokeTest
    Scenario Outline: View Tenure activity history page - No activity
      Given I go to the tenure activity history for "<tenure>"
      Then no tenure activity history is displayed
      Then I click close activity history
      And I am on the tenure page for "<tenure>"

      Examples:
        | tenure                               | 
        | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

#Update tenure id
 Scenario Outline: View Tenure activity history page for legacy data - No activity
      Given I go to the tenure activity history for "<tenure>"
      Then no tenure activity history is displayed
      Then I click close activity history
      And I am on the tenure page for "<tenure>"

      Examples:
        | tenure                               | 
        | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

    # @ignore
   # Scenario Outline: Update tenure activity history
    #  Given I am on the edit tenure page for "<tenure>"
    #   And I select a preferred middle name "<preferredLastName>"
    #   And I click add tenure
    #   And I click the done button
    #   Given I go to the tenure activity history for "<tenure>"
    #   Then the tenure activity history is displayed
    #   Then the tenure activity history is correct
      
    #   Examples:
    #     | person                               | preferredLastName |
    #     | c9c2e6ab-679e-d83b-d2e4-830b64c509c4 | guid              |

    # @ignore
   # Scenario Outline: Update tenure activity history for legacy data
    #  Given I am on the edit tenure page for "<tenure>"
    #   And I select a preferred middle name "<preferredLastName>"
    #   And I click add tenure
    #   And I click the done button
    #   Given I go to the tenure activity history for "<tenure>"
    #   Then the tenure activity history is displayed
    #   Then the tenure activity history is correct
      
    #   Examples:
    #     | person                               | preferredLastName |
    #     | c9c2e6ab-679e-d83b-d2e4-830b64c509c4 | guid              |

 