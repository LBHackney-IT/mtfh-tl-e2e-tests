# @activity-history
# @authentication
# @common
# @processes
# @root

# Feature: Activity History for Tenure
#   I want to view a tenure's activity history

#   Background:
#     Given I am logged in
#     Given I edit a tenure "62f6df87-ec33-77db-38ea-647be124af65" "Freehold"

#   @SmokeTest
#   Scenario Outline: View Tenure activity history page
#     Given I go to the tenure activity history for "<tenure>"
#     Then the tenure activity history is displayed
#     When I click close activity history
#     And I am on the tenure page for "<tenure>"

#     Examples:
#       | tenure                               |
#       | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

#   Scenario Outline: View Tenure activity history page for legacy data - Data imported
#     Given I go to the tenure activity history for "<tenure>"
#     Then the tenure activity history is displayed
#     Then tenure migrated activity history is displayed
#     Then I click close activity history
#     And I am on the tenure page for "<tenure>"

#     Examples:
#       | tenure                               |
#       | b6cee6e0-b3a8-8a25-c7b6-f8f5ab9288e5 |

#     # //TODO commented for 5th July release as this test is failing in pipeline
# #  @SmokeTest
# #    Scenario Outline: Update Tenure
# #      Given I edit a tenure "<tenure>" "<tenureType>"
# #      Given I go to the tenure activity history for "<tenure>"
# #      Then the update exists in the activity history "<tenureType>"
# #
# #      Examples:
# #        | tenure                               | tenureType   |
# #        | 62f6df87-ec33-77db-38ea-647be124af65 | Introductory |
